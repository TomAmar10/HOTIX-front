import { Ticket } from "./Ticket";
import { User } from "./User";

export interface Deal {
  _id: string | undefined;
  id_ticket: string | Ticket;
  id_seller: string | User;
  id_buyer: string | User;
  deal_date: Date | undefined;
  status: string;
  reason: string;
}
