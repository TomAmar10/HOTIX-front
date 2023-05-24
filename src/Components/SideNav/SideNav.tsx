import "./SideNav.scss";

import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../store/store";
import { eventActions } from "../../store/eventSlice";
import { randomProfile } from "../../utils/file-import";

const drawerWidth = 270;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNav() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: IStore) => state.user.user);
  const dispatch = useDispatch();
  const startCreatingEvent = () => dispatch(eventActions.startCreating());
  const bgColor = "#5f17e1"; // $color1
  const textColor = "#f8f8f8"; // $color4
  const background = 'linear-gradient(to right, #7a3deb, #5f17e1)'
  const boxShadow = 'rgba(255, 255, 255, 0.35)  1.95px 1.95px 5px';
  const listItems = [
    { name: "Calender", item: <CalendarMonthIcon /> },
    { name: "Wallet", item: <AccountBalanceWalletIcon /> },
    {
      name: "Create new event",
      item: <EventNoteIcon />,
      click: startCreatingEvent,
    },
    { name: "Settings", item: <SettingsIcon /> },
  ];
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        className="drawer"
        PaperProps={{ sx: { backgroundColor: bgColor, boxShadow, background} }}
        variant="permanent"
        open={open}
        onMouseEnter={openDrawer}
        onMouseLeave={closeDrawer}
      >
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate(`profile/${user?._id}/tickets`)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2.5 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  className="sideNav-profile-img"
                  src={user?.image || randomProfile}
                  alt={user?.first_name}
                />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0, color:textColor }}>
                <div className="sideNav-profile-name-area">
                  <span className="sideNav-profile-name">
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span className="sideNav-profile-email">{user?.email}</span>
                </div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          {listItems.map((i) => (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              key={i.name}
              onClick={i.click}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: textColor,
                  }}
                >
                  {i.item}
                </ListItemIcon>
                <ListItemText
                  primary={i.name}
                  sx={{ opacity: open ? 1 : 0, color: textColor }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div
          className="sideNav-user-profile-section"
          style={{ opacity: open ? 1 : 0, height: open ? "" : 0 }}
        >
          <div>
            <AccountCircleOutlinedIcon className="profile-section-icon" />
            <span>Edit Profile</span>
          </div>
          <div>
            <ConfirmationNumberOutlinedIcon className="profile-section-icon" />
            <span>Tickets</span>
          </div>
          <div>
            <LocalOfferOutlinedIcon className="profile-section-icon" />
            <span>Offers</span>
          </div>
          <div>
            <AccountBalanceWalletOutlinedIcon className="profile-section-icon" />
            <span>Wallet</span>
          </div>
          <div>
            <HistoryOutlinedIcon className="profile-section-icon" />
            <span>History</span>
          </div>
          <div>
            <SettingsOutlinedIcon className="profile-section-icon" />
            <span>Settings</span>
          </div>
        </div>
      </Drawer>
    </Box>
  );
}
