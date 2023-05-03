import ProfileNav from "../Components/Profile/ProfileNav/ProfileNav";
import { Outlet } from "react-router-dom";
import ProfileSection from "../Components/Profile/ProfileSection";
import HotixTitle from "../Components/HotixTitle/HotixTitle";

function ProfileRootLayout(): JSX.Element {
  return (
    <main className="container-main profile-container">
      <HotixTitle profilePage />
      <ProfileNav />
      <ProfileSection>
        <Outlet />
      </ProfileSection>
    </main>
  );
}

export default ProfileRootLayout;
