import { LanguageEventModal } from "../../../languageControl/Language";
import { useForm } from "react-hook-form";
import { Category } from "../../../models/Category";
import { Event } from "../../../models/Event";
import "./StepOne.scss";

interface props {
  event?: Event | null;
  data: LanguageEventModal;
  isHebrew: boolean;
  onComplete: Function;
  categories: Category[];
  style:any;
}

function StepOne(props: props): JSX.Element {
  const categories = props.categories;
  const data = props.data.EventForm;
  const { register, handleSubmit, reset } = useForm<Event>();

  if (props.event) {
    const event = {
      ...props.event,
      id_category: (props.event?.id_category as Category)._id as any,
    };
    reset(event);
  }

  const completeStep = (event: Event) => {
    if (!event.id_category && categories)
      (event.id_category as string) = (categories[0] as Category)._id;
    props.onComplete(event);
  };

  return (
    <form style={props.style}
      className={`event-form StepOne ${props.isHebrew && "hebrew"}`}
      onSubmit={handleSubmit(completeStep)}
    >
      <label htmlFor="event_name" className="event-form-label">
        {data.eventName}
      </label>
      <input
        id="event_name"
        type="text"
        className="event-form-input"
        placeholder={data.eventNamePlaceholder}
        maxLength={60}
        required
        {...register("event_name")}
      />
      <label htmlFor="category" className="event-form-label">
        {data.category}
      </label>
      <select
        id="category"
        className="event-form-select"
        required
        {...register("id_category")}
      >
        {categories?.map((c) => (
          <option value={c._id} key={c._id}>
            {props.isHebrew ? c.hebrew : c.name}
          </option>
        ))}
      </select>
      <label htmlFor="description" className="event-form-label">
        {data.description}
      </label>
      <input
        id="description"
        type="text"
        className="event-form-input"
        placeholder={data.descriptionPlaceholder}
        maxLength={55}
        required
        {...register("description")}
      />
      <button className="form-event-btn">{data.continue}</button>
    </form>
  );
}

export default StepOne;
