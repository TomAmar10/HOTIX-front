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

function SellersSlider(props: props): JSX.Element {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const sliderRef = useRef<any>(null);
  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // centerMode:true,
  };

  // useEffect(() => {
  //   if (props.tickets.length < 1) return;

  //   const groupedTickets = props.tickets.reduce<Record<string, Ticket>>(
  //     (groups, ticket) => {
  //       const { id_owner, seat, row, ...rest } = ticket;
  //       const ownerID = (id_owner as User)._id as string;
  //       if (!groups[ownerID]) {
  //         groups[ownerID] = { ...rest, id_owner, row: [], seat: [] };
  //       }
  //       (groups[ownerID].seat as number[]).push(seat as number);
  //       (groups[ownerID].row as string[]).push(row as string);
  //       return groups;
  //     },
  //     {}
  //   );

  //   const combinedTickets = Object.values(groupedTickets).map((group) => ({
  //     ...group,
  //     row: Array.from(new Set(group.row)).join(", "),
  //     seat: (group.seat as []).reduce(
  //       (acc: string, curr: string, index: number, arr: string[]) => {
  //         if (index === 0) acc = curr;
  //         else if (Number(curr) !== Number(arr[index - 1]) + 1) {
  //           acc += ` - ${arr[index - 1]}, ${curr}`;
  //         } else if (index === arr.length - 1) acc += ` - ${curr}`;
  //         return acc;
  //       },
  //       ""
  //     ),
  //   }));

  //   setTickets(combinedTickets);
  // }, [props.tickets]);

  // useEffect(() => {
  //   if (props.tickets.length < 1) return;

  //   // Group tickets by id_owner and sort them by seat numbers
  //   const ticketGroups = Object.values(
  //     props.tickets.reduce<Record<string, Ticket[]>>((groups, ticket) => {
  //       const { id_owner, seat, row, ...rest } = ticket;
  //       const ownerID = (id_owner as User)._id as string;
  //       if (!groups[ownerID]) {
  //         groups[ownerID] = [];
  //       }
  //       groups[ownerID].push({ ...rest, id_owner, seat, row });
  //       groups[ownerID].sort((a, b) => +a.seat - +b.seat);
  //       return groups;
  //     }, {})
  //   );

  //   const combinedTickets = ticketGroups.reduce<Ticket[]>((groups, group) => {
  //     let lastTicket = group[0];
  //     for (let i = 1; i < group.length; i++) {
  //       const currTicket = group[i];
  //       const seatDiff = +currTicket.seat - +lastTicket.seat;
  //       if (seatDiff === 1 && lastTicket.row === currTicket.row) {
  //         lastTicket.seat = `${lastTicket.seat}-${currTicket.seat}`;
  //       } else {
  //         groups.push(lastTicket);
  //         lastTicket = currTicket;
  //       }
  //     }
  //     groups.push(lastTicket);
  //     return groups;
  //   }, []);

  //   setTickets(combinedTickets);
  // }, [props.tickets]);

  // useEffect(() => {
  //   if (props.tickets.length < 1) return;

  //   const amount = props.amount;
  //   const groupedTickets = props.tickets.reduce<Record<string, Ticket>>(
  //     (groups, ticket) => {
  //       const { id_owner, seat, row, ...rest } = ticket;
  //       const ownerID = (id_owner as User)._id as string;
  //       if (!groups[ownerID]) {
  //         groups[ownerID] = { ...rest, id_owner, row: [], seat: [] };
  //       }
  //       (groups[ownerID].seat as number[]).push(seat as number);
  //       (groups[ownerID].row as string[]).push(row as string);
  //       return groups;
  //     },
  //     {}
  //   );

  //   const combinedTickets = Object.values(groupedTickets).flatMap((group) => {
  //     const seats = group.seat as number[];
  //     const seatRanges: string[] = [];

  //     for (let i = 0; i < seats.length; i++) {
  //       const start = seats[i];
  //       let end = start;

  //       for (let j = i + 1; j < seats.length; j++) {
  //         if (seats[j] === end + 1) {
  //           end = seats[j];
  //         } else {
  //           break;
  //         }
  //       }

  //       if (end - start + 1 >= amount) {
  //         const numGroups = Math.floor((end - start + 1) / amount);
  //         for (let k = 0; k < numGroups; k++) {
  //           seatRanges.push(
  //             `${start + k * amount}-${start + k * amount + amount - 1}`
  //           );
  //         }
  //         if ((end - start + 1) % amount !== 0) {
  //           seatRanges.push(`${start + numGroups * amount}-${end}`);
  //         }
  //         i += end - start;
  //       } else {
  //         seatRanges.push(`${start}`);
  //       }
  //     }

  //     return seatRanges.map((range) => ({
  //       ...group,
  //       seat: range,
  //       row: Array.from(new Set(group.row)).join(", "),
  //     }));
  //   });
    
  //   setTickets(combinedTickets);
  // }, [props.tickets]);

  useEffect(() => {
    if (props.tickets.length < 1) return;
    if (props.amount === 1) {
      setTickets(props.tickets);
      return;
    }
  
    const amount = props.amount;
    const groupedTickets = props.tickets.reduce<Record<string, Ticket>>(
      (groups, ticket) => {
        const { id_owner, seat, row, ...rest } = ticket;
        const ownerID = (id_owner as User)._id as string;
        if (!groups[ownerID]) {
          groups[ownerID] = { ...rest, id_owner, row: [], seat: [] };
        }
        (groups[ownerID].seat as number[]).push(seat as number);
        (groups[ownerID].row as string[]).push(row as string);
        return groups;
      },
      {}
    );
  
    const combinedTickets = Object.values(groupedTickets).flatMap((group) => {
      const seats = group.seat as number[];
      const seatRanges: string[] = [];
  
      for (let i = 0; i < seats.length; i++) {
        const start = seats[i];
        let end = start;
  
        for (let j = i + 1; j < seats.length; j++) {
          if (seats[j] === end + 1) {
            end = seats[j];
          } else {
            break;
          }
        }
  
        if (end - start + 1 >= amount) {
          const numGroups = Math.floor((end - start + 1) / amount);
          for (let k = 0; k < numGroups; k++) {
            seatRanges.push(
              `${start + k * amount}-${start + k * amount + amount - 1}`
            );
          }
          if ((end - start + 1) % amount !== 0) {
            seatRanges.push(`${start + numGroups * amount}-${end}`);
          }
          i += end - start;
        } else if (end - start + 1 === amount) {
          seatRanges.push(`${start}-${end}`);
          i += end - start;
        } else {
          seatRanges.push(`${start}`);
        }
      }
  
      const filteredRanges = seatRanges.filter(range => {
        const [start, end] = range.split('-').map(Number);
        return end - start + 1 === amount;
      });
  
      return filteredRanges.map((range) => ({
        ...group,
        seat: range,
        row: Array.from(new Set(group.row)).join(", "),
      }));
    });
    
    setTickets(combinedTickets);
  }, [props.tickets, props.amount]);
  
  
  // .filter((ticket) => {
  //   const seats = (ticket.seat as string).split("-");
  //   console.log(seats);
  //   return seats.length === amount;
  // });

  return (
    <div
      className="sellers-wrapper"
      style={{ opacity: props.isCurrent ? 1 : 0 }}
    >
      <div
        className="SellersSlider"
        style={{ opacity: props.isCurrent ? 1 : 0 }}
      >
        <h5 className="buy-ticket-section-header">
          Choose your seller and make an offer
        </h5>
        {tickets.length > 2 && (
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
          {tickets.map((t) => (
            <SingleSellerCard
              user={props.user}
              amount={props.amount}
              key={t._id}
              ticket={t}
              event={props.event}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SellersSlider;
