import { format } from "date-fns";
import LangModel from "../../languageControl/Language";
import { Community } from "../../models/Community";
import { Event } from "../../models/Event";
import { User } from "../../models/User";
import { crowdImage, randomProfile } from "../../utils/file-import";
import { DealIcon, EventIcon, MemberIcon, TicketIcon } from "../../utils/icons";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./CommunityProfile.scss";
import SingleSellerCard from "../EventModal/BuyerModal/SingleSellerCard";

interface props {
  data: LangModel;
  community: Community;
  user: User | null;
}

function CommunityProfile(props: props): JSX.Element {
  const { community, user } = props;
  const events = community.events as Event[];

  return (
    <div className="CommunityProfile">
      <div className="community-top">
        <img src={crowdImage} alt={"crowd-at-show"} className="bg-image" />
        <div className="community-header">
          <div className="community-profile">
            <img src={community.image} alt={`${community.name}`} />
            <h2 className="community-name">{community.name}</h2>
          </div>
          <div className="community-nav">
            <div className="navigator">
              <button>Events</button>
              <button>Tickets</button>
              <button>Updates</button>
            </div>
            <button>Invite +</button>
          </div>
        </div>
      </div>
      <div className="basic-details">
        <div className="detail">
          <MemberIcon />
          <h3>Members</h3>
          <span>144</span>
        </div>
        <div className="detail">
          <EventIcon />
          <h3>Events</h3>
          <span>21</span>
        </div>
        <div className="detail">
          <TicketIcon />
          <h3>Total Tickets</h3>
          <span>47</span>
        </div>
        <div className="detail">
          <DealIcon />
          <h3>Sales</h3>
          <span>8</span>
        </div>
      </div>
      <div className="page-container">
        <div className="main-content">
          <div className="community-upcoming-event">
            <h2 className="event-header">{events[0].event_name}</h2>
            <p>{events[0].description}</p>
            <div className="detail">
              <CalendarMonthIcon />
              {format(new Date(events[0].date as string), "dd, MMM, p")}
            </div>
            <div className="detail">
              <LocationOnIcon /> {events[0].location}
            </div>
            <div className="sellers">
              {/* <SingleSellerCard /> */}
            </div>
          </div>
        </div>
        <div className="updates-container">
          <h2 className="updates-header">Updates</h2>
          <hr />
          <div className="updates">
            <div className="single-update">
              <div className="updated-user-details">
                <img
                  src={user?.image || randomProfile}
                  alt={user?.first_name}
                />
                <div className="user-name-role">
                  <h5>
                    {user?.first_name} {user?.last_name}
                  </h5>
                  <span>Community role</span>
                </div>
              </div>
              <div className="update-details">
                <p>
                  adipisicing elit. Voluptatum, vitae repellat? Enim ea, rerum
                  voluptate.
                </p>
                <span>07/09/2023</span>
              </div>
            </div>
            <hr />
            <div className="single-update">
              <div className="updated-user-details">
                <img
                  src={community?.image || randomProfile}
                  alt={user?.first_name}
                />
                <div className="user-name-role">
                  <h5>{community.name}</h5>
                  <span>Community Admin</span>
                </div>
              </div>
              <div className="update-details">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatum, vitae repellat? Enim ea, rerum voluptate...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityProfile;
