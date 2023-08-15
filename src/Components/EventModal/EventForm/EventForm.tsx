import { useState } from "react";
import RandomBg from "../../../assets/random-show-bg.jpg";
import { Event } from "../../../models/Event";
import EventAdded from "./EventAdded";
import { Role, User } from "../../../models/User";
import { useSelector } from "react-redux";
import { IStore } from "../../../store/store";
import { LanguageEventModal } from "../../../languageControl/Language";
import useEventService from "../../../services/eventService";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import "./EventForm.scss";

interface props {
  user: User | null;
  event?: Event | null;
  data: LanguageEventModal;
  isHebrew: boolean;
  isUpdating: boolean;
}

function EventForm(props: props): JSX.Element {
  const data = props.data.EventForm;
  const eventService = useEventService();
  const categories = useSelector(
    (state: IStore) => state.categories.categories
  );
  const allTags = useSelector((state: IStore) => state.events.tags);
  const [addedEvent, setAddedEvent] = useState<Event | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    props.event?.image || null
  );
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [eventToSubmit, setEvent] = useState<Event>();

  const createEvent = (event: Event) => {
    const newEvent = { ...eventToSubmit, ...event };
    if (props.user?.role === Role.ADMIN && props.isUpdating) {
      eventService.updateEvent(newEvent);
    } else eventService.addEvent(newEvent);
    setAddedEvent(newEvent);
  };

  const completeStepOne = (event: Event) => {
    setEvent(event);
    setIsFirstStep(false);
  };

  return (
    <div className="EventForm">
      {addedEvent && (
        <EventAdded user={props.user} event={addedEvent} data={props.data} />
      )}
      {!addedEvent && (
        <>
          <img
            src={imageUrl || RandomBg}
            alt="event"
            className="random-bg-image"
          />
          <h5>{data.header}</h5>
          <StepOne
            style={{
              display: isFirstStep ? "flex" : "none",
            }}
            categories={categories || []}
            event={props.event}
            data={props.data}
            isHebrew={props.isHebrew}
            onComplete={completeStepOne}
          />
          <StepTwo
            style={{ display: isFirstStep ? "none" : "flex" }}
            user={props.user}
            event={props.event}
            data={props.data}
            isHebrew={props.isHebrew}
            onComplete={createEvent}
            allTags={allTags}
            onImgChange={(image: string) => setImageUrl(image)}
            onBack={() => setIsFirstStep(true)}
          />
        </>
      )}
    </div>
  );
}

export default EventForm;
