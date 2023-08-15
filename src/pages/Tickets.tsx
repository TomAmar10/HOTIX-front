import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import UserTickets from "../Components/UserTickets/UserTickets";
import SalesHistory from "../Components/UserTickets/SalesHistory/SalesHistory";

function TicketsPage(): JSX.Element {
  const langData = useSelector(
    (state: IStore) => state.language.langData
  ).TicketsPage;
  const language = useSelector((state: IStore) => state.language.language);
  const ticketsByEvents = useSelector(
    (state: IStore) => state.userTickets.allTicketsByEvents
  );
  const soldTickets = useSelector(
    (state: IStore) => state.userBids.confirmedOffersReceived
  );
  const boughtTickets = useSelector(
    (state: IStore) => state.userBids.confirmedOffersSent
  );
  const user = useSelector((state: IStore) => state.user.user);

  return (
    <>
      {user && (
        <>
          <UserTickets
            userEventTickets={ticketsByEvents || []}
            data={langData}
            isHebrew={language === "HEBREW"}
          />
          <SalesHistory
            user={user}
            confirmedBids={[...(soldTickets || []), ...(boughtTickets || [])]}
            data={langData}
          />
        </>
      )}
    </>
  );
}

export default TicketsPage;
