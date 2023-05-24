import { useEffect, useState } from "react";
import RandomBg from "../../../assets/random-show-bg.jpg";
import eventService from "../../../services/eventService";
import { Category } from "../../../models/Category";
import { Event } from "../../../models/Event";
import { useForm } from "react-hook-form";
import EventAdded from "./EventAdded";
import { User } from "../../../models/User";
import "./NewEventForm.scss";

interface props {
  user: User | null;
}

function NewEventForm(props: props): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const currDate = new Date().toISOString().slice(0, 16);
  const { register, handleSubmit } = useForm<Event>();
  const [newEvent, setNewEvent] = useState<Event | null>(null);

  useEffect(() => {
    eventService.getAllCategories().then((res) => setCategories(res.data));
  }, []);

  const createEvent = (event: Event) => {
    if (!event.id_category)
      (event.id_category as string) = (categories[0] as Category)._id;
    setNewEvent(event);
    eventService.addEvent(event);
  };

  return (
    <div className="NewEventForm">
      {newEvent && <EventAdded user={props.user} event={newEvent} />}
      {!newEvent && (
        <>
          <img src={RandomBg} alt="show" className="random-bg-image" />
          <h5>Create New Event</h5>
          <form className="event-form" onSubmit={handleSubmit(createEvent)}>
            <label htmlFor="" className="event-form-label">
              Event Name
            </label>
            <input
              type="text"
              className="event-form-input"
              placeholder="Give a name to your event"
              {...register("event_name")}
            />
            <label htmlFor="" className="event-form-label">
              Category
            </label>
            <select
              id="category"
              className="event-form-select"
              {...register("id_category")}
            >
              {categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <label htmlFor="" className="event-form-label">
              Location
            </label>
            <input
              type="text"
              className="event-form-input"
              placeholder="Enter the event's location"
              {...register("location")}
            />
            <label htmlFor="" className="event-form-label">
              Description
            </label>
            <input
              type="text"
              className="event-form-input"
              placeholder="Few words about your event"
              {...register("description")}
            />
            <label htmlFor="" className="event-form-label">
              Event Date
            </label>
            <input
              type="datetime-local"
              className="event-form-input"
              placeholder="Few words about your event"
              min={currDate}
              {...register("date")}
            />
            <button className="submit-form-event-btn">Create Now</button>
          </form>
        </>
      )}
    </div>
  );
}

export default NewEventForm;
