import { List } from "@mui/material";
import SideNavItem from "./SideNavItem";
import { Role, User } from "../../models/User";
import { randomProfile } from "../../utils/file-import";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch } from "react-redux";
import { eventActions } from "../../store/eventSlice";
import useAuthService from "../../services/authService";
import { LanguageSideNav } from "../../languageControl/Language";

interface props {
  isOpen: boolean;
  color: string;
  isHebrew: boolean;
  user: User;
  data: LanguageSideNav;
}

export default function SideNavList(props: props) {
  const user = props.user;
  const data = props.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authService = useAuthService();

  const listItems = [
    {
      item: (
        <img
          className="sideNav-profile-img"
          src={user?.image || randomProfile}
          alt={user?.first_name}
        />
      ),
      name: (
        <div className="sideNav-profile-name-area">
          <span className="sideNav-profile-name">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="sideNav-profile-email">{user?.email}</span>
        </div>
      ),
      click: () => navigate(`profile/${user?._id}`),
      isProfile: true,
    },
    {
      name: data.home,
      item: <HomeIcon />,
      click: () => navigate(`/`),
    },
    {
      name: data.tickets,
      item: <ConfirmationNumberIcon />,
      click: () => navigate(`profile/${user?._id}/tickets`),
    },
    {
      name: data.offers,
      item: <LocalOfferIcon />,
      click: () => navigate(`profile/${user?._id}/offers`),
    },
    {
      name: data.wallet,
      item: <AccountBalanceWalletIcon />,
      click: () => navigate(`profile/${user?._id}/wallet`),
    },
    {
      name: data.createEvent,
      item: <EventNoteIcon />,
      click: () => dispatch(eventActions.startCreating()),
    },
    { name: data.contact, item: <ContactSupportIcon /> },
  ];

  const bottomItems = [
    { name: data.settings, item: <SettingsIcon /> },
    {
      name: data.logout,
      item: <LogoutIcon />,
      click: () => authService.logout(),
    },
  ];

  if (user?.role === Role.ADMIN)
    listItems.push({
      name: data.admin,
      item: <AdminPanelSettingsIcon />,
      click: () => navigate("admin-page"),
    });

  return (
    <>
      <List>
        {listItems.map((i) => (
          <SideNavItem
            key={i.name + ""}
            isHebrew={props.isHebrew}
            item={i}
            isOpen={props.isOpen}
            color={props.color}
          />
        ))}
      </List>
      <List>
        {bottomItems.map((i) => (
          <SideNavItem
            key={i.name + ""}
            isHebrew={props.isHebrew}
            item={i}
            isOpen={props.isOpen}
            color={props.color}
          />
        ))}
      </List>
    </>
  );
}
