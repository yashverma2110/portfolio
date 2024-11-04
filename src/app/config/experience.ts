import { IExperience } from "@/app/types/experience";

const EXPERIENCE: IExperience[] = [
  {
    company: "Quizizz Inc.",
    role: "Software Development Engineer - L5",
    duration: "August 2021 – Current",
    responsibilities: [
      {
        title: "Implemented SSR and design system",
        description: "Implemented Server-Side Rendering (SSR) using NUXT and a design system that enhanced organic traffic.",
        metrics: ["15% increase in user registration from organic traffic"]
      },
      {
        title: "Infra as Code for Canary Deployments",
        description: "Deployed frontend and backend infrastructure with Jenkins and AWS CodeDeploy, enhancing deployment reliability.",
        metrics: ["Reduced P0 incidents by 83%"]
      },
      {
        title: "Optimized ECS Auto-scaling",
        description: "Implemented AWS capacity provider and ECS application auto-scaling, reducing costs.",
        metrics: ["10% AWS cost reduction"]
      },
      {
        title: "Website Performance Improvement",
        description: "Enhanced website performance through code splitting, vendor chunking, and consistent chunk hashing.",
        metrics: ["63% reduction in p75 page load time", "Improved new user activation by 1%"]
      },
      {
        title: "In-house Design System",
        description: "Built and integrated a reusable design system using Tailwind CSS.",
        metrics: []
      },
      {
        title: "Frontend Analytics Pipeline",
        description: "Developed a new analytics pipeline using beacon API, Golang, and Kinesis for high RPM ingestion.",
        metrics: ["Handled peak RPM of 100k with 99% SLA"]
      },
      {
        title: "Build Time Optimization",
        description: "Reduced build times by implementing ECR-based Docker image caching.",
        metrics: ["15% reduction in build time"]
      },
      {
        title: "Migration to Modern Tools",
        description: "Led migration to Turborepo, Vite, and Pinia, improving developer experience.",
        metrics: ["50% reduction in build time"]
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
    duration: "Jan 2021 – August 2021",
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
    duration: "August 2020 – Jan 2021",
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
    duration: "August 2020 – October 2020",
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
    duration: "April 2020 – May 2020",
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
