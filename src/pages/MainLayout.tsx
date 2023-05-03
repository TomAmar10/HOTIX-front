import { Outlet } from "react-router-dom";
import SideNav from "../Components/SideNav/SideNav";
import { useSelector } from "react-redux";
import { IStore } from "../store/store";

function MainLayout(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  return (
    <div className="home-sideNav-container">
      {user && <SideNav />}
      <main className="container-main">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
