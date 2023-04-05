import { Event } from "./Event";
import { User } from "./User";

export interface Ticket {
  _id: string | undefined;
  id_event: string | Event;
  id_owner: string | User;
  type: string;
  area: Number;
  row: Number;
  seat: Number;
  price: Number;
  image: File | any;
  time_create: Date | undefined;
}
