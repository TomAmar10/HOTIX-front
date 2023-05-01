import { Outlet } from "react-router-dom";
import SideNav from "../Components/SideNav/SideNav";

function MainLayout(): JSX.Element {
  return (
    <div className="home-sideNav-container">
      <SideNav />
      <main className="container-main">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
