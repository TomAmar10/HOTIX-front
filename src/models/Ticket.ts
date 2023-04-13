import { Event } from "./Event";
import { User } from "./User";

export interface Ticket {
  _id: string | undefined;
  id_event: string | Event;
  id_owner: string | User;
  type: string;
  area: string;
  row: string | string[];
  seat: Number | Number[] | string;
  price: Number;
  currency: string;
  image: File | any;
  time_create: Date | undefined;
}
