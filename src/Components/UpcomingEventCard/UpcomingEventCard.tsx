import "./UpcomingEventCard.scss";

function UpcomingEventCard(): JSX.Element {
  return (
    <div className="UpcomingEventCard">
      <div className="event-card-img-holder">
        <img
          className="event-card-img"
          // src="https://images.pexels.com/photos/2078008/pexels-photo-2078008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          src="https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
      </div>
      <div className="event-card-content">
        <div className="card-content-date">
          <span>AUG</span>
          <h3>20</h3>
        </div>
        <div className="card-content-details">
          <h6>Wonder Girls 2010 Wonder Girls World Tour San Francisco</h6>
          <p>
            We'll get you directly seated and inside for you to enjoy the show.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpcomingEventCard;
