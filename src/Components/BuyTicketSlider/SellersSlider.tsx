import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Ticket } from "../../models/Ticket";
import { User } from "../../models/User";
import SingleSellerCard from "./SingleSellerCard";
import { Event } from "../../models/Event";
import "./SellersSlider.scss";

interface props {
  onSubmit: Function;
  isCurrent: boolean;
  tickets: Ticket[];
  user: User | null;
  amount: number;
  event: Event | null;
}

export interface SellerTicket extends Ticket {
  amount: number;
  ticketsArray: Ticket[];
}

function SellersSlider(props: props): JSX.Element {
  const [tickets, setTickets] = useState<SellerTicket[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const sliderRef = useRef<any>(null);
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode:true,
  };

  useEffect(() => {
    if (props.tickets.length < 1) return;

    const groupedTickets = props.tickets.reduce<Record<string, SellerTicket>>(
      (groups, ticket) => {
        const { id_owner, seat, row, ...rest } = ticket;
        const ownerID = (id_owner as User)._id as string;
        if (!groups[ownerID]) {
          groups[ownerID] = {
            ...rest,
            id_owner,
            row: [],
            seat: [],
            amount: 0,
            ticketsArray: [],
          };
        }
        (groups[ownerID].seat as number[]).push(seat as number);
        (groups[ownerID].row as string[]).push(row as string);
        groups[ownerID].amount = (groups[ownerID].seat as number[]).length;
        groups[ownerID].ticketsArray.push(ticket);
        return groups;
      },
      {}
    );

    const combinedTickets = Object.values(groupedTickets)
      .map((group) => ({
        ...group,
        row: Array.from(new Set(group.row)).join(", "),
        seat: (group.seat as []).reduce(
          (acc: string, curr: string, index: number, arr: string[]) => {
            if (index === 0) acc = curr;
            else if (Number(curr) !== Number(arr[index - 1]) + 1) {
              acc += ` - ${arr[index - 1]}, ${curr}`;
            } else if (index === arr.length - 1) acc += ` - ${curr}`;
            return acc;
          },
          ""
        ),
      }))
      .sort((a, b) => {
        if (a.amount === props.amount && b.amount === props.amount) return 0;
        else if (a.amount === props.amount) return -1;
        else if (b.amount === props.amount) return 1;
        else return b.amount - a.amount;
      });
    setTickets(combinedTickets);
  }, [props.tickets]);

  return (
    <div
      className="sellers-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      {active !== null && (
        <div className="active-seller-container">
          <div
            className="sellers-modal-bg"
            onClick={() => setActive(null)}
          ></div>
          <div className="active-seller-holder">
            <SingleSellerCard
              activeSeller
              user={props.user}
              amount={props.amount}
              key={tickets[active]._id}
              ticket={tickets[active]}
              event={props.event}
              onGoBack={() => setActive(null)}
            />
          </div>
        </div>
      )}
      <div className="SellersSlider">
        <h5 className="buy-ticket-section-header">
          Choose your seller and make an offer
        </h5>
        {tickets.length > 6 && (
          <div className="slider-arrows-container">
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="arrow-right-btn"
            >
              <i className="fa-solid fa-circle-chevron-right"></i>
            </button>
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="arrow-left-btn"
            >
              <i className="fa-solid fa-circle-chevron-left"></i>
            </button>
          </div>
        )}
        <Slider {...settings} ref={sliderRef}>
          {tickets.map((t, index) => {
            if (index % 6 === 0) {
              const sellers = [];
              for (
                let i = index;
                i < Math.min(index + 6, tickets.length);
                i++
              ) {
                sellers.push(
                  <SingleSellerCard
                    isActive={active === i}
                    onClick={() => setActive(i)}
                    user={props.user}
                    amount={props.amount}
                    key={tickets[i]._id}
                    ticket={tickets[i]}
                    event={props.event}
                  />
                );
              }
              return (
                <div key={index} className="six-sellers-holder">
                  {sellers}
                </div>
              );
            } else return null;
          })}
        </Slider>
      </div>
    </div>
  );
}

export default SellersSlider;
