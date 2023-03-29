import { Category } from "./Category";

export interface Event {
  _id: string | undefined;
  id_category: Category;
  location: string;
  date: Date;
  event_name: string;
  description: string;
  time_create: Date | undefined;
}
