// src/types/api.ts

export interface Branch {
  id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
}

export interface Footer {
  footer_cover_image: string;
  footer_logo_left_image: string;
  footer_logo_right_image: string;
  start_your_project_title: string;
  start_your_project_description: string;
  branches: Branch[];
  copyright: string;
}

export interface Social {
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  youtube: string;
  snapchat: string;
  whatsapp: string;
  messenger: string;
  telegram: string;
  tiktok: string;
}

export interface AppSettings {
  site_logo: string;
  email: string;
  phone: string;
  social: Social;
  footer: Footer;
}

export interface ApiResponse {
  data: AppSettings;
  status: boolean;
  message: string;
  error: string;
}

export interface PolicyPages {
  data: {
    title: string;
    content: string;
    slug: string;
    meta_description: string;
    meta_keywords: string;
  }
}


// types/api.ts
export interface FAQItemType {
  id: number;
  question: string;
  answer: string;
}

export interface ArticleType {
  id: number;
  image_url: string;
  title: string;
  description: string;
  short_description: string;
  section_name: string;
  published_at: string;
  views: number;
}

export interface HomePage {
  app_hero_title: string;
  app_hero_desc: string;
  faqs: FAQItemType[];
  articles: ArticleType[]
}

export interface HomePageData {
  data: HomePage;
  status: boolean;
  message: string;
  error: string;
}