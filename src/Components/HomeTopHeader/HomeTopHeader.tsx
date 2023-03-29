import { useEffect, useState } from "react";
import { Event } from "../../models/Event";
import useDebounce from "../../utils/useDebounce";
import {
  categoryImages as images,
  topHeaderImage,
} from "../../utils/file-import";
import "./HomeTopHeader.scss";

interface props {
  events: Event[];
}

function HomeTopHeader(props: props): JSX.Element {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState<Event[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    async function search() {
      const newEventsList = props.events.filter(
        (e) =>
          e.event_name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          e.location.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCurrentEvents(newEventsList);
    }

    if (debouncedSearch) search();
    else setCurrentEvents(null);
  }, [debouncedSearch, props.events, searchValue]);

  return (
    <div className="HomeTopHeader">
      <img className="crowd-at-show-image" src={topHeaderImage} alt="show" />
      <div className="top-header-content">
        <header>Hotix</header>
        <div className="top-header-main-area">
          <h3>Swap easily, fast and secure.</h3>
          <p>
            Look no further! Our SBS The Show tickets are the simplest way for
            you to experience a live Kpop recording
          </p>
        </div>
        <div className="search-event-area">
          <div className="search-section">
            <input className="form-control" type="date" />
            <i className="fa-solid fa-arrow-right"></i>
            <input className="form-control" type="date" />
          </div>
          <div className="dropdown">
            <div className="search-section">
              <input
                className="form-control"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
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
                  <div className="dropdown-search-result" key={e._id}>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTopHeader;
