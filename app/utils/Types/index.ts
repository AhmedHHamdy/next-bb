// src/types/api.ts

export interface Branch {
  id: number;
  name: string;
  location: string;
  phone: string;
  email: string;
  lat: string;
  lng: string;
}

export interface Footer {
  footer_cover_image: string;
  footer_logo_left_image: string;
  footer_logo_right_image: string;
  start_your_project_title: string;
  start_your_project_description: string;
  home_whatsapp_icon_status: boolean;
  services: {
    description: string;
    id: number;
    image_url: string;
    name: string
    slug: string;
    meta_description: string;
    meta_tags: string;
  }[]
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
  slug: string;
  meta_tags: string;
}

export interface ServiceType {
  id: number;
  name: string;
  description: string;
  image_url: string;      
  slug: string,
  meta_description: string
  meta_tags: string
}
export interface HomePage {
  app_hero_title: string;
  app_hero_desc: string;
  app_home_video: string;
  faqs: FAQItemType[];
  statistics: {
    first: {
      title: string;
      value: string;
    },
    second: {
      title: string;
      value: string;
    },
    third: {
      title: string;
      value: string;
    },
    forth: {
      title: string;
      value: string;
    }
  }
  our_products: {
    id: number;
    image_url: string;
  }[]
  business_building: {
    title: string;
    desc: string;
    features: {
      one: {
        title: string;
        desc: string;
        image: string;
      };
      two: {
        title: string;
        desc: string;
        image: string;
      };
      three: {
        title: string;
        desc: string;
        image: string;
      };
      four: {
        title: string;
        desc: string;
        image: string;
      };
    }
  }
  our_projects: {
    title: string;
    desc: string;
    projects: {
      id: number;
      title: string;
      short_description: string;
      owner_name: string;
      slug: string,
      meta_tags: string,
      country_name: string;
      image_url: string;
    }[]
  }
  our_articles: {
    title: string;
    desc: string;
    articles: ArticleType[]
  }
  our_services: {
    title: string;
    desc: string;
    services: ServiceType[]
  }
  about_us: {
    title: string;
    desc: string;
    features: {
      title: string;
      desc: string;
    }[]
  }
  our_clients: {
    title: string;
    desc: string;
    clients: {
      id: number;
      username: string;
      position: string;
      quote: string;
      image_url: string;
      file_type: string;
      file_url: string;
    }[]
  }
}

export interface HomePageData {
  data: HomePage;
  status: boolean;
  message: string;
  error: string;
}

export interface SectionCategory {
  id: number;
  name: string;
}

export interface BlogsPageData {
  heading_title: string;
  heading_desc: string;
  sections: SectionCategory[];
}

export interface BlogsPageDataApi {
  data: BlogsPageData;
  status: boolean;
  message: string;
  error: string;
}


export interface Pagination {
  total: number;
  last_page: number;
  perPage: number;
  currentPage: number;
}
export interface ArticleListResponse {
  data: {
    data: ArticleType[];
    pagination: Pagination;
  };
  status: boolean;
  message: string;
  error: string;
}


interface Expression {
  id: number;
  title: string;
  image_url: string;
}

interface Value {
  first: string;
  second: string;
  third: string;
}

interface WhyUs {
  description: string;
  title: string;
  image: string;
  differences: {
    id: number;
    title: string;
    description: string;
  }[];
}

interface StatisticItem {
  title: string;
  value: string;
}

export interface Statistics {
  first: StatisticItem;
  second: StatisticItem;
  third: StatisticItem;
  forth: StatisticItem;
}

interface WhoWeServe {
  description: string,
  title: string;
  image: string;
  clients: {
    id: number,
    name: string
  }[]
}

export interface Project {
  id: number;
  image_url: string;
}

export interface Review {
  id: number;
  username: string;
  position: string;
  quote: string;
  image_url: string;
  file_type: string;
  file_url: string;
}

interface Other {
  header_title: string;
  header_description: string;
  header_image: string;
  expressions_section: {
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    expressions: Expression[]
  };
  our_vision: string;
  our_mission: string;
  our_values: Value;
  our_mission_image: string;
  why_us: WhyUs;
  statistics: Statistics;
  who_we_serve: WhoWeServe;
  projects: Project[];
  our_clients: {
    title: string;
    description: string;
    reviews: Review[];
  };
}

