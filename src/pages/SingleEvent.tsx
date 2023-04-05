import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Event } from "../models/Event";
import service from "../services/eventService";

function SingleEventPage(): JSX.Element {
  const { eventId } = useParams();
  const user = useSelector((state: any) => state.user.user);
  const [event, setEvent] = useState<Event | null>(null);
  const userMode = "seller";
  const isSeller = userMode === "seller";

  useEffect(() => {
    eventId && service.getEvent(eventId).then((res) => setEvent(res));
  }, [eventId]);

  return (
    <main className="container-main">
      
    </main>
  );
}

export default SingleEventPage;
