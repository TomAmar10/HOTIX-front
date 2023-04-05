import "./SideNav.scss";

import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const drawerWidth = 270;

const listItems = [
  { name: "Calender", item: <CalendarMonthIcon /> },
  { name: "Rewards", item: <EmojiEventsIcon /> },
  { name: "Address", item: <HomeIcon /> },
  { name: "Wallet", item: <AccountBalanceWalletIcon /> },
  { name: "Settings", item: <SettingsIcon /> },
];

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

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        PaperProps={{ sx: { backgroundColor: "#F6F6F6" } }}
        variant="permanent"
        open={open}
        onMouseEnter={openDrawer}
        onMouseLeave={closeDrawer}
      >
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
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
                  src="https://scontent.ftlv5-1.fna.fbcdn.net/v/t39.30808-6/275778763_5251147191596052_2452781285435413025_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=KCRYiGtwR6oAX-quPt2&_nc_ht=scontent.ftlv5-1.fna&oh=00_AfBWy0Jgo4pWzlWYE4V1VZp4GEB9eyRWVIm1mUEoyQbnbg&oe=642AFEDA"
                  alt=""
                />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <div className="sideNav-profile-name-area">
                  <span className="sideNav-profile-name">Tom Amar</span>
                  <span className="sideNav-profile-email">
                    Tomayos@gmail.com
                  </span>
                </div>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          {listItems.map((i) => (
            <ListItem disablePadding sx={{ display: "block" }} key={i.name}>
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
                  }}
                >
                  {i.item}
                </ListItemIcon>
                <ListItemText primary={i.name} sx={{ opacity: open ? 1 : 0 }} />
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
