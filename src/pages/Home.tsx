import { useSelector } from "react-redux";
import Footer from "../Components/Footer/Footer";
import HomeTopHeader from "../Components/HomeTopHeader/HomeTopHeader";
import UpcomingEvents from "../Components/UpcomingEvents/UpcomingEvents";
import { IStore } from "../store/store";
import Spinner from "../Components/UI/Spinner";
import PopularEvents from "../Components/PopularEvents/PopularEvents";
import PopularCommunities from "../Components/PopularCommunities/PopularCommunities";

function HomePage(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  const user = useSelector((state: IStore) => state.user.user);
  const favoriteEvents = useSelector((state: IStore) => state.user.favorites);
  const language = useSelector((state: IStore) => state.language.language);
  const categories =
    useSelector((state: IStore) => state.categories.categories) || [];
  const communities =
    useSelector((state: IStore) => state.communities.communities) || [];
  const events = useSelector((state: IStore) => state.events.events)?.filter(
    (e) => new Date(e.date).getTime() > new Date().getTime()
  );
  const isLoading = useSelector((state: IStore) => state.events.isLoading);
  const currentMode = useSelector((state: IStore) => state.user.mode);

  return (
    <main className="container-main">
      <div className="home-page-container">
        <HomeTopHeader events={events || []} data={langData} />
        {!isLoading && (
          <>
            {events && categories && (
              <>
                <PopularEvents
                  favorites={favoriteEvents}
                  user={user}
                  categories={categories}
                  language={language}
                  data={langData}
                  events={events}
                  mode={currentMode}
                />
                <UpcomingEvents
                  favorites={favoriteEvents}
                  mode={currentMode}
                  categories={categories}
                  events={events}
                  data={langData}
                  user={user}
                />
                <PopularCommunities communities={communities} />
              </>
            )}
          </>
        )}
      </div>
      {isLoading && <Spinner style={{ margin: "15rem 0" }} />}
      <Footer />
    </main>
  );
}

export default HomePage;
