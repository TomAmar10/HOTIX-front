import { useSelector } from "react-redux";
import TicketsList from "../Components/Profile/TicketsList/TicketsList";
import { IStore } from "../store/store";
import { Ticket } from "../models/Ticket";
import { Event } from "../models/Event";

export interface UserEvent extends Event {
  ticketsArray: Ticket[];
}

function ProfileTicketsPage(): JSX.Element {
  const userTickets = useSelector(
    (state: IStore) => state.userTickets.allTickets || []
  );
  const user = useSelector((state: IStore) => state.user.user);
  const oneHour = 1000 * 60 * 60;

  function ticketsToEvents(tickets: Ticket[]): UserEvent[] {
    const eventsObj: Record<string, UserEvent> = {};
    tickets.forEach((ticket) => {
      const eventId = (ticket.id_event as Event)._id as string;
      if (!eventsObj[eventId]) {
        eventsObj[eventId] = {
          ...(ticket.id_event as Event),
          ticketsArray: [ticket],
        };
      } else {
        eventsObj[eventId].ticketsArray.push(ticket);
      }
    });
    const eventsArray: UserEvent[] = Object.keys(eventsObj).map(
      (eventId) => eventsObj[eventId]
    );
    return eventsArray.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  const getPrevEvents = () => {
    return ticketsToEvents(userTickets).filter(
      (t) => new Date(t.date).getTime() + oneHour < new Date().getTime()
    );
  };
  const getUpcomingEvents = () => {
    return ticketsToEvents(userTickets).filter(
      (t) => new Date(t.date).getTime() + oneHour > new Date().getTime()
    );
  };

  return (
    <TicketsList
      user={user}
      upcomingEvents={getUpcomingEvents()}
      prevEvents={getPrevEvents()}
    />
  );
}

export default ProfileTicketsPage;
