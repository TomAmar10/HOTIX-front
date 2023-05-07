import { Link, useSearchParams } from "react-router-dom";
import { Bid } from "../../../models/Bid";
import UserTicket from "../SingleUserTicket/SingleUserTicket";
import { useEffect, useState } from "react";
import PaymentDetails from "../../PaymentDetails/PaymentDetails";
import { card_details } from "../../../models/CreditCard";
import dealService from "../../../services/dealService";
import { User } from "../../../models/User";
import { Ticket } from "../../../models/Ticket";
import { Event } from "../../../models/Event";
import { useDispatch } from "react-redux";
import { userBidsActions } from "../../../store/userBidsSlice";
import { SellerTicket } from "../../EventModal/BuyTicketSlider/SellersSlider";
import { userTicketsActions } from "../../../store/userTicketsSlice";
import bidService from "../../../services/bidService";
import CongratsMsg from "./CongratsMsg/CongratsMsg";
import SecureDepositMsg from "../../PaymentDetails/SecureDepositMsg/SecureDepositMsg";
import NoBidsToShow from "./NoBidsToShow/NoBidsToShow";
import BidStatus from "./BidStatus/BidStatus";
import "./OffersList.scss";

interface props {
  userBidsConfirmed: Bid[] | null;
  userBidsWaiting: Bid[] | null;
  receivedBidsConfirmed: Bid[] | null;
  receivedBidsWaiting: Bid[] | null;
  user: User | null;
}

function OffersList(props: props): JSX.Element {
  const dispatch = useDispatch();
  const [currentBids, setCurrentBids] = useState<Bid[]>(
    props.userBidsConfirmed || []
  );
  const [currentSales, setCurrentSales] = useState<Bid[]>(
    props.receivedBidsConfirmed || []
  );
  const [searchParams] = useSearchParams();
  const currentStatus = searchParams.get("filter")?.split("_").reverse()[0];
  const [isValid, setIsValid] = useState(false);
  const [bidToTransfer, setBidToTransfer] = useState<Bid | null>(null);
  const [bidStatus, setBidStatus] = useState<Bid | null>(null);
  const [stepNumber, setStepNumber] = useState(1);

  const changeBids = (filter: number) => {
    if (filter === 1) {
      setCurrentBids(props.userBidsConfirmed || []);
      setCurrentSales(props.receivedBidsConfirmed || []);
      return;
    }
    setCurrentBids(props.userBidsWaiting || []);
    setCurrentSales(props.receivedBidsWaiting || []);
  };

  useEffect(() => {
    const filter = currentStatus !== "approved" ? 2 : 1;
    changeBids(filter);
  }, [props, currentStatus]);

  const goToPayment = (b: Bid) => {
    setBidToTransfer(b);
    setStepNumber(props.user?._id === (b.id_owner as User)._id ? 1 : 2);
  };

  const validatePayment = (details: card_details, isValid: boolean) => {
    setIsValid(isValid);
  };

  const transferTicket = () => {
    if (!bidToTransfer) return;
    setStepNumber(3);
    if ((bidToTransfer.id_owner as User)._id === props.user?._id) {
      bidService.updateBid({ ...bidToTransfer, isConfirmed: true });
      dispatch(
        userBidsActions.confirmBid({ ...bidToTransfer, isConfirmed: true })
      );
    } else {
      const ticketsToAdd = [
        ...(bidToTransfer.tickets[0] as SellerTicket).ticketsArray,
      ].map((t) => {
        return { ...t, open_for_sale: false, id_owner: props.user?._id };
      });
      dispatch(userTicketsActions.addTickets(ticketsToAdd));
      dispatch(userBidsActions.doneBid({ ...bidToTransfer, isDone: true }));
      dealService.transferTicket(bidToTransfer).then(() => setStepNumber(3));
    }
  };

  const submitSecureDeposit = () => setStepNumber(2);

  const viewStatus = (bid: Bid) => {
    setBidStatus(bid);
  };

  const clearModal = () => {
    setBidToTransfer(null);
    setBidStatus(null);
  };

  return (
    <>
      <div className="OffersList">
        <div className="offer-section">
          <div className="offers-status-filters">
            <Link
              onClick={() => changeBids(2)}
              to={"?filter=pending_payments"}
              className={`filter-link ${
                currentStatus === "payments" || !currentStatus
                  ? "active-link"
                  : ""
              }`}
            >
              <h6>Pending for approval</h6>
            </Link>
            <Link
              onClick={() => changeBids(1)}
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
          <h2 className="profile-header">Manage your sales</h2>
          <div className="bids-container">
            {currentSales.length > 0 ? (
              currentSales.map((b) => (
                <UserTicket
                  bid={b}
                  key={b._id}
                  onPayNowClick={() => goToPayment(b)}
                  onViewStatus={viewStatus}
                />
              ))
            ) : (
              <NoBidsToShow isSelling />
            )}
          </div>
        </div>

        <div className="offer-section">
          <h2 className="profile-header">Manage your bids</h2>
          <div className="bids-container">
            {currentBids.length > 0 ? (
              currentBids.map((b) => (
                <UserTicket
                  bid={b}
                  key={b._id}
                  myBid
                  onPayNowClick={() => goToPayment(b)}
                />
              ))
            ) : (
              <NoBidsToShow />
            )}
          </div>
        </div>
      </div>
      {bidToTransfer && (
        <div className="ticket-payment">
          {stepNumber === 1 && (
            <SecureDepositMsg
              user={props.user}
              onSubmit={submitSecureDeposit}
            />
          )}
          {stepNumber === 2 && (
            <>
              <PaymentDetails
                price={0}
                onSubmit={validatePayment}
                isCurrent={true}
              />
              <div className="payments-button">
                <button disabled={!isValid} onClick={transferTicket}>
                  {props.user?._id === bidToTransfer.id_owner
                    ? "Confirm Deposit"
                    : "Pay Now"}
                </button>
              </div>
            </>
          )}
          {stepNumber === 3 && (
            <CongratsMsg
              user={props.user}
              bidder={bidToTransfer.id_bidder as User}
              owner={bidToTransfer.id_owner as User}
              event={(bidToTransfer.tickets[0] as Ticket).id_event as Event}
              bid={bidToTransfer}
            />
          )}
        </div>
      )}
      {bidStatus && (
        <BidStatus bid={bidStatus} user={props.user} clearModal={clearModal} />
      )}
      {(bidToTransfer || bidStatus) && (
        <div className="ticket-payment-bg" onClick={clearModal}></div>
      )}
    </>
  );
}

export default OffersList;
