import { randomProfile } from "../../../utils/file-import";
import { User } from "../../../models/User";
import { Rating } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Bid } from "../../../models/Bid";
import { Link } from "react-router-dom";
import { Ticket } from "../../../models/Ticket";
import { Event } from "../../../models/Event";
import { LanguageSalesHistory } from "../../../languageControl/Language";
import { format } from "date-fns";
import "./SingleHistory.scss";

interface props {
  bid: Bid;
  isHebrew: boolean;
  data: LanguageSalesHistory;
}

function SingleHistory(props: props): JSX.Element {
  const buyer = props.bid.id_bidder as User;
  const seller = props.bid.id_owner as User;
  const data = props.data;
  return (
    <div className="SingleHistory">
      <Link to={`/profile/${seller._id}`} className="owner">
        <img
          src={(seller.image as string) || randomProfile}
          alt="user"
          className="user-profile-image"
        />
        <div className="name-and-rating">
          <h5 className="user-name">{`${seller.first_name} ${seller.last_name}`}</h5>
          <Rating
            className="rating-stars"
            size="small"
            value={+seller.total_rating}
            readOnly
            precision={0.5}
          />
        </div>
      </Link>
      <div className="bid-details">
        <div className="bid-date">
          <span>{data.transferred}</span>
          {format(new Date(props.bid.bid_date as string), "Pp")}
        </div>
        <div className="arrow-container">
          <CheckCircleIcon className="status-icon confirmed" />
          <div className="long-arrow-body"></div>
          <div className={`arrow-head ${props.isHebrew && "hebrew"}`}></div>
        </div>
        <span>
          {((props.bid.tickets[0] as Ticket).id_event as Event).event_name}
        </span>
      </div>
      <Link to={`/profile/${buyer._id}`} className="bidder">
        <img
          src={(buyer.image as string) || randomProfile}
          alt="user"
          className="user-profile-image"
        />
        <div className="name-and-rating">
          <h5 className="user-name">{`${buyer.first_name} ${buyer.last_name}`}</h5>
          <Rating
            className="rating-stars"
            size="small"
            value={+buyer.total_rating}
            readOnly
            precision={0.5}
          />
        </div>
      </Link>
    </div>
  );
}

export default SingleHistory;
