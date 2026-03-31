export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
}

export interface User {
  id: number;
  username: string;
  role: string;
}
