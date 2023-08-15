import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../store/store";
import useBidService from "../../../services/bidService";
import useDealService from "../../../services/dealService";
import { useState } from "react";
import { card_details } from "../../../models/CreditCard";
import { Bid, StatusBid } from "../../../models/Bid";
import SecureDepositMsg from "../../PaymentDetails/SecureDepositMsg/SecureDepositMsg";
import PaymentDetails from "../../PaymentDetails/PaymentDetails";
import CongratsMsg from "../../UI/CongratsMsg/CongratsMsg";
import BidStatusModal from "../../BidStatusModal/BidStatusModal";
import { userBidsActions } from "../../../store/userBidsSlice";
import Spinner from "../../UI/Spinner";
import "./OffersModal.scss";
import { userTicketsActions } from "../../../store/userTicketsSlice";

interface props {
  onClearModal: Function;
  bidToShow: Bid | null;
  bidToTransfer: Bid | null;
}

enum steps {
  MESSAGE = "Deposit message",
  PAYMENT = "Payment",
  PENDING = "Pending",
  SUCCESS = "Success",
  FAILED = "Failed",
}

function OffersModal(props: props): JSX.Element {
  const dispatch = useDispatch();
  const bidService = useBidService();
  const dealService = useDealService();
  const [isValid, setIsValid] = useState(false);
  const [currentStep, setStep] = useState<steps>(steps.PAYMENT);
  const langData = useSelector((state: IStore) => state.language.langData);
  const language = useSelector((state: IStore) => state.language.language);
  const user = useSelector((state: IStore) => state.user.user);

  const submitSecureDeposit = () => setStep(steps.PAYMENT);

  const validatePayment = (details: card_details, isValid: boolean) => {
    setIsValid(isValid);
    // setCreditCard(details);
  };

  const completeDeposit = async () => {
    if (!props.bidToTransfer) return;
    const bid = {
      ...props.bidToTransfer,
      status: StatusBid.CONFIRMED,
      tickets: (props.bidToTransfer.tickets[0] as any).ticketsArray,
    };
    setStep(steps.PENDING);
    const resultDeal = await dealService.transferTicket(bid);
    if (resultDeal.status !== 201) {
      setStep(steps.FAILED);
      return;
    }
    const resultBid = await bidService.updateBid(bid);
    if (resultBid.status !== 201) {
      setStep(steps.FAILED);
      return;
    }
    setStep(steps.SUCCESS);
    dispatch(userBidsActions.confirmBid(bid));
    dispatch(
      userTicketsActions.removeTickets(
        (props.bidToTransfer.tickets[0] as any).ticketsArray
      )
    );
  };

  return (
    <div className="OffersModal">
      {props.bidToTransfer && (
        <div className="deposit-stage">
          {currentStep === steps.MESSAGE && (
            <SecureDepositMsg
              isHebrew={language === "HEBREW"}
              data={langData}
              seller
              user={user}
              onSubmit={submitSecureDeposit}
            />
          )}
          {currentStep === steps.PAYMENT && (
            <>
              <PaymentDetails
                price={0}
                onSubmit={validatePayment}
                data={langData}
                isHebrew={language === "HEBREW"}
              />
              <div className="payments-button">
                <button disabled={!isValid} onClick={completeDeposit}>
                  {langData.confirmDeposit}
                </button>
              </div>
            </>
          )}
          {currentStep === steps.PENDING && (
            <Spinner style={{ padding: "7rem 13rem" }} />
          )}
          {currentStep === steps.SUCCESS && (
            <CongratsMsg user={user} bid={props.bidToTransfer} />
          )}
          {currentStep === steps.FAILED && (
            <CongratsMsg user={user} bid={props.bidToTransfer} />
          )}
        </div>
      )}
      {props.bidToShow && (
        <BidStatusModal
          bid={props.bidToShow}
          user={user}
          clearModal={props.onClearModal}
          data={langData}
        />
      )}
      {(props.bidToTransfer || props.bidToShow) && (
        <div
          className="offers-modal-background"
          onClick={() => props.onClearModal()}
        ></div>
      )}
    </div>
  );
}

export default OffersModal;
