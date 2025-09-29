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
  footer_cover_image: {
    url: string;
    alt: string;
  },
  footer_logo_left_image: {
    url: string;
    alt: string;
  },
  footer_logo_right_image: {
    url: string;
    alt: string;
  },
  start_your_project_title: string;
  start_your_project_description: string;
  home_whatsapp_icon_status: boolean;
  services: {
    id: number;
    name: string
    slug: {
      ar: string;
      en: string;
    },
  }[]
  pages: {
    privacy: {
      title: string;
      slug: {
        ar: string;
        en: string;
      },
      mete_tags: string;
      meta_description: string;
    },
    terms: {
      title: string;
      slug: {
        ar: string;
        en: string;
      },
      mete_tags: string;
      meta_description: string;
    },
    policy: {
      title: string;
      slug: {
        ar: string;
        en: string;
      },
      mete_tags: string;
      meta_description: string;
    },
    accessibility: {
      title: string;
      slug: {
        ar: string;
        en: string;
      },
      mete_tags: string;
      meta_description: string;
    },
    "about-us": {
      title: string;
      slug: {
        ar: string;
        en: string;
      },
      mete_tags: string;
      meta_description: string;
    },
    "contact-us": {
      title: string;
      slug: {
        ar: string;
        en: string;
      },
      mete_tags: string;
      meta_description: string;
    },
    career: {
      title: string;
      slug: {
        ar: string;
        en: string;
      },
      mete_tags: string;
      meta_description: string;
    }
  },
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
  site_logo: {
    url: string;
    alt: string;
  },
  google_maps_api_key: string;
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
    slug: {
      ar: string;
      en: string;
    },
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
  image: {
    url: string;
    alt: string;
  },
  title: string;
  description: string;
  short_description: string;
  section_name: string;
  published_at: string;
  views: number;
  slug: {
    ar: string;
    en: string;
  },
  meta_tags: string;
}

