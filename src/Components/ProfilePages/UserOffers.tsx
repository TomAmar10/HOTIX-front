import { Link, useSearchParams } from "react-router-dom";
import SingleSellerCard from "../EventModal/BuyTicketSlider/SingleSellerCard";
import { Bid } from "../../models/Bid";
import "./UserOffers.scss";
import { Ticket } from "../../models/Ticket";
import { Event } from "../../models/Event";
import { User } from "../../models/User";
import dateConvertor from "../../utils/dateConvertor";
import { SellerTicket } from "../EventModal/BuyTicketSlider/SellersSlider";

interface props {
  bids: Bid[];
  sells: Bid[];
}

function UserOffers(props: props): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentStatus = searchParams.get("filter")?.split("_").reverse()[0];

  return (
    <div className="UserOffers">
      <div className="offer-section">
        <h2 className="profile-header">Manage your sales</h2>
        <div className="offers-status-filters">
          <Link
            to={"?filter=pending_bids"}
            className={`filter-link ${
              currentStatus === "bids" || !currentStatus ? "active-link" : ""
            }`}
          >
            <h6>Pending bids</h6>
          </Link>
          <Link
            to={"?filter=pending_payments"}
            className={`filter-link ${
              currentStatus === "payments" ? "active-link" : ""
            }`}
          >
            <h6>Pending for approval</h6>
          </Link>
          <Link
            to={"?filter=approved"}
            className={`filter-link ${
              currentStatus === "approved" ? "active-link" : ""
            }`}
          >
            <h6>Approved offers</h6>
          </Link>
          <Link
            to={"?filter=declined"}
            className={`filter-link ${
              currentStatus === "declined" ? "active-link" : ""
            }`}
          >
            <h6>Declined offers</h6>
          </Link>
        </div>
        <div className="bids-container">
          {props.sells.map((b) => (
            <div key={b._id} className="bid-card">
              EVENT NAME __{" "}
              {((b.tickets[0] as Ticket).id_event as Event).event_name}
              <br />
              EVENT DATE __{" "}
              {dateConvertor(
                ((b.tickets[0] as Ticket).id_event as Event).date as Date
              )}
              <br />
              BIDDER __{" "}
              {`${(b.id_bidder as User).first_name} ${
                (b.id_bidder as User).last_name
              }`}
              <br />
              BID PRICE PER TICKET __ {b.amount * ((b.tickets as SellerTicket[])[0].ticketsArray.length)}$
              <br />
              BID PRICE __ {b.amount}$
              <br />
              SEATS __ {(b.tickets as Ticket[])[0].seat as string} <br />
              ROW __ {(b.tickets as Ticket[])[0].row}
            </div>
          ))}
        </div>
      </div>
      <div className="offer-section">
        <h2 className="profile-header">Manage your bids</h2>
        <div className="bids-container">
          {props.bids.map((b) => (
            <div key={b._id} className="bid-card">
              EVENT NAME __{" "}
              {((b.tickets[0] as Ticket).id_event as Event).event_name}
              <br />
              EVENT DATE __{" "}
              {dateConvertor(
                ((b.tickets[0] as Ticket).id_event as Event).date as Date
              )}
              <br />
              SELLER __{" "}
              {`${(b.id_owner as User).first_name} ${
                (b.id_owner as User).last_name
              }`}
              <br />
              BID PRICE PER TICKET __ {b.amount * ((b.tickets as SellerTicket[])[0].ticketsArray.length)}$
              <br />
              BID PRICE __ {b.amount}$
              <br />
              SEATS __ {(b.tickets as Ticket[])[0].seat as string} <br />
              ROW __ {(b.tickets as Ticket[])[0].row}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserOffers;
