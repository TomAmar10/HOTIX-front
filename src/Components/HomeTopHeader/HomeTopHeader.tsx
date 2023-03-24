import "./HomeTopHeader.scss";

function HomeTopHeader(): JSX.Element {
  return (
    <div className="HomeTopHeader">
      <img
        className="crowd-at-show-image"
        src="https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=1600"
        // src="https://images.pexels.com/photos/1120162/pexels-photo-1120162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="show"
      />
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
            <h5>Search Event</h5>
            <input type="text" />
          </div>
          <div className="search-section">
            <h5>Place</h5>
            <input type="text" />
          </div>
          <div className="search-section">
            <h5>Time</h5>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTopHeader;