interface PageData {
  title: string;
  content: string;
  slug: string;
  meta_description: string;
  meta_keywords: string;
  other: Other;
}

export interface AboutUsData {
  data: PageData;
  status: boolean;
  message: string;
  error: string;
}

export interface CountriesData {
  data: {
    id: number,
    name: string,
    country_code: string,
    phone_length: string,
    flag: string
  }[]
}

export interface ServiceTypeData {
  id: number;
  name: string;
  description: string;
  slug: string;
  main_title: string;
  main_desc: string;
  meta_description: string;
  meta_tags: string;
  image_url: string;
}

interface ProjectType {
  id: number;
  image_url: string;
}

interface StepType {
  title: string;
  desc: string;
}
export interface ServicesPageDataType {
  data: {
    header: {
      title: string;
      desc: string
      image: string
    },
    title: string;
    desc: string;
    faq: FAQItemType[] 
    services: ServiceTypeData[];
    projects: ProjectType[];
    steps: StepType[];
  };
  status: boolean;
  message: string;
  error: string;
}
export interface ServicesDetailsPageDataType {
  data: ServiceTypeData
  status: boolean;
  message: string;
  error: string;
}


export interface ProjectTypeData {
  id: number;
  title: string;
  short_description: string;
  description: string;
  slug: string;
  meta_tags: string;
  owner_name: string;
  country_name: string;
  image_url: string;
}
export interface ProjectsPageDataType {
  data: {
    title: string;
    desc: string;
    faqs: FAQItemType[]
    projects: ProjectTypeData[];
  };
  status: boolean;
  message: string;
  error: string;
}

export interface ProjectDetailsPageDataType {
  data: {
    project: ProjectTypeData;
    similar: ProjectTypeData[];
  };
  status: boolean;
  message: string;
  error: string;
}

export type ArticleWithTags = ArticleType & {
  tags: {
    id: number;
    name: string;
  }[];
};

export interface BlogDetailsPageDataType {
  data: {
    article: ArticleWithTags;
    similar: ArticleType[];
  };
  status: boolean;
  message: string;
  error: string;
}
export interface BlogsPageByTagsDataApi {
  data: ArticleType[];
  status: boolean;
  message: string;
  error: string;
}

export interface FAQPageDataType {
  data: FAQItemType[];
  status: boolean;
  message: string;
  error: string;
}

export interface ContactUsPageDataType {
  data: {
    title: string;
    slug: string;
    meta_description: string;
    meta_keywords: string;
    other: {
      header_title: string;
      header_description: string;
      header_image: string;
      communication: {
        first: {
          title: string
          desc: string
          value: string
        },
        second: {
          title: string
          desc: string
          value: string
        },
        third: {
          title: string
          desc: string
          value: string
        }
      },
      form: {
        title: string;
        desc: string;
      },
      branches: Branch[];
      locations: {
        lat: string;
        lng: string;
      }[];
      faqs: FAQItemType[]
    }
  };
  status: boolean;
  message: string;
  error: string;
}


export interface FormSettingsDataType {
  data: {
    countries: {
      id: number;
      name: string;
      country_code: string;
      starts_with: string;
      phone_length: string;
      flag: string;
    }[];
    services: {
      id: number;
      name: string;
      description: string;
      image_url: string;
    }[]
  },
  status: boolean;
  message: string;
  error: string

}

export interface FreeConsultationDataType {
  data: {
    title: string;
    desc: string
    durations: {
      id: number;
      name: string;
      from: string;
      to: string;
      formatted_name: string;
    }[]
  };
  status: boolean;
  message: string;
  error: string;
}

interface SectionContent {
  title: string;
  desc: string;
}

export interface Sections {
  one: SectionContent;
  two: SectionContent;
  three: SectionContent;
  four: SectionContent;
}
export interface Benefit {
  id: number;
  title: string;
  description: string;
  image_url: string;
}
export interface CareerPageDataType {
  data: {
    title: string;
    meta_description: string;
    meta_keywords: string;
    hero_title: string;
    hero_desc: string;
    sections: Sections;
    our_benefits: {
      title: string;
      desc: string;
      benefits: Benefit[];
    };
    faqs: FAQItemType[];
  };
  status: boolean;
  message: string;
  error: string;
}