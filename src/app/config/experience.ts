import { IExperience } from "@/app/types/experience";

const EXPERIENCE: IExperience[] = [
  {
    company: "Quizizz Inc.",
    role: "Senior Software Development Engineer",
    summary: "I lead a team of 5 engineers. The team owns search on Postgres, the Product Analytics platform, and Waygent, and helped cut infrastructure cost.",
    startDate: "August 2021",
    endDate: "Current",
    current: true,
    achievements: [
      "I was the top on-call engineer at the company, with the most tickets resolved and the fastest resolution time.",
      "Weekly active teachers increased by more than 10%. Registrations increased by 5%. Both came from the server-side rendering and performance work.",
      "I built the question types, the lesson editor, and the gameplay, which still bring in revenue.",
      "I added canary deployments, application performance monitoring, real user monitoring, and analytics, which made the system more stable."
    ],
    responsibilities: [
      {
        title: "Search on Postgres",
        description: "I moved search from OpenSearch to Postgres full-text search with pagination, and used Kafka and Debezium CDC to keep it current.",
        metrics: ["This change saved $270k."],
        technologies: ["Postgres", "Kafka", "Debezium", "OpenSearch"]
      },
      {
        title: "Less data transfer",
        description: "I cut data transfer with zstd and gzip compression and role-based projections.",
        metrics: ["This change saved $100k."],
        technologies: ["zstd", "gzip"]
      },
      {
        title: "BigQuery streaming",
        description: "I switched to the BigQuery streaming API and tuned batch sizes and compression, which cut both pods and data transfer.",
        metrics: ["This change saved $120k."],
        technologies: ["BigQuery"]
      },
      {
        title: "Product Analytics platform",
        description: "I built the Product Analytics platform, with a session explorer, standard A/B tests, and release-health checks.",
        metrics: [
          "Registration funnels increased by 2%.",
          "The game creation rate increased by 0.5%.",
          "A/B test release time decreased from 2 weeks to 1 week."
        ],
        technologies: ["Next.js", "React", "Golang", "BigQuery", "Kinesis", "Firehose"]
      },
      {
        title: "Waygent",
        description: "I built Waygent, an analytics agent that lives in Slack. It knows the data warehouse, the L0 tables, and the key metrics, and pulls from BigQuery, Outreach, HubSpot, and Braze. Sales, GTM, and customer success teams ask it questions directly: it runs the analysis, shows how customers use the product, writes pre-call sales briefs, finds leads, and builds decks, docs, and dashboards.",
        metrics: [
          "Data analysts could focus on product work.",
          "Customer reach-out delays decreased by 60%.",
          "Deal velocity improved by 30%.",
          "Lead quality improved by 2x."
        ],
        technologies: ["Python", "Agno", "BigQuery", "ChromaDB", "Slack", "Outreach", "HubSpot", "Braze"]
      },
      {
        title: "Analytics pipeline",
        description: "I built the event pipeline on the beacon API, Golang, and Kinesis, sized for high request rates.",
        metrics: [
          "The peak rate was 300k requests each minute.",
          "The service level was 99.99%."
        ],
        technologies: ["Golang", "Kinesis", "Firehose", "SQS", "BigQuery"]
      },
      {
        title: "Analytics client",
        description: "I wrote an analytics SDK for React, Next, Nuxt, and Vue. It records sessions and referrers, and picks up events from the design system automatically.",
        metrics: [
          "Data loss decreased by 15%.",
          "Automatic events made important funnels easier to track.",
          "All microfrontends adopted the SDK."
        ],
        technologies: ["TypeScript"]
      },
      {
        title: "Server-side rendering",
        description: "I led a team of 2 engineers on the Nuxt SSR and SSG service. We moved pages to server-side rendering on a Tailwind design system I built, and organic traffic went up.",
        metrics: ["User registration from organic traffic increased by 15%."],
        technologies: ["Vue", "Nuxt", "Tailwind"]
      },
      {
        title: "Static page pipeline",
        description: "I built a pipeline that publishes static pages to S3, so they are served as HTML without calling the server.",
        metrics: [
          "Time to first byte improved by 12%.",
          "Largest contentful paint improved by 31%."
        ],
        technologies: ["Golang", "S3", "SQS", "Nuxt"]
      },
      {
        title: "Canary deployments",
        description: "I set up canary deploys for the frontend and backend with Jenkins and AWS CodeDeploy, so releases roll out gradually instead of all at once.",
        metrics: ["P0 incidents decreased by 83%."],
        technologies: ["CodeDeploy", "ECS", "Lambda"]
      },
      {
        title: "ECS auto-scaling",
        description: "I added an AWS capacity provider and ECS auto-scaling, which lowered the AWS bill.",
        metrics: ["AWS cost decreased by 10%."],
        technologies: ["ECS"]
      },
      {
        title: "Website performance",
        description: "I cut page load time with code splitting, vendor chunks, and stable chunk hashes.",
        metrics: [
          "Page load time at p75 decreased by 63%.",
          "New user activation increased by 1%."
        ],
        technologies: ["Vue", "Vite"]
      },
      {
        title: "Build time",
        description: "I cached Docker images in ECR to cut build time further.",
        metrics: ["Build time decreased by 15%."],
        technologies: ["ECR", "Docker"]
      },
      {
        title: "Tool migration",
        description: "I moved the product to Turborepo, Vite, and Pinia to speed up developer builds.",
        metrics: ["Build time decreased by 50%."],
        technologies: ["Turborepo", "Vite", "Docker", "Pinia", "Jenkins"]
      },
      {
        title: "Quiz and lesson editor",
        description: "I rebuilt the quiz and lesson editors on Pub/Sub and Zod, rich-text features included, and made them faster and more reliable.",
        metrics: ["Bug reports decreased by 98%."]
      },
      {
        title: "AI features",
        description: "I added AI features, like slide generation, which raised lesson use.",
        metrics: ["Lesson adoption increased by 2.3%."]
      },
      {
        title: "Data ingestion pipeline",
        description: "I built a Temporal pipeline to ingest standards data.",
        metrics: ["The pipeline processed more than 500,000 rows."],
        technologies: ["Temporal"]
      },
      {
        title: "Google Drive import",
        description: "I added Google Drive import, which feeds media into the AI features.",
        metrics: ["56% of platform content came from this integration."]
      },
      {
        title: "Search results",
        description: "I also made search faster and reworked the search interface, so more searches succeed.",
        metrics: [
          "Search response at p99 improved by 23%.",
          "The search success rate increased by 1.2%."
        ]
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
        title: "Progressive web app",
        description: "I built a progressive web app with React, TypeScript, GraphQL, and Redux.",
        metrics: []
      },
      {
        title: "Metadata components",
        description: "I built components that render from GraphQL metadata, which shortened the time to production.",
        metrics: []
      },
      {
        title: "Analytics APIs",
        description: "I built analytics APIs with Cube.js, PostgreSQL, and Node.js.",
        metrics: []
      },
      {
        title: "Website performance",
        description: "I sped up the site with caching, pagination, and fewer network calls.",
        metrics: [
          "Website performance increased by 60%.",
          "The Lighthouse score increased."
        ]
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
        title: "Progressive web app",
        description: "I built a progressive web app with React, Node, and MySQL.",
        metrics: []
      },
      {
        title: "Cloud infrastructure",
        description: "I ran the app, the database, and file storage on AWS EC2, RDS, and S3.",
        metrics: []
      },
      {
        title: "Offline support",
        description: "I added offline support with IndexedDB and live patient diagnosis on AWS.",
        metrics: ["The Lighthouse score increased by 40%."]
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
        title: "Chat components",
        description: "I built reusable chat components for a job portal.",
        metrics: []
      },
      {
        title: "Unit tests",
        description: "I wrote tests with Cypress.",
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
        title: "Analytics dashboard",
        description: "I built a React dashboard that shows users how their APIs perform.",
        metrics: []
      },
      {
        title: "API connection",
        description: "I wired up the APIs that track performance.",
        metrics: []
      },
      {
        title: "Payments",
        description: "I added Stripe payments.",
        metrics: []
      }
    ]
  }
];

export default EXPERIENCE;
