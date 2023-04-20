import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import ProfileNav from "../Components/ProfilePages/ProfileNav/ProfileNav";
import { Outlet } from "react-router-dom";

function ProfileRootLayout(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  return (
    <main className="container-main profile-container">
      <ProfileNav />
      <Outlet />
    </main>
  );
}

export default ProfileRootLayout;
