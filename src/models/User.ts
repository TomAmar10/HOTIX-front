export interface User {
  _id: string | undefined;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  time_create: Date | undefined;
  role: Number | undefined;
  token: string | undefined;
  image?: string;
  ratings: any[];
  total_rating: string;
}
