import { Ticket } from "./Ticket";
import { User } from "./User";

export interface Bid {
  _id?: string;
  id_ticket: string | Ticket;
  id_bidder: string | User;
  bid_date?: Date;
  amount:number,
  status: string;
}
