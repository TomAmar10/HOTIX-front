import { Event } from "./Event";
import { User } from "./User";

export interface Community {
  _id: string | undefined;
  name: string;
  description: string;
  time_create: Date | undefined;
  image?: string;
  members: User[] | string[];
  events: Event[] | string[];
  join_request: User[] | string[];
}
