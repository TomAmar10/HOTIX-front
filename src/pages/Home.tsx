import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryCarousel from "../Components/CategoryCarousel/CategoryCarousel";
import EventModal from "../Components/EventModal/EventModal";
import Footer from "../Components/Footer/Footer";
import HomeTopHeader from "../Components/HomeTopHeader/HomeTopHeader";
import UpcomingEvents from "../Components/UpcomingEvents/UpcomingEvents";
import { Category } from "../models/Category";
import eventService from "../services/eventService";
import { eventActions } from "../store/eventSlice";
import { IStore } from "../store/store";
import { Event } from "../models/Event";

function HomePage(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const events = useSelector((state: IStore) => state.events.events);
  const currentEvent = useSelector(
    (state: IStore) => state.events.currentEvent
  );
  const isCreatingEvent = useSelector(
    (state: IStore) => state.events.isCreatingEvent
  );
  const dispatch = useDispatch();

  useEffect(() => {
    eventService.getAllCategories().then((res) => setCategories(res.data));
    eventService
      .getAllEvents()
      .then((res) =>
        dispatch(
          eventActions.setEvents(
            res.data
              .filter((e: Event) => e.isApproved)
              .sort(
                (a: Event, b: Event) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
          )
        )
      );
  }, [dispatch]);

  return (
    <main className="container-main">
      <div className="home-page-container">
        <HomeTopHeader events={events} />
        <CategoryCarousel categories={categories} />
        <UpcomingEvents categories={categories} events={events} />
      </div>
      <Footer />
      {(currentEvent || isCreatingEvent) && (
        <EventModal isNewEvent={isCreatingEvent} />
      )}
    </main>
  );
}

export default HomePage;
