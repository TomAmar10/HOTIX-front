import { useRef, useState } from "react";
import Slider from "react-slick";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import TicketsAmount from "./TicketsAmount";
import TicketsDetails from "./TicketsDetails";
import TicketUpload from "./TicketUpload";
import SaleCompleted from "./SaleCompleted";
import { Ticket } from "../../../models/Ticket";
import service from "../../../services/ticketService";
import StepsDots from "../StepsDots/StepsDots";
import NextPrevButtons from "../NextPrevButtons/NextPrevButtons";
import convertToBase64 from "../../../utils/convertBase64";
import "./SellTicketSlider.scss";

interface props {
  user: User | null;
  event: Event | null;
  maxToSell: number;
}

function SellTicketSlider(props: props): JSX.Element {
  const sliderRef = useRef<any>(null);
  const [nextReady, setNextReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDetailsValid, setIsDetailsValid] = useState(false);
  const [isImagesValid, setIsImagesValid] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
  };

  const changeAmount = (value: number) => {
    if (isDetailsValid) setIsDetailsValid(value <= tickets.length);
    if (isImagesValid) setIsImagesValid(value <= tickets.length);
    const ticketsArray = [];
    for (let i = 0; i < value; i++) {
      const newTicket = {
        type: "Regular",
        currency: "USD",
        id_event: props.event?._id,
        id_owner: props.user?._id,
      } as Ticket;
      ticketsArray.push(newTicket);
    }
    setTickets(ticketsArray);
    setNextReady(value > 0);
  };

  const changeTicketDetails = (newTickets: Ticket[], isValid: boolean) => {
    setTickets(newTickets);

    if (isValid) setIsDetailsValid(true);
    setNextReady(isValid);
  };

  const changeTicketFiles = async (
    files: File[],
    proofFile: File,
    isValid: boolean
  ) => {
    if (isValid) {
      const newTickets = await Promise.all(
        tickets.map(async (t, i) => {
          return {
            ...t,
            image: await convertToBase64(files[i]),
          };
        })
      );
      setTickets(newTickets as Ticket[]);
    }
    if (isValid) setIsImagesValid(true);
    setNextReady(isValid);
  };

  const moveForward = () => {
    sliderRef.current.slickNext();
    setCurrentSlide((prev) => ++prev);
    if (currentSlide === 0) setNextReady(isDetailsValid);
    if (currentSlide === 1) setNextReady(isImagesValid);
    if (currentSlide === 2) service.addTickets(tickets);
  };
  const moveBackwards = () => {
    sliderRef.current.slickPrev();
    setCurrentSlide((prev) => --prev);
    setNextReady(true);
  };
  const handleAfterChange = (index: number) => setCurrentSlide(index);

  return (
    <div className="SellTicketSlider">
      <StepsDots currentSlide={currentSlide} slides={3} />
      <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange}>
        <TicketsAmount
          onSubmit={changeAmount}
          event={props.event}
          isCurrent={currentSlide === 0}
          amount={tickets.length}
          maxToSell={props.maxToSell}
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
        <SaleCompleted
          isCurrent={currentSlide === 3}
          user={props.user}
          sellerMode
        />
      </Slider>
      {currentSlide !== 3 && (
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
