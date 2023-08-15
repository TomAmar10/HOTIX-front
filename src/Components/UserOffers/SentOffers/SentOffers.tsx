import { User } from "../../../models/User";
import { LanguageOffersPage } from "../../../languageControl/Language";
import { Bid } from "../../../models/Bid";
import SingleUserTicket from "../SingleUserTicket/SingleUserOffer";
import "./SentOffers.scss";

interface props {
  user: User | null;
  isHebrew: boolean;
  data: LanguageOffersPage;
  sentBids: Bid[];
  onViewStatus: Function;
  onCancelBid: Function;
}

function SentOffers(props: props): JSX.Element {
  const data = props.data.SentOffers;
  return (
    <div className="SentOffers user-page-section">
      <h4 className="section-header">{data.header}</h4>
      <hr />
      <div className="events-tickets-container">
        {props.sentBids.map((b) => (
          <SingleUserTicket
            key={`${b._id}-sent-offer`}
            bid={b}
            user={props.user}
            onViewStatus={props.onViewStatus}
            onCancelBid={props.onCancelBid}
          />
        ))}
      </div>
    </div>
  );
}

export default SentOffers;
