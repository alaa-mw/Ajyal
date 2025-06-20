import { Image } from "./Image";

export interface Teacher {
  id: number;
  name: string;
  email: string;
  date_of_contract: string; 
  phone_number: string;
  bio: string;
  updated_at: string; 
  created_at: string; 
  image?: Image;
}