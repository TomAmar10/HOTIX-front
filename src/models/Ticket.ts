import { Event } from "./Event";
import { User } from "./User";

export interface Ticket {
  _id: string | undefined;
  id_event: string | Event;
  id_owner: string | User;
  area: Number;
  row: Number;
  seat: Number;
  price: Number;
  time_create: Date | undefined;
}
