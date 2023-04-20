import { SellerTicket } from "../Components/EventModal/BuyTicketSlider/SellersSlider";
import { Ticket } from "../models/Ticket";
import { User } from "../models/User";

const filterTickets = (tickets: Ticket[]) => {
  const groupedTickets = tickets.reduce<Record<string, SellerTicket>>(
    (groups, ticket) => {
      const { id_owner, seat, row, ...rest } = ticket;
      const ownerID = (id_owner as User)._id as string;
      if (!groups[ownerID]) {
        groups[ownerID] = {
          ...rest,
          id_owner,
          row: [],
          seat: [],
          ticketsArray: [],
        };
      }
      (groups[ownerID].seat as number[]).push(seat as number);
      (groups[ownerID].row as string[]).push(row as string);
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
  return combinedTickets;
};

export const filterSortTickets = (tickets: Ticket[], amount: number) => {
  const newTicketsArr = filterTickets(tickets);

  return newTicketsArr.sort((a, b) => {
    if (a.ticketsArray.length === amount && b.ticketsArray.length === amount)
      return 0;
    else if (a.ticketsArray.length === amount) return -1;
    else if (b.ticketsArray.length === amount) return 1;
    else return b.ticketsArray.length - a.ticketsArray.length;
  });
};

export default filterTickets;
