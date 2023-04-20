import { useRef, useState } from "react";
import Slider from "react-slick";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import TicketsAmount from "./TicketsAmount";
import TicketsDetails from "./TicketsDetails";
import TicketUpload from "./TicketUpload";
import SaleCompleted from "./SaleCompleted";
import PaymentDetails from "./PaymentDetails";
import { Ticket } from "../../../models/Ticket";
import NoticeMessage from "./NoticeMessage";
import { card_details } from "../../../models/CreditCard";
import service from "../../../services/ticketService";
import StepsDots from "../StepsDots/StepsDots";
import NextPrevButtons from "../NextPrevButtons/NextPrevButtons";
import convertToBase64 from "../../../utils/convertBase64";
import "./SellTicketSlider.scss";

interface props {
  user: User | null;
  event: Event | null;
}

function SellTicketSlider(props: props): JSX.Element {
  const sliderRef = useRef<any>(null);
  const [nextReady, setNextReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [creditCard, setCreditCard] = useState<card_details>();
  const [price, setPrice] = useState(0);
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
  };

  const changeAmount = (value: number) => {
    const ticketsArray = [];
    for (let i = 0; i < value; i++) {
      const newTicket = { ...tickets[0] };
      ticketsArray.push(newTicket);
    }
    setTickets(ticketsArray);
    setNextReady(value > 0);
  };

  const changeTicketDetails = (newTickets: Ticket[], isValid: boolean) => {
    setTickets(newTickets);
    const newPrice = tickets.reduce((acc, curr) => (acc += +curr.price), 0);
    setPrice(newPrice);
    setNextReady(isValid);
  };

  const changeTicketFiles = async (files: File[], isValid: boolean) => {
    if (isValid) {
      const newTickets = await Promise.all(
        tickets.map(async (t, i) => {
          return {
            ...t,
            id_event: props.event?._id,
            id_owner: props.user?._id,
            image: await convertToBase64(files[i]),
          };
        })
      );
      setTickets(newTickets as Ticket[]);
    }
    setNextReady(isValid);
  };

  const changePaymentDetails = (card: card_details, isValid: boolean) => {
    if (isValid) setCreditCard(card);
    setNextReady(isValid);
  };

  const moveForward = () => {
    if (currentSlide === 4) service.addTickets(tickets);
    sliderRef.current.slickNext();
    setCurrentSlide((prev) => ++prev);
    setNextReady(false);
  };
  const moveBackwards = () => {
    sliderRef.current.slickPrev();
    setCurrentSlide((prev) => --prev);
    setNextReady(true);
  };
  const handleAfterChange = (index: number) => setCurrentSlide(index);

  return (
    <div className="SellTicketSlider">
      <StepsDots currentSlide={currentSlide} slides={5} />
      <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange}>
        <TicketsAmount
          onSubmit={changeAmount}
          event={props.event}
          isCurrent={currentSlide === 0}
        />
        <TicketsDetails
          isCurrent={currentSlide === 1}
          tickets={tickets}
          onSubmit={changeTicketDetails}
        />
        <TicketUpload
          isCurrent={currentSlide === 2}
          tickets={tickets}
          onSubmit={changeTicketFiles}
        />
        <NoticeMessage
          user={props.user}
          isCurrent={currentSlide === 3}
          onSubmit={(isReady: boolean) => setNextReady(isReady)}
        />
        <PaymentDetails
          price={price}
          isCurrent={currentSlide === 4}
          onSubmit={changePaymentDetails}
        />
        <SaleCompleted isCurrent={currentSlide === 5} sellerMode />
      </Slider>
      {currentSlide !== 5 && (
        <NextPrevButtons
          allowNext={nextReady}
          onMoveForward={moveForward}
          onMoveBackwards={moveBackwards}
          isFirstStep={currentSlide === 0}
        />
      )}
    </div>
  );
}

export default SellTicketSlider;
