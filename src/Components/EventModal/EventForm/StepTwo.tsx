import RandomBg from "../../../assets/random-show-bg.jpg";
import { Role, User } from "../../../models/User";
import { Autocomplete, TextField } from "@mui/material";
import { LanguageEventModal } from "../../../languageControl/Language";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Tag } from "../../../models/Tag";
import { Event } from "../../../models/Event";
import convertToBase64 from "../../../utils/convertBase64";
import "./StepTwo.scss";

interface props {
  user: User | null;
  event?: Event | null;
  data: LanguageEventModal;
  isHebrew: boolean;
  onComplete: Function;
  allTags: Tag[];
  onImgChange: Function;
  onBack: Function;
  style: any;
}

function StepTwo(props: props): JSX.Element {
  const data = props.data.EventForm;
  const currDate = new Date().toISOString().slice(0, 16);
  const { register, handleSubmit, reset } = useForm<Event>();
  const [currentImg, setCurrentImg] = useState<string | null>(
    props.event?.image || null
  );
  const [imgName, setImgName] = useState<string>(
    props.event?.image ? props.event.event_name : ""
  );
  const [imgError, setImgError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [eventTags, setEventTags] = useState<Tag[]>(props.event?.tags || []);

  if (props.event) {
    const date = new Date(props.event?.date as string)
      .toISOString()
      .slice(0, 16);
    const event = {
      location: props.event.location,
      date,
      tags: props.event.tags,
    };
    reset(event);
  }

  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgError("");
    const files = e.target.files;
    if (!files || !files[0]) {
      props.onImgChange(RandomBg);
      setCurrentImg(null);
      setImgName("");
      return;
    }
    const file = files[0];
    const newImg = URL.createObjectURL(file);
    props.onImgChange(newImg);
    setImgName(file.name);
    const image = await convertToBase64(files[0]);
    setCurrentImg(image);
  };

  const completeStep = (event: Event) => {
    event.tags = eventTags.map((t) => t._id) as any;
    if (props.user?.role === Role.ADMIN) {
      if (!currentImg) {
        if (!props.event?.image) {
          setImgError("Image is required for admin.");
        } else event.image = props.event.image;
      } else event.image = currentImg;
      props.onComplete({ ...event, isApproved: true });
    } else props.onComplete(event);
  };

  const openFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <form
      style={props.style}
      className={`event-form StepTwo ${props.isHebrew && "hebrew"}`}
      onSubmit={handleSubmit(completeStep)}
    >
      <label htmlFor="location" className="event-form-label">
        {data.location}
      </label>
      <input
        id="location"
        type="text"
        className="event-form-input"
        placeholder={data.locationPlaceholder}
        maxLength={55}
        required
        {...register("location")}
      />
      {props.user?.role === Role.ADMIN && (
        <>
          <label
            htmlFor="image"
            className="event-form-label"
          >
            {data.image}
            <input
              onChange={(e) => changeImage(e)}
              id="image"
              type="file"
              className="event-form-input"
              hidden
              ref={fileInputRef}
            />
            <input 
            onClick={openFileInput}
              placeholder={data.imagePlaceholder}
              value={imgName}
              type="text"
              className="event-form-input image-input"
            />
          </label>
        </>
      )}
      {imgError && <span className="img-error">{imgError}</span>}
      <label htmlFor="date" className="event-form-label">
        {data.eventDate}
        <input
          id="date"
          type="datetime-local"
          className="event-form-input"
          min={currDate}
          required
          {...register("date")}
        />
      </label>
      <label htmlFor="tags" className="event-form-label">
        {data.tags}
        <Autocomplete
          multiple
          limitTags={1}
          id="tags"
          options={props.allTags}
          value={eventTags}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setEventTags(newValue)}
          className="event-form-tags"
          renderInput={(params) => (
            <TextField
              placeholder={eventTags.length > 0 ? "" : data.tagsPlaceholder}
              {...params}
            />
          )}
        />
      </label>
      <div className="form-buttons">
        <button
          type="button"
          className="form-event-btn back-btn"
          onClick={() => props.onBack()}
        >
          {data.back}
        </button>
        <button className="form-event-btn">
          {props.event ? data.approveBtn : data.createBtn}
        </button>
      </div>
    </form>
  );
}

export default StepTwo;
