import { IExperience } from "@/app/types/experience";

const EXPERIENCE: IExperience[] = [
  {
    company: "Quizizz Inc.",
    role: "Senior Software Development Engineer",
    startDate: "August 2021",
    endDate: "Current",
    current: true,
    achievements: [
      "I was the top on-call engineer in the company. I resolved tickets in the shortest time. I resolved the most tickets.",
      "Weekly active teachers increased by more than 10%. Registrations increased by 5%. Server-side rendering and performance work caused these increases.",
      "I built the question types, the lesson editor, and the gameplay. The platform still gets revenue from these features.",
      "I added canary deployments, application performance monitoring, real user monitoring, and analytics. The system became more stable."
    ],
    responsibilities: [
      {
        title: "Data analysis platform",
        description: "I built the Waygent analytics platform. It has a session explorer, standard A/B tests, and release-health checks.",
        metrics: [
          "Registration funnels increased by 2%.",
          "The game creation rate increased by 0.5%.",
          "A/B test release time decreased from 2 weeks to 1 week."
        ],
        technologies: ["Next.js", "React", "Golang", "BigQuery", "Kinesis", "Firehose"]
      },
      {
        title: "Analysis chat agent",
        description: "I built a chat agent that answers analysis questions in normal language. The questions include daily active users, A/B test results, click rates, and impressions.",
        metrics: [],
        technologies: ["Python", "Agno", "BigQuery", "ChromaDB"]
      },
      {
        title: "Analytics pipeline",
        description: "I built an analytics pipeline with the beacon API, Golang, and Kinesis. The pipeline accepts a high request rate.",
        metrics: [
          "The peak rate was 300k requests each minute.",
          "The service level was 99.99%."
        ],
        technologies: ["Golang", "Kinesis", "Firehose", "SQS", "BigQuery"]
      },
      {
        title: "Analytics client",
        description: "I built an analytics SDK for React, Next, Nuxt, and Vue. The SDK records sessions and referrers. It also adds events from the design system.",
        metrics: [
          "Data loss decreased by 15%.",
          "Automatic events made important funnels easier to track.",
          "All microfrontends adopted the SDK."
        ],
        technologies: ["TypeScript"]
      },
      {
        title: "Server-side rendering",
        description: "I added server-side rendering with Nuxt and a design system. Organic traffic increased after this work.",
        metrics: ["User registration from organic traffic increased by 15%."],
        technologies: ["Vue", "Nuxt", "Tailwind"]
      },
      {
        title: "Static page pipeline",
        description: "I built a pipeline for static pages. The pipeline serves HTML from S3. Static pages do not call the server.",
        metrics: [
          "Time to first byte improved by 12%.",
          "Largest contentful paint improved by 31%."
        ],
        technologies: ["Golang", "S3", "SQS", "Nuxt"]
      },
      {
        title: "Canary deployments",
        description: "I deployed the frontend and the backend with Jenkins and AWS CodeDeploy. Deployments became more reliable.",
        metrics: ["P0 incidents decreased by 83%."],
        technologies: ["CodeDeploy", "ECS", "Lambda"]
      },
      {
        title: "ECS auto-scaling",
        description: "I added an AWS capacity provider and ECS auto-scaling. This change decreased the AWS cost.",
        metrics: ["AWS cost decreased by 10%."],
        technologies: ["ECS"]
      },
      {
        title: "Website performance",
        description: "I decreased the page load time. I used code splitting, vendor chunks, and stable chunk hashes.",
        metrics: [
          "Page load time at p75 decreased by 63%.",
          "New user activation increased by 1%."
        ],
        technologies: ["Vue", "Vite"]
      },
      {
        title: "Design system",
        description: "I built a design system with Tailwind CSS. I added the design system to the product.",
        metrics: []
      },
      {
        title: "Build time",
        description: "I decreased the build time. I used a Docker image cache in ECR.",
        metrics: ["Build time decreased by 15%."],
        technologies: ["ECR", "Docker"]
      },
      {
        title: "Tool migration",
        description: "I moved the product to Turborepo, Vite, and Pinia. The move made builds faster for developers.",
        metrics: ["Build time decreased by 50%."],
        technologies: ["Turborepo", "Vite", "Docker", "Pinia", "Jenkins"]
      },
      {
        title: "Content editor",
        description: "I built rich-text features for the content editor.",
        metrics: []
      },
      {
        title: "Quiz and lesson editor",
        description: "I built a new quiz editor and a new lesson editor with Pub/Sub and Zod. The editors became faster and more reliable.",
        metrics: ["Bug reports decreased by 98%."]
      },
      {
        title: "AI features",
        description: "I added AI features. One feature generates slides. Lesson use increased after these features.",
        metrics: ["Lesson adoption increased by 2.3%."]
      },
      {
        title: "Data ingestion pipeline",
        description: "I built a data pipeline with Temporal. The pipeline ingests unique standards data.",
        metrics: ["The pipeline processed more than 500,000 rows."],
        technologies: ["Temporal"]
      },
      {
        title: "Google Drive import",
        description: "I added Google Drive import. The AI features use the imported media.",
        metrics: ["56% of platform content came from this integration."]
      },
      {
        title: "Subscription control",
        description: "I added access control on the client for subscriptions.",
        metrics: []
      },
      {
        title: "Search results",
        description: "I made search faster. I also changed the search interface. The search success rate increased.",
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
        description: "I built components from GraphQL metadata. These components decreased the time to production.",
        metrics: []
      },
      {
        title: "Analytics APIs",
        description: "I built analytics APIs with Cube.js, PostgreSQL, and Node.js.",
        metrics: []
      },
      {
        title: "Website performance",
        description: "I made the website faster. I used a cache, pagination, and fewer network calls.",
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
        description: "I operated AWS EC2, RDS, and S3. These services hosted the app, the database, and the files.",
        metrics: []
      },
      {
        title: "Offline use",
        description: "I added offline use with IndexedDB. I also added live patient diagnosis with AWS services.",
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
        description: "I built reusable components for the chat feature of a job portal.",
        metrics: []
      },
      {
        title: "Unit tests",
        description: "I added unit tests with Cypress.",
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
        description: "I built an analytics dashboard with React. The dashboard shows user API performance.",
        metrics: []
      },
      {
        title: "API connection",
        description: "I connected APIs that track performance.",
        metrics: []
      },
      {
        title: "Payments",
        description: "I added payments with Stripe.",
        metrics: []
      }
    ]
  }
];

export default EXPERIENCE;
