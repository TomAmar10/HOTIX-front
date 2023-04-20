import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../models/Event";
import service from "../services/eventService";

function SingleEventPage(): JSX.Element {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    eventId && service.getEvent(eventId).then((res) => setEvent(res));
  }, [eventId]);

  return (
    <main className="container-main">
      
    </main>
  );
}

export default SingleEventPage;
