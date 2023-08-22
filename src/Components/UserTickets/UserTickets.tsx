import { LanguageTicketsPage } from "../../languageControl/Language";
import { UserEventTickets } from "../../store/userTicketsSlice";
import EventTicketsCard from "./SingleUserEvent/EventTicketsCard";
import "./UserTickets.scss";

interface props {
  userEventTickets: UserEventTickets[];
  data: LanguageTicketsPage;
  isHebrew: boolean;
}

function UserTickets(props: props): JSX.Element {
  const data = props.data.UserTickets;
  return (
    <div className="UserTickets user-page-section">
      <h4 className="section-header">{data.header}</h4>
      <hr />
      <div className="events-tickets-container">
        {props.userEventTickets.map((e, index) => (
          <EventTicketsCard
            eventTicket={e}
            key={`${e._id}-tickets-card-${index}`}
            data={data}
            isHebrew={props.isHebrew}
          />
        ))}
      </div>
    </div>
  );
}

export default UserTickets;