export interface ServiceType {
  id: number;
  name: string;
  description: string;
  slug: {
    ar: string;
    en: string;
  };
  main_title: string;
  main_desc: string;
  home_main_title: string;
  home_main_desc: string;
  faqs: FAQItemType[];
  features_section: {
    hero_title: string;
    hero_desc: string;
    features: {
      id: number;
      name: string;
      desc: string;
      icon: {
        url: string;
        alt: string;
      }
    }[]
  }
  processes_section: {
    hero_title: string;
    hero_desc: string;
    hero_image: {
      url: string;
      alt: string;
    }
    processes: {
      id: number;
      name: string;
      desc: string;
    }[]
  };
  propositions_section: {
    hero_title: string;
    hero_desc: string;
    propositions: {
      id: number,
      image: {
          url: string;
          alt: string;
      },
      title: string;
      content: string;
    }[]
  }         
  meta_description: string;
  meta_tags: string;
  image: {
    url: string;
    alt: string;
  };
  icon: {
    url: string;
    alt: string;
  };
  video: {
    hero_title: string;
    hero_desc: string;
    url: string;
    thumbnail_url: string;
    alt: string;
  };
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
    image: {
      url: string;
      alt: string;
    }
  }[]
  business_building: {
    title: string;
    desc: string;
    features: {
      one: {
        title: string;
        desc: string;
        image: {
          url: string;
          alt: string;
        }
      };
      two: {
        title: string;
        desc: string;
        image: {
          url: string;
          alt: string;
        }
      };
      three: {
        title: string;
        desc: string;
        image: {
          url: string;
          alt: string;
        }
      };
      four: {
        title: string;
        desc: string;
        image: {
          url: string;
          alt: string;
        }
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
      slug: {
        ar: string;
        en: string;
      },
      meta_tags: string,
      country_name: string;
      image: {
        url: string;
        alt: string;
      },
      client_type: {
        key: string;
        value: string;
      };
      services: {
        id: number;
        name: string;
      }[];
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
      image: {
        url: string;
        alt: string;
      };
      file_type: string;
      file_url: string;
      thumbnail: {
        url: string;
        alt: string;
      }
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
  icon: {
    url: string;
    alt: string;
  }
}

export interface BlogsPageData {
  heading_title: string;
  heading_desc: string;
  sections: SectionCategory[];
  faqs: FAQItemType[]
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
  image: {
    url: string;
    alt:string;
  }
}

interface Value {
  first: string;
  second: string;
  third: string;
}

interface WhyUs {
  description: string;
  title: {
    part_one: string;
    part_two: string;
  }
  image: {
    url: string;
    alt: string;
  },
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
  image: {
    url: string;
    alt: string;
  },
  clients: {
    id: number,
    name: string
  }[]
}

export interface Project {
  id: number;
  image: {
    url: string;
    alt: string;
  }
}

export interface Review {
  id: number;
  username: string;
  position: string;
  quote: string;
  image: {
    url: string;
    alt: string;
  };
  file_type: string;
  file_url: string;
  thumbnail: {
    url: string;
    alt: string;
  }
}

interface Other {
  header_title: string;
  header_description: string;
  header_image: {
    url: string;
    alt: string;
  },
  expressions_section: {
    title: string;
    subtitle: string;
    desc: string;
    image: {
      url: string;
      alt: string;
    },
    expressions: Expression[]
  };
  our_vision: string;
  our_mission: string;
  our_values: Value;
  our_mission_image: {
    url: string;
    alt: string;
  },
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
  slug: {
    ar: string;
    en: string;
  },
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
  slug: {
    ar: string;
    en: string;
  };
  main_title: string;
  main_desc: string;
  home_main_title: string;
  home_main_desc: string;
  faqs: FAQItemType[];
  features_section: {
    hero_title: string;
    hero_desc: string;
    features: {
      id: number;
      name: string;
      desc: string;
      icon: {
        url: string;
        alt: string;
      }
    }[]
  }
  processes_section: {
    hero_title: string;
    hero_desc: string;
    hero_image: {
      url: string;
      alt: string;
    }
    processes: {
      id: number;
      name: string;
      desc: string;
    }[]
  };
  propositions_section: {
    hero_title: string;
    hero_desc: string;
    propositions: {
      id: number,
      image: {
          url: string;
          alt: string;
      },
      title: string;
      content: string;
    }[]
  }         
  meta_description: string;
  meta_tags: string;
  image: {
    url: string;
    alt: string;
  };
  icon: {
    url: string;
    alt: string;
  };
  video: {
    hero_title: string;
    hero_desc: string;
    url: string;
    thumbnail_url: string;
    alt: string;
  };
}

interface ProjectType {
  id: number;
  image: {
    url: string;
    alt: string;
  }
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
      image: {
        url: string;
        alt: string;
      }
    },
    title: string;
    desc: string;
    faqs: FAQItemType[] 
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


export interface  ProjectTypeData {
  id: number;
  title: string;
  name: string;
  short_description: string;
  description: string;
  slug: {
    ar: string;
    en: string;
  },
  meta_tags: string;
  owner_name: string;
  country_name: string;
  project_domain: string;

  project_problem: {
    image: {
      url: string;
      alt:  string;
    },
    content:  string;
  },

  project_solution: string;

  project_overview: {
    image: {
      url: string;
      alt:  string;
    },
    content:  string;
  }

  project_banner_alt: {
    url: string;
    alt: string;
  }
            
  project_results: string;

  project_outputs: string;

  client_type: {
    key: string;
    value: string;
  };

  icon: {
    url: string;
    alt: string;
  };

  image: {
    url: string;
    alt: string;
  };

  languages: {
    id: number;
    name: string;
    image: {
      url: string;
      alt: string;
    };
  }[]
 
  services: {
    id: number;
    name: string;
  }[]


  links: {
    id: number;
    name: string;
    link: string;
    image: {
      url: string;
      alt: string;
    }
  }[]
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
    faqs: FAQItemType[]
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
    slug: {
      ar: string;
      en: string;
    },
    meta_description: string;
    meta_keywords: string;
    other: {
      header_title: string;
      header_description: string;
      header_image: {
        url: string;
        alt: string;
      };
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
        left_title: string;
        left_desc: string;
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
    hero_title: string;
    hero_desc: string;
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
  image: {
    url: string;
    alt: string;
  }
}
export interface CareerPageDataType {
  data: {
    title: string;
    meta_description: string;
    slug: {
      ar: string;
      en: string;
    },
    meta_keywords: string;
    hero_title: string;
    hero_desc: string;
    hero_image: {
      url: string;
      alt: string;
    };
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

export interface RecordUserVisitData {
  data: null;
  status: boolean;
  message: string;
  error: string;
}