import { useSelector } from "react-redux";
import UserSettings from "../Components/UserProfile/UserSettings/UserSettings";
import { IStore } from "../store/store";
import UserFeedbacks from "../Components/UserProfile/UserFeedbacks/UserFeedbacks";
import FavoriteEvents from "../Components/UserProfile/FavoriteEvents/FavoriteEvents";
import { useEffect, useState } from "react";
import { Event } from "../models/Event";
import { useLocation } from "react-router-dom";

function ProfilePage(): JSX.Element {
  const langData = useSelector(
    (state: IStore) => state.language.langData
  ).ProfilePage;
  const user = useSelector((state: IStore) => state.user.user);
  const events = useSelector((state: IStore) => state.events.events);
  const [favorites, setFavorites] = useState<Event[]>([]);
  const location = useLocation();
  const paramSection = new URLSearchParams(location.search).get("section");

  useEffect(() => {
    if (events) {
      const newFavorites = events.filter((e) =>
        user?.favorites.includes(e._id as string)
      );
      setFavorites(newFavorites);
    }
    if (paramSection === "favorites")
      window.scrollTo(0, document.body.scrollHeight);
  }, [events, paramSection, user?.favorites]);

  return (
    <>
      {user && (
        <>
          <UserSettings
            user={user}
            data={langData}
            isHighlight={paramSection === "settings"}
          />
          <UserFeedbacks user={user} data={langData} />
          <FavoriteEvents
            user={user}
            favorites={favorites || []}
            data={langData}
            isHighlight={paramSection === "favorites"}
          />
        </>
      )}
    </>
  );
}

export default ProfilePage;
