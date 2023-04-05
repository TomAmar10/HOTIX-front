import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryCarousel from "../Components/CategoryCarousel/CategoryCarousel";
import EventModal from "../Components/EventModal/EventModal";
import Footer from "../Components/Footer/Footer";
import HomeTopHeader from "../Components/HomeTopHeader/HomeTopHeader";
import SideNav from "../Components/SideNav/SideNav";
import UpcomingEvents from "../Components/UpcomingEvents/UpcomingEvents";
import { Category } from "../models/Category";
import eventService from "../services/eventService";
import { eventActions } from "../store/eventSlice";
import { IStore } from "../store/store";

function HomePage(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const events = useSelector((state: IStore) => state.events.events);
  const currentEvent = useSelector((state: any) => state.events.currentEvent);
  const dispatch = useDispatch();

  useEffect(() => {
    eventService.getAllCategories().then((res) => setCategories(res.data));
    eventService.getAllEvents().then((res) => dispatch(eventActions.setEvents(res.data)));
  }, [dispatch]);

  return (
    <div className="home-sideNav-container">
      <SideNav />
      <main className="container-main">
        <div className="home-page-container">
          <HomeTopHeader events={events} />
          <CategoryCarousel categories={categories} />
          <UpcomingEvents categories={categories} events={events} />
        </div>
        <Footer />
        {currentEvent && <EventModal />}
      </main>
    </div>
  );
}

export default HomePage;
