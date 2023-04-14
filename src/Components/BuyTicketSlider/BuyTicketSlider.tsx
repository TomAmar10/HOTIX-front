import { useEffect, useRef, useState } from "react";
import { Event } from "../../models/Event";
import { User } from "../../models/User";
import StepsDots from "../EventModal/StepsDots/StepsDots";
import Slider from "react-slick";
import service from "../../services/ticketService";
import { Ticket } from "../../models/Ticket";
import TicketsAmount from "../SellTicketSlider/TicketsAmount";
import SelectArea from "./SelectArea";
import SellersSlider from "./SellersSlider";
import NextPrevButtons from "../EventModal/NextPrevButtons/NextPrevButtons";
import "./BuyTicketSlider.scss";

interface props {
  user: User | null;
  event: Event | null;
}

function BuyTicketSlider(props: props): JSX.Element {
  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [amount, setAmount] = useState(0);
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [nextReady, setNextReady] = useState(false);
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
  };

  useEffect(() => {
    props.event?._id &&
      service.getTicketsByEvent(props.event?._id).then((res: Ticket[]) => {
        setTickets(res);
        const areas: string[] = [];
        res.forEach((ticket) => {
          if (!areas.includes(ticket.area)) areas.push(ticket.area);
        });
        setAvailableAreas(areas);
      });
  }, [props.event?._id]);

  const changeAmount = (value: number) => {
    setAmount(value);
    setNextReady(true);
  };

  const changeArea = (areas: string[]) => {
    setSelectedAreas(areas);
    setNextReady(areas.length > 0);
  };

  const moveForward = () => {
    sliderRef.current.slickNext();
    setCurrentSlide((prev) => ++prev);
    setNextReady(false);
  };
  const moveBackwards = () => {
    sliderRef.current.slickPrev();
    setCurrentSlide((prev) => --prev);
  };

  const handleAfterChange = (index: number) => setCurrentSlide(index);

  return (
    <div className="BuyTicketSlider">
      <StepsDots currentSlide={currentSlide} />
      <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange}>
        <TicketsAmount
          onSubmit={changeAmount}
          event={props.event}
          isCurrent={currentSlide === 0}
        />
        <SelectArea
          areas={availableAreas}
          isCurrent={currentSlide === 1}
          onSubmit={changeArea}
        />
        <SellersSlider
          isCurrent={currentSlide === 2}
          onSubmit={changeArea}
          tickets={tickets.filter((t) => selectedAreas.includes(t.area))}
          user={props.user}
          amount={amount}
          event={props.event}
        />
      </Slider>
      <NextPrevButtons
        allowNext={nextReady}
        onMoveForward={moveForward}
        onMoveBackwards={moveBackwards}
        isFirstStep={currentSlide === 0}
      />
    </div>
  );
}

export default BuyTicketSlider;
