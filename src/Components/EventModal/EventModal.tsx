import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserModes } from "../../store/authSlice";
import { eventActions } from "../../store/eventSlice";
import { IStore } from "../../store/store";
import SellTicketSlider from "../SellTicketSlider/SellTicketSlider";
import "./EventModal.scss";
import EventPreview from "./EventPreview";

function EventModal(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const currentEvent = useSelector(
    (state: IStore) => state.events.currentEvent
  );
  const dispatch = useDispatch();
  const userMode = useSelector((state: IStore) => state.user.mode);
  const [isPreviewStage, setIsPreviewStage] = useState(true);

  const hideModal = () => {
    dispatch(eventActions.clearSingleEvent());
  };

  return (
    <>
      <div className="EventModal">
        {isPreviewStage && (
          <EventPreview
            onMoveToSecondStep={() => setIsPreviewStage(false)}
            userMode={userMode}
          />
        )}
        {!isPreviewStage &&
          ((userMode === UserModes.SELLER && (
            <SellTicketSlider user={user} event={currentEvent} />
          )) ||
            (userMode === UserModes.BUYER && ""))}
      </div>
      <div className="EventModal-holder" onClick={hideModal}></div>
    </>
  );
}

export default EventModal;