import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserModes } from "../../store/authSlice";
import { eventActions } from "../../store/eventSlice";
import { IStore } from "../../store/store";
import SellTicketSlider from "./SellTicketSlider/SellTicketSlider";
import BuyTicketSlider from "./BuyTicketSlider/BuyTicketSlider";
import EventPreview from "./EventPreview/EventPreview";
import "./EventModal.scss";
import NewEventForm from "./NewEvent/NewEventForm";
import { Event } from "../../models/Event";

interface props {
  isNewEvent: boolean;
}

function EventModal(props: props): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const currentEvent = useSelector(
    (state: IStore) => state.events.currentEvent
  );
  const dispatch = useDispatch();
  const userMode = useSelector((state: IStore) => state.user.mode);
  const userEventTicketsForSale =
    useSelector((state: IStore) => state.userTickets.ticketsForSale)?.filter(
      (t) => (t.id_event as Event)._id === currentEvent?._id
    ) || [];
  const [isPreviewStage, setIsPreviewStage] = useState(true);

  const hideModal = () => {
    dispatch(eventActions.clearSingleEvent());
    dispatch(eventActions.endCreating());
  };

  return (
    <>
      <div className="EventModal">
        {props.isNewEvent ? (
          <NewEventForm user={user} />
        ) : (
          <>
            {isPreviewStage ? (
              <EventPreview
                user={user}
                event={currentEvent}
                onMoveToSecondStep={() => setIsPreviewStage(false)}
                userMode={userMode}
                userTicketsForSale={userEventTicketsForSale}
              />
            ) : (
              <>
                {userMode === UserModes.SELLER ? (
                  <SellTicketSlider
                    user={user}
                    event={currentEvent}
                    maxToSell={6- userEventTicketsForSale.length}
                  />
                ) : (
                  <BuyTicketSlider user={user} event={currentEvent} />
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="EventModal-holder" onClick={hideModal}></div>
    </>
  );
}

export default EventModal;
