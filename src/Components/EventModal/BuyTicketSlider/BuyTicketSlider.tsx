import { useEffect, useRef, useState } from "react";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import StepsDots from "../StepsDots/StepsDots";
import Slider from "react-slick";
import ticketService from "../../../services/ticketService";
import { Ticket } from "../../../models/Ticket";
import TicketsAmount from "../SellTicketSlider/TicketsAmount";
import SelectArea from "./SelectArea";
import SellersSlider, { SellerTicket } from "./SellersSlider";
import NextPrevButtons from "../NextPrevButtons/NextPrevButtons";
import SellerTickets from "./PlaceBid";
import bidService from "../../../services/bidService";
import SaleCompleted from "../SellTicketSlider/SaleCompleted";
import "./BuyTicketSlider.scss";
import { useDispatch } from "react-redux";
import { userBidsActions } from "../../../store/userBidsSlice";

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
  const [currentSeller, setCurrentSeller] = useState<SellerTicket | null>(null);
  const [ticketsToOffer, setTicketsToOffer] = useState<Ticket[]>([]);
  const [buyerBid, setBuyerBid] = useState(0);
  const dispatch = useDispatch();
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
  };

  useEffect(() => {
    props.event?._id &&
      ticketService
        .getTicketsForSaleByEvent(props.event?._id)
        .then((res: Ticket[]) => {
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

  const changeSeller = (seller: SellerTicket) => {
    setCurrentSeller(seller);
    setNextReady(true);
  };

  const changeBid = (bid: number, tickets: Ticket[]) => {
    setTicketsToOffer(tickets);
    setBuyerBid(bid);
    setNextReady(bid * tickets.length > 0);
  };

  const moveForward = () => {
    if (currentSlide === 3)
      bidService
        .addBid(ticketsToOffer, props.user?._id as string, buyerBid)
        .then((res) => dispatch(userBidsActions.addNewBid(res.data)));
    sliderRef.current.slickNext();
    setCurrentSlide((prev) => ++prev);
    if (currentSlide === 0) setNextReady(selectedAreas.length > 0);
    else setNextReady(false);
  };
  const moveBackwards = () => {
    currentSlide <= 3 && setCurrentSeller(null);
    sliderRef.current.slickPrev();
    setCurrentSlide((prev) => --prev);
    setNextReady(true);
  };

  const handleAfterChange = (index: number) => setCurrentSlide(index);

  return (
    <div className="BuyTicketSlider">
      <StepsDots currentSlide={currentSlide} slides={4} />
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
          onSubmit={changeSeller}
          tickets={tickets.filter((t) => selectedAreas.includes(t.area))}
          amount={amount}
          currentSeller={currentSeller}
        />
        <SellerTickets
          isCurrent={currentSlide === 3}
          onSubmit={changeBid}
          user={props.user}
          event={props.event}
          currentSeller={currentSeller}
        />
        <SaleCompleted isCurrent={currentSlide === 4} buyerMode />
      </Slider>
      {currentSlide !== 4 && (
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

export default BuyTicketSlider;
