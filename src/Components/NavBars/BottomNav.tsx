import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useNavigate } from "react-router-dom";
import { eventActions } from "../../store/eventSlice";
import { useDispatch } from "react-redux";
import { User } from "../../models/User";
import { randomProfile } from "../../utils/file-import";
import "./BottomNav.scss";

interface props {
  user: User;
}

export default function BottomNav(props: props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const iconsList = [
    {
      icon: <EventNoteIcon />,
      click: () => dispatch(eventActions.startCreating()),
    },
    { icon: <HomeIcon />, click: () => navigate("/") },
    {
      icon: (
        <img
          className="profile-image-icon"
          src={props.user.image || randomProfile}
          alt={props.user.first_name}
        />
      ),
      click: () => navigate(`profile/${props.user?._id}`),
    },
    {
      icon: <LocalOfferIcon />,
      click: () => navigate(`profile/${props.user?._id}/offers`),
    },
    {
      icon: <ConfirmationNumberIcon />,
      click: () => navigate(`profile/${props.user?._id}/tickets`),
    },
  ];

  return (
    <div className="BottomNav">
      <div className="bottom-navigation">
        {iconsList.map((i, index) => (
          <div className="single-icon" onClick={i.click} key={index + "-icon"}>
            {i.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
