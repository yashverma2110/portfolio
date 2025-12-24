import { IExperience } from "@/app/types/experience";

const EXPERIENCE: IExperience[] = [
  {
    company: "Quizizz Inc.",
    role: "Senior Software Development Engineer",
    startDate: "August 2021",
    endDate: "Current",
    current: true,
    achievements: [
      "Top on-call engineer company-wide with fastest resolution times and most number of tickets resolved",
      "Drove 10%+ improvement in weekly active teachers and 5% in registrations via SSR and performance initiatives",
      "Built core revenue features (question types, lesson editor, gameplay) still driving platform growth",
      "Enhanced system resilience with canary deployments, APM, RUM, and analytics instrumentation"
    ],
    responsibilities: [
      {
        title: "Data Analysis Platform (Waygent)",
        description: "Built in-house analytics platform with Mixpanel-like session explorer, standardized A/B testing via feature flags with statistical analysis (p-value, t-test) and rollout health monitoring.",
        metrics: ["2% improvement in registration funnels", "0.5% increase in game creation rate", "Reduced A/B test release delays from 2 weeks to 1 week"],
        technologies: ["Next.js", "React", "Golang", "BigQuery", "Kinesis", "Firehose"]
      },
      {
        title: "Data Analysis AI Agent (Waygent)",
        description: "Built RAG-powered chat agent to answer analysis queries like DAU, A/B test results, CTRs, and impressions using natural language.",
        metrics: [],
        technologies: ["Python", "Agno", "BigQuery", "ChromaDB"]
      },
      {
        title: "Frontend Analytics Pipeline",
        description: "Developed a new analytics pipeline using beacon API, Golang, and Kinesis for high RPM ingestion.",
        metrics: ["Handled peak RPM of 300k with 99.99% SLA"],
        technologies: ["Golang", "Kinesis", "Firehose", "SQS", "BigQuery"]
      },
      {
        title: "Frontend Analytics Client",
        description: "Built framework-agnostic analytics SDK with auto-instrumentation via design system, high-quality session tracking, and referrer capture.",
        metrics: ["15% reduction in data loss", "Improved key funnel tracking for product initiatives by event auto capture", "Adopted across all microfrontends (React, Next, Nuxt, Vue)"],
        technologies: ["TypeScript"]
      },
      {
        title: "Implemented SSR and design system",
        description: "Implemented Server-Side Rendering (SSR) using NUXT and a design system that enhanced organic traffic.",
        metrics: ["15% increase in user registration from organic traffic"],
        technologies: ["Vue", "Nuxt", "Tailwind"]
      },
      {
        title: "SSG Pipeline for Static Pages",
        description: "Built a static site generation pipeline serving pre-rendered HTML from S3, eliminating server hits for static content.",
        metrics: ["12% improvement in TTFB", "31% improvement in LCP"],
        technologies: ["Golang", "S3", "SQS", "Nuxt"]
      },
      {
        title: "Infra as Code for Canary Deployments",
        description: "Deployed frontend and backend infrastructure with Jenkins and AWS CodeDeploy, enhancing deployment reliability.",
        metrics: ["Reduced P0 incidents by 83%"],
        technologies: ["CodeDeploy", "ECS", "Lambda"]
      },
      {
        title: "Optimized ECS Auto-scaling",
        description: "Implemented AWS capacity provider and ECS application auto-scaling, reducing costs.",
        metrics: ["10% AWS cost reduction"],
        technologies: ["ECS"]
      },
      {
        title: "Website Performance Improvement",
        description: "Enhanced website performance through code splitting, vendor chunking, and consistent chunk hashing.",
        metrics: ["63% reduction in p75 page load time", "Improved new user activation by 1%"],
        technologies: ["Vue", "Vite"]
      },
      {
        title: "In-house Design System",
        description: "Built and integrated a reusable design system using Tailwind CSS.",
        metrics: []
      },
      {
        title: "Build Time Optimization",
        description: "Reduced build times by implementing ECR-based Docker image caching.",
        metrics: ["15% reduction in build time"],
        technologies: ["ECR", "Docker"]
      },
      {
        title: "Migration to Modern Tools",
        description: "Led migration to Turborepo, Vite, and Pinia, improving developer experience.",
        metrics: ["50% reduction in build time"],
        technologies: ["Turborepo", "Vite", "Docker", "Pinia", "Jenkins"]
      },
      {
        title: "Content Creation Features",
        description: "Developed multiple rich text editor features for content creation.",
        metrics: []
      },
      {
        title: "Re-architected Quiz and Lesson Editor",
        description: "Redesigned editor for efficiency and reliability using Pub/Sub and Zod.",
        metrics: ["98% reduction in bug reports"]
      },
      {
        title: "Introduced AI-powered Features",
        description: "Implemented AI features like slide generation to increase engagement.",
        metrics: ["2.3% increase in lesson user adoption"]
      },
      {
        title: "Data Ingestion Pipeline",
        description: "Built a pipeline to handle 500,000+ rows of unique standards data with Temporal.",
        metrics: []
      },
      {
        title: "Google Drive Integration",
        description: "Integrated Google Drive for importing various media for AI features.",
        metrics: ["56% of all platform content created via integration"]
      },
      {
        title: "Subscription Management",
        description: "Implemented client-side access control for better subscription handling.",
        metrics: []
      },
      {
        title: "Revamped Search Results",
        description: "Improved search performance and user interface, enhancing search success rates.",
        metrics: ["23% improvement in p99 search response", "1.2% increase in search success rate"]
      }
    ]
  },
  {
    company: "Conwo Solution Pvt. Ltd.",
    role: "Software Development Engineering Intern",
    startDate: "Jan 2021",
    endDate: "August 2021",
    responsibilities: [
      {
        title: "PWA Development",
        description: "Developed a PWA using React, TypeScript, GraphQL, and Redux.",
        metrics: []
      },
      {
        title: "Metadata-driven Components",
        description: "Created components for data management using GraphQL, reducing time to production.",
        metrics: []
      },
      {
        title: "Data Aggregation APIs",
        description: "Implemented analytics APIs with Cube.js, PostgreSQL, and Node.js.",
        metrics: []
      },
      {
        title: "Website Performance Optimization",
        description: "Improved website performance through caching, pagination, and reduced network calls.",
        metrics: ["60% improvement in website performance", "Improved Lighthouse score"]
      }
    ]
  },
  {
    company: "Advenio Tecnosys Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    startDate: "August 2020",
    endDate: "Jan 2021",
    responsibilities: [
      {
        title: "PWA Development",
        description: "Developed a PWA with React, Node, and MySQL.",
        metrics: []
      },
      {
        title: "Managed Cloud Infrastructure",
        description: "Handled AWS EC2, RDS, and S3 for hosting, database, and storage management.",
        metrics: []
      },
      {
        title: "Offline Usage Implementation",
        description: "Enabled offline functionality using IndexedDB and live patient diagnosis with AWS services.",
        metrics: ["40% increase in website performance based on Lighthouse scores"]
      }
    ]
  },
  {
    company: "Mckinley and Rice",
    role: "React Developer Intern",
    startDate: "August 2020",
    endDate: "October 2020",
    responsibilities: [
      {
        title: "Re-usable Components",
        description: "Developed reusable components for a job portal chat feature.",
        metrics: []
      },
      {
        title: "Unit Testing",
        description: "Introduced unit testing using Cypress.",
        metrics: []
      }
    ]
  },
  {
    company: "DrawPI Inc.",
    role: "Web Developer Intern",
    startDate: "April 2020",
    endDate: "May 2020",
    responsibilities: [
      {
        title: "Analytics Dashboard Development",
        description: "Built an analytics dashboard for user API performance using React.",
        metrics: []
      },
      {
        title: "API Integration",
        description: "Integrated APIs for performance tracking.",
        metrics: []
      },
      {
        title: "Payment Integration",
        description: "Integrated payments using Stripe.",
        metrics: []
      }
    ]
  }
];

export default EXPERIENCE;
