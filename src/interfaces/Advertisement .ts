import { Image } from "./Image";

export interface Advertisement {
  id: number;
  title: string;
  body: string;
  advertisable_id: number | null;
  advertisable_type: string | null;
  created_at: string;
  updated_at: string;
  images: Image[];
}