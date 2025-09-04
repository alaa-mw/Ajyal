import { Image } from "./Image";

export interface Author {
  id: string;
  name: string;
}

export interface Issue {
  id: string;
  community_id: number;
  author_type: string;
  author_id: number;
  body: string;
  is_fqa: boolean;
  created_at: string;
  updated_at: string;
  image: Image | null;
  author: Author;
  replies:Reply[];
}

export interface Reply {
  id: string;
  issue_id: number;
  author_type: string;
  author_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  image: Image | null;
  author: Author;
}
