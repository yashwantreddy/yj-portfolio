export interface NavItem {
  label: string
  page: string
}

export interface HeroContent {
  name: string
  role: string
  location: string
  statement: string
  summary: string
  portrait: {
    src: string
    alt: string
  }
  primaryCta: {
    label: string
    page: string
  }
  secondaryCta: {
    label: string
    page: string
  }
}

export interface CredibilityItem {
  label: string
  value: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface AboutContent {
  heading: string
  title: string
  paragraphs: string[]
  skills: SkillGroup[]
  visual: {
    src: string
    alt: string
  }
}

export interface TimelineEntry {
  title: string
  period: string
  detail: string
  highlights: string[]
}

export interface MetricItem {
  value: string
  label: string
  detail: string
}

export interface PortfolioProject {
  name: string
  description: string
  image: string
  github: string
  link: string
  tags: string[]
  outcome: string
}

export interface SocialLink {
  label: string
  href: string
  icon: "linkedin" | "github" | "email"
}

export interface PortfolioContent {
  navItems: NavItem[]
  hero: HeroContent
  credibility: CredibilityItem[]
  about: AboutContent
  experience: {
    heading: string
    intro: string
    entries: TimelineEntry[]
  }
  metrics: {
    heading: string
    intro: string
    items: MetricItem[]
  }
  projects: {
    heading: string
    intro: string
    items: PortfolioProject[]
  }
  contact: {
    heading: string
    intro: string
    availability: string
    email?: string
    socialLinks: SocialLink[]
  }
  footer: {
    owner: string
  }
}

export const portfolioContent: PortfolioContent = {
  navItems: [
    { label: "Home", page: "home" },
    { label: "About", page: "about" },
    { label: "Experience", page: "experience" },
    { label: "Projects", page: "projects" },
    { label: "Contact", page: "contact" },
  ],
  hero: {
    name: "Yashwant Jankay",
    role: "Senior Data Scientist + AI/ML Engineer",
    location: "Columbus, OH",
    statement: "Building intelligent systems that solve real-world problems.",
    summary:
      "I design, ship, and scale practical AI products that improve outcomes for users and teams.",
    portrait: {
      src: "/headshot.jpg",
      alt: "Portrait of Yashwant Jankay",
    },
    primaryCta: {
      label: "Connect for Opportunities",
      page: "contact",
    },
    secondaryCta: {
      label: "Explore Projects",
      page: "projects",
    },
  },
  credibility: [
    {
      label: "Current Focus",
      value: "AI/ML systems for measurable product impact",
    },
    {
      label: "Graduate Degree",
      value: "M.S. in Data Science (NLP specialization)",
    },
    {
      label: "Location",
      value: "Columbus, Ohio",
    },
    {
      label: "Status",
      value: "Open to new senior opportunities",
    },
  ],
  about: {
    heading: "About",
    title: "Curious by default. Outcome-driven by practice.",
    paragraphs: [
      "I am a highly ambitious, self-motivated, and constantly learning Senior Data Scientist + AI/ML Engineer based in Columbus, Ohio.",
      "I earned my Master's degree in Data Science from the University of Denver, with a specialization in Natural Language Processing (NLP). I enjoy taking new concepts from exploration to practical application.",
      "Outside of work, I stay energized by reading, sports, travel, and creating funny AI-generated videos for my niece. That curiosity keeps me building, learning, and improving.",
      "I believe you should never stop learning. I am always interested in technology that pushes practical boundaries and creates real value for people.",
    ],
    skills: [
      {
        category: "AI + ML",
        items: ["PyTorch", "TensorFlow", "LLMs", "LangChain", "LangGraph"],
      },
      {
        category: "Data + Cloud",
        items: ["Python", "AWS", "Docker", "Terraform"],
      },
      {
        category: "Delivery",
        items: ["MLOps", "CI/CD", "GitHub"],
      },
    ],
    visual: {
      src: "/hero-image.webp",
      alt: "Abstract AI inspired illustration",
    },
  },
  experience: {
    heading: "Experience",
    intro:
      "A concise view of my current role, graduate foundation, and the way I approach AI product work.",
    entries: [
      {
        title: "Senior Data Scientist + AI/ML Engineer",
        period: "Current",
        detail:
          "Lead the design and development of intelligent systems that solve practical business and user problems.",
        highlights: [
          "Bridge experimentation and production delivery",
          "Prioritize measurable outcomes over novelty",
          "Collaborate across technical and product teams",
        ],
      },
      {
        title: "M.S. in Data Science (NLP)",
        period: "University of Denver",
        detail:
          "Built a rigorous foundation in machine learning, data science workflows, and natural language processing methods.",
        highlights: [
          "Specialization in NLP",
          "Applied research-to-practice mindset",
          "Strong statistical and modeling fundamentals",
        ],
      },
      {
        title: "Continuous Builder Mindset",
        period: "Ongoing",
        detail:
          "Consistently explore new tooling and methods, then translate what works into practical implementation patterns.",
        highlights: [
          "Rapid learning loops",
          "Hands-on prototyping",
          "Focus on user-relevant outcomes",
        ],
      },
    ],
  },
  metrics: {
    heading: "Impact Snapshot",
    intro: "Quick signal for recruiters scanning for experience depth and delivery capability.",
    items: [
      {
        value: "3",
        label: "Featured Projects",
        detail: "Image generation, exploratory analytics, and healthcare network ML use cases.",
      },
      {
        value: "12",
        label: "Core Skills",
        detail: "Spanning modeling, LLM frameworks, cloud infrastructure, and delivery tooling.",
      },
      {
        value: "M.S.",
        label: "Data Science (NLP)",
        detail: "Graduate specialization informing practical language and ML system design.",
      },
    ],
  },
  projects: {
    heading: "Projects",
    intro:
      "Selected work that reflects experimentation, applied machine learning, and end-to-end execution.",
    items: [
      {
        name: "PokeGan",
        description: "A creative GAN project that generates Pokemon-style sprite imagery.",
        image: "/pokegan.jpg",
        github: "https://github.com/yashwantreddy/PokeGan",
        link: "https://github.com/yashwantreddy/PokeGan",
        tags: ["Deep Learning", "GAN", "Computer Vision"],
        outcome: "Explored image synthesis workflows from training to qualitative output evaluation.",
      },
      {
        name: "Telco-EDA",
        description:
          "Exploratory data analysis on a telecommunications dataset to uncover retention and behavior patterns.",
        image: "/telco.png",
        github: "https://github.com/yashwantreddy/Telco-EDA",
        link: "https://github.com/yashwantreddy/Telco-EDA",
        tags: ["Data Analysis", "Visualization", "Feature Discovery"],
        outcome: "Converted raw data into actionable patterns with a clear analytical narrative.",
      },
      {
        name: "Doctor Specialty Classification and Network Analysis",
        description:
          "Machine learning workflow to classify physician specialties and analyze network connectivity patterns.",
        image: "/doc.png",
        github:
          "https://github.com/yashwantreddy/Doctor-Specialty-Classification-and-Network-Analysis",
        link: "https://github.com/yashwantreddy/Doctor-Specialty-Classification-and-Network-Analysis",
        tags: ["Classification", "Network Analysis", "Healthcare Data"],
        outcome: "Combined predictive modeling and graph analysis to surface structural system insights.",
      },
    ],
  },
  contact: {
    heading: "Contact",
    intro:
      "If you are hiring for senior data science or AI engineering roles, I would be glad to connect.",
    availability:
      "Open to discussing full-time opportunities and impactful collaborations in AI/ML product development.",
    socialLinks: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/yashwantjankay/",
        icon: "linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/yashwantreddy",
        icon: "github",
      },
    ],
  },
  footer: {
    owner: "Yashwant Jankay",
  },
}
