import { Outlet } from "react-router-dom";
import SideNav from "../Components/SideNav/SideNav";
import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import EventModal from "../Components/EventModal/EventModal";
import { useEffect } from "react";
import useEventService from "../services/eventService";
import useBidService from "../services/bidService";
import useTicketService from "../services/ticketService";
import useTagService from "../services/tagService";

function MainLayout(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const language = useSelector((state: IStore) => state.language.language);
  const langData = useSelector((state: IStore) => state.language.langData);
  const bidService = useBidService();
  const ticketService = useTicketService();
  const eventService = useEventService();
  const tagService = useTagService();
  const currentEvent = useSelector(
    (state: IStore) => state.events.currentEvent
  );
  const isCreatingEvent = useSelector(
    (state: IStore) => state.events.isCreatingEvent
  );
  const isUpdatingEvent = useSelector(
    (state: IStore) => state.events.isUpdatingEvent
  );

  useEffect(() => {
    eventService.getInitialEvents();
    if (user?._id) {
      bidService.getUserBids(user?._id as string);
      ticketService.getUserTickets(user._id as string);
    }
    tagService.getAllTags();
  }, [user?._id]);

  return (
    <div
      className="home-sideNav-container"
      style={{ direction: language === "HEBREW" ? "rtl" : "ltr" }}
    >
      {user && <SideNav language={language} data={langData} />}
      <main className="container-main">
        <Outlet />
        {(currentEvent || isCreatingEvent || isUpdatingEvent) && (
          <EventModal
            isCreating={isCreatingEvent}
            isUpdating={isUpdatingEvent}
            data={langData}
            language={language}
          />
        )}
      </main>
    </div>
  );
}

export default MainLayout;
