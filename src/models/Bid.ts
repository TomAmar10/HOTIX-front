import { Ticket } from "./Ticket";
import { User } from "./User";

export interface Bid {
  _id?: string;
  tickets: Ticket[] | string[];
  id_bidder: string | User;
  id_owner: string | User;
  bid_date?: Date;
  amount:number,
  status: string;
}
