import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface props {
  item: any;
  isOpen: boolean;
  color: string;
  isHebrew: boolean;
}

export default function SideNavItem(props: props) {
  const margin = props.item.isProfile ? 2.5 : 3;
  const marginRight = props.isOpen && !props.isHebrew ? margin : "auto";
  const marginLeft = props.isOpen && props.isHebrew ? margin : "auto";
  const pixels = props.item.isProfile ? 2 : 2.5;
  return (
    <ListItem
      disablePadding
      sx={{ display: "block" }}
      key={props.item.name}
      onClick={props.item.click}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: props.isOpen ? "initial" : "center",
          px: pixels,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: marginRight,
            ml: marginLeft,
            justifyContent: "center",
            color: props.color,
          }}
        >
          {props.item.item}
        </ListItemIcon>
        <ListItemText
          primary={props.item.name}
          sx={{
            opacity: props.isOpen ? 1 : 0,
            color: props.color,
            textAlign: props.isHebrew ? "right" : "left",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
