import { Image } from "./Image";

export interface Advertisement {
  id: string;
  title: string;
  body: string;
  advertisable_id: string | null;
  advertisable_type: string | null;
  created_at?: string;
  updated_at?: string;
  images: Image[];
}