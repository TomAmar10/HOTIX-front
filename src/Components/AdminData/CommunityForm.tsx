import { useForm } from "react-hook-form";
import { Community } from "../../models/Community";
import useTagService from "../../services/communityService";
import { useState } from "react";
import { Event } from "../../models/Event";
import { Autocomplete, TextField } from "@mui/material";
import "./CommunityForm.scss";
import convertToBase64 from "../../utils/convertBase64";

interface props {
  events: Event[];
}

function CommunityForm(props: props): JSX.Element {
  const { register, handleSubmit, reset } = useForm<Community>();
  const [isAdded, setIsAdded] = useState(false);
  const [communityEvents, setCommunityEvents] = useState<Event[]>([]);
  const communityService = useTagService();

  const submitForm = async (community: Community) => {
    const file = (community.image as any)[0];
    const image = await convertToBase64(file);
    community.image = image;
    community.events = communityEvents.map((c) => c._id as string);
    communityService.addCommunity(community).then((res) => reset());
    setIsAdded(true);
  };

  return (
    <form className="CommunityForm" onSubmit={handleSubmit(submitForm)}>
      <h4 className="community-header">Add Community</h4>
      <label htmlFor="name" className="event-form-label">
        Community Name
      </label>
      <input
        id="name"
        type="text"
        className="event-form-input"
        maxLength={60}
        required
        {...register("name")}
      />
      <label htmlFor="description" className="event-form-label">
        Description
      </label>
      <input
        id="description"
        type="text"
        className="event-form-input"
        maxLength={60}
        required
        {...register("description")}
      />
      <label htmlFor="image" className="event-form-label">
        Image
      </label>
      <input
        id="image"
        type="file"
        className="event-form-input"
        required
        {...register("image")}
      />
      <label htmlFor="events" className="event-form-label">
        Related Events
      </label>
      <Autocomplete
        multiple
        limitTags={1}
        id="tags"
        options={props.events}
        value={communityEvents}
        getOptionLabel={(option) => option.event_name}
        onChange={(event, newValue) => setCommunityEvents(newValue)}
        className="community-form-events"
        renderInput={(params) => <TextField {...params} />}
      />
      <button className="community-form-btn">Submit</button>
      {isAdded && <span className="success-msg">Added successfully</span>}
    </form>
  );
}

export default CommunityForm;
