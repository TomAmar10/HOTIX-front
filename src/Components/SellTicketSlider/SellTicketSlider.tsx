import { useRef, useState } from "react";
import Slider from "react-slick";
import { Event } from "../../models/Event";
import { User } from "../../models/User";
import TicketsAmount from "./TicketsAmount";
import TicketsDetails from "./TicketsDetails";
import TicketType from "./TicketType";
import TicketUpload from "./TicketUpload";
import SaleCompleted from "./SaleCompleted";
import PaymentDetails from "./PaymentDetails";
import { Ticket } from "../../models/Ticket";
import "./SellTicketSlider.scss";

interface props {
  user: User | null;
  event: Event | null;
}

const initialTickets = [
  {
    _id: "",
    id_event: "",
    id_owner: "",
    type: "",
    area: 0,
    row: 0,
    seat: 0,
    price: 0,
    image: "",
    time_create: undefined,
  },
];

function SellTicketSlider(props: props): JSX.Element {
  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [amount, setAmount] = useState(0);
  const [ticketFile, setTicketFile] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState(0);
  const settings = {
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
  };

  const changeAmount = (value: number) => {
    const ticketsArray = [];
    for (let i = 0; i < value; i++) {
      const newTicket = { ...tickets[0] };
      ticketsArray.push(newTicket);
    }
    setAmount(+value);
    setTickets(ticketsArray);
    moveForward();
  };

  const changeTicketDetails = () => {
    setTickets((prev) => [...prev]);
    moveForward();
  };

  const changeTicketType = (type: string, price: number) => {
    setTickets((prev) => [...prev, { ...prev[0], price, type }]);
    moveForward();
  };

  const changeTicketFile = () => {
    setTicketFile(0);
    moveForward();
  };

  const changePaymentDetails = () => {
    setPaymentDetails(0);
    moveForward();
  };

  const dotClick = (num: number) => {
    if (num < currentSlide) sliderRef.current.slickGoTo(num);
  };

  const handleAfterChange = (index: number) => setCurrentSlide(index);

  const moveForward = () => sliderRef.current.slickNext();
  const moveBackwards = () => sliderRef.current.slickPrev();

  return (
    <div className="SellTicketSlider">
        <h4 className="ticket-hotix-header">
          Ho<span>tix</span>
        </h4>
        <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange}>
          <TicketsAmount onSubmit={changeAmount} event={props.event} />
          <TicketsDetails
            amount={amount}
            onSubmit={changeTicketDetails}
            onMoveBackwards={moveBackwards}
          />
          <TicketType onSubmit={changeTicketType} onMoveBackwards={moveBackwards} />
          <TicketUpload onSubmit={changeTicketFile} onMoveBackwards={moveBackwards}/>
          <PaymentDetails onSubmit={changePaymentDetails} onMoveBackwards={moveBackwards} />
          <SaleCompleted />
        </Slider>
      {/* <div className="dots-area">
        {[0, 1, 2, 3, 4, 5].map((d) => (
          <button
            key={d}
            value={d}
            onClick={() => dotClick(d)}
            className={`${currentSlide === d ? "active-slide" : ""} ${
              currentSlide > d ? "previous" : ""
            }`}
          ></button>
        ))}
      </div> */}
    </div>
  );
}

export default SellTicketSlider;
