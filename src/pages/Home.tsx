import { useEffect, useState } from "react";
import CategoryCarousel from "../Components/CategoryCarousel/CategoryCarousel";
import Footer from "../Components/Footer/Footer";
import HomeTopHeader from "../Components/HomeTopHeader/HomeTopHeader";
import UpcomingEvents from "../Components/UpcomingEvents/UpcomingEvents";
import { Category } from "../models/Category";
import { Event } from "../models/Event";
import eventService from "../services/eventService";

function HomePage(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    eventService.getAllCategories().then((res) => setCategories(res.data));
    eventService.getAllEvents().then((res) => setEvents(res.data));
  }, []);

  return (
    <main className="container-main">
      <div className="home-page-container">
        <HomeTopHeader events={events} />
        <CategoryCarousel categories={categories} />
        <UpcomingEvents categories={categories} events={events} />
      </div>
      <Footer />
    </main>
  );
}

export default HomePage;
