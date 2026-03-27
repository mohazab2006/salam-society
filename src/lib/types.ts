export type AudienceCategory = "brothers" | "sisters" | "everyone";
export type MediaType = "image" | "video";
export type UserRole = "admin" | "editor";

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  audience_category: AudienceCategory;
  age_group: string | null;
  date: string;
  start_time: string | null;
  end_time: string | null;
  location: string;
  signup_required: boolean;
  signup_link: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  audience_category: AudienceCategory;
  age_group: string | null;
  schedule: string;
  location: string;
  signup_required: boolean;
  signup_link: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  type: MediaType;
  title: string | null;
  caption: string | null;
  file_url: string;
  thumbnail_url: string | null;
  featured: boolean;
  section: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  category: "mosque" | "organization" | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Initiative {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  status: "active" | "completed" | "upcoming";
  date: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
