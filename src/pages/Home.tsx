import CategoryCarousel from "../Components/CategoryCarousel/CategoryCarousel";
import Footer from "../Components/Footer/Footer";
import HomeTopHeader from "../Components/HomeTopHeader/HomeTopHeader";
import UpcomingEvents from "../Components/UpcomingEvents/UpcomingEvents";

function HomePage(): JSX.Element {
  return (
    <main className="container-main">
      <div className="home-page-container">
        <HomeTopHeader />
        <CategoryCarousel />
        <UpcomingEvents />
      </div>
        <Footer />
    </main>
  );
}

export default HomePage;
