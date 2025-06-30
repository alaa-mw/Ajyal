import { Image } from "./Image";
import { Subject } from "./Subject";

export interface Teacher {
  id: string;
  name: string;
  email: string;
  date_of_contract: string; 
  phone_number: string;
  bio: string;
  updated_at: string; 
  created_at: string; 
  image?: Image;
  subjects?: Subject[];
}

