import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import LangModel from "../../languageControl/Language";
import SideNavList from "./SideNavList";
import { User } from "../../models/User";
import "./SideNav.scss";

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

interface props {
  language: string;
  data: LangModel;
  user: User;
}

export default function SideNav(props: props) {
  const [open, setOpen] = React.useState(false);
  const user = props.user;
  const isHebrew = props.language === "HEBREW";
  const backgroundColor = "#f8f8f8"; // $color4
  const textColor = "#2a0659"; // color1
  const boxShadow = "rgba(255, 255, 255, 0.35) 1.95px 1.95px 15px";
  const justifyContent = "space-between";

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", position: "absolute" }}>
      <Drawer
        className="drawer"
        anchor={isHebrew ? "right" : "left"}
        PaperProps={{
          sx: {
            boxShadow,
            backgroundColor,
            justifyContent,
            borderRadius: "10px",
          },
        }}
        variant="permanent"
        open={open}
        onMouseEnter={openDrawer}
        onMouseLeave={closeDrawer}
      >
        {user && (
          <SideNavList
            data={props.data.SideNav}
            user={user}
            color={textColor}
            isHebrew={isHebrew}
            isOpen={open}
          />
        )}
      </Drawer>
    </Box>
  );
}
