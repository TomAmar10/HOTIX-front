import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import AdminData from "../Components/AdminData/AdminData";
import { useEffect, useState } from "react";
import { User } from "../models/User";
import { Event } from "../models/Event";
import useUserService from "../services/userService";
import useEventService from "../services/eventService";

function AdminPage(): JSX.Element {
  const userService = useUserService();
  const eventService = useEventService();
  const user = useSelector((state: IStore) => state.user.user);
  const langData = useSelector((state: IStore) => state.language.langData);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    userService.getAllUsers().then((res) => setAllUsers(res));
    eventService.getInitialEvents().then((res) => {
      setAllEvents(res.data);
    });
  }, []);

  return (
    <main className="container-main">
      <AdminData
        user={user}
        data={langData}
        users={allUsers}
        events={allEvents}
      />
    </main>
  );
}

export default AdminPage;
