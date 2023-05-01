import { SyntheticEvent, useEffect, useState } from "react";
import { Event } from "../../models/Event";
import useDebounce from "../../utils/useDebounce";
import {
  categoryImages as images,
  topHeaderImage,
} from "../../utils/file-import";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserModes, userActions } from "../../store/authSlice";
import { IStore } from "../../store/store";
import "./HomeTopHeader.scss";
import { eventActions } from "../../store/eventSlice";

interface props {
  events: Event[] | null;
}

function HomeTopHeader(props: props): JSX.Element {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState<Event[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);
  const dispatch = useDispatch();
  const user = useSelector((state: IStore) => state.user.user);
  const userMode = useSelector((state: IStore) => state.user.mode);
  const currDate = new Date().toISOString().split("T")[0];
  const yearFromNow = new Date().setFullYear(new Date().getFullYear() + 1);
  const latestDate = new Date(yearFromNow).toISOString().split("T")[0];
  const [firstDate, setFirstDate] = useState<string>(currDate);
  const [lastDate, setLastDate] = useState<string>(latestDate);

  useEffect(() => {
    async function search() {
      const newEventsList = props.events?.filter(
        (e) =>
          (e.event_name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            e.location.toLowerCase().includes(searchValue.toLowerCase())) &&
          new Date(e.date).getTime() >= new Date(firstDate).getTime() &&
          new Date(e.date).getTime() <= new Date(lastDate).getTime()
      );
      setCurrentEvents(newEventsList || null);
    }
    if (debouncedSearch) search();
    else setCurrentEvents(null);
  }, [debouncedSearch, firstDate, lastDate, props.events, searchValue]);

  const logout = () => {
    dispatch(userActions.logout());
  };

  const toggleMode = () => {
    const isBuyer = userMode === UserModes.BUYER;
    dispatch(userActions.setMode(isBuyer ? UserModes.SELLER : UserModes.BUYER));
  };

  const clickEvent = (event: Event) => {
    setTimeout(() => {
      dispatch(eventActions.setSingleEvent(event));
    }, 100);
  };

  const onInputBlur = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 100);
  };

  const changeFirstDate = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const nextDay = new Date(value).getDate() + 1;
    const minReturnDate = new Date(new Date(value).setDate(nextDay))
      .toISOString()
      .split("T")[0];
    setFirstDate(value);
    setLastDate(minReturnDate);
  };

  const createEvent = () => {
    setTimeout(() => {
      dispatch(eventActions.startCreating());
    }, 100);
  };

  return (
    <div className="HomeTopHeader">
      <img className="crowd-at-show-image" src={topHeaderImage} alt="show" />
      <div className="top-header-content">
        <header>
          <h5 className="hotix-header">Hotix</h5>
          <div className="header-navigator">
            {user && (
              <>
                <button className="navigate-btn" onClick={toggleMode}>
                  {userMode === UserModes.BUYER ? " Seller" : " Buyer"} Mode
                </button>
                |
              </>
            )}
            <NavLink to={"/auth"} className="navigate-btn" onClick={logout}>
              {user ? "Logout " : "Login "}
            </NavLink>
          </div>
        </header>
        <div className="top-header-main-area">
          <h3>Swap easily, fast and secure.</h3>
          <p>
            Look no further! Our SBS The Show tickets are the simplest way for
            you to experience a live Kpop recording
          </p>
        </div>
        <div className="search-event-area">
          <div className="search-section">
            <input
              className="form-control"
              type="date"
              min={currDate}
              onChange={changeFirstDate}
              value={firstDate}
            />
            <i className="fa-solid fa-arrow-right"></i>
            <input
              className="form-control"
              type="date"
              min={firstDate}
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
            />
          </div>
          <div className="dropdown">
            <div className="search-section">
              <input
                className="form-control"
                onFocus={() => setIsFocus(true)}
                onBlur={onInputBlur}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Search for artists, stadiums, and events"
              />
              {!isFocus && (
                <button className="search-event-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              )}
              {isFocus && (
                <button className="search-event-btn">
                  <i className="fa-solid fa-magnifying-glass fa-beat"></i>
                </button>
              )}
            </div>
            {currentEvents && isFocus && (
              <div className="dropdown-content">
                {currentEvents.length < 1 && <span>No events to show</span>}
                {currentEvents.map((e) => (
                  <div
                    className="dropdown-search-result"
                    key={e._id}
                    onClick={() => clickEvent(e)}
                  >
                    {e.id_category.name && (
                      <img
                        className="search-result-image"
                        src={images[e.id_category.name.replace(" ", "_")]}
                        alt={e.id_category.name}
                      />
                    )}
                    <div>
                      <h6 className="search-result-name">{e.event_name}</h6>
                      <span className="search-result-description">
                        {e.description}
                      </span>
                    </div>
                  </div>
                ))}
                <button className="see-all-results-btn">See all results</button>
                <button className="create-new-event" onClick={createEvent}>
                  Can't find your event? Create a new one!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTopHeader;
