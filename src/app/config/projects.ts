import { IProject } from "@/app/types/projects";

const PROJECTS: IProject[] = [
  {
    title: "CodeSloth",
    description:
      "CodeSloth is a browser extension for reviewing large GitHub pull requests by hand. It is not an AI review bot. Take your time and actually read the code. It works in Chrome, Arc, Edge, and Brave. I use it at Wayground.",
    features: [
      "It orders a PR's files into review steps: schemas and types, core code, callers, tests, config, then lockfiles. Each file gets a reason.",
      "You mark each file as reviewed and move to the next one. n, p, j, and k work as shortcuts.",
      "Each file has a commit story. It flags changes made after review and late changes.",
      "Rule-based flags catch risky changes in SQL, migrations, config, the data layer, and API contracts. Each flag links to the exact diff line.",
      "A dependency graph shows how the changed files connect.",
      "A banner warns when new pushes make a review stale, and you can restart the review.",
      "It has no backend and no AI. It reads GitHub with a read-only token. It has 323 tests."
    ],
    technologies: ["TypeScript", "Chrome MV3", "esbuild", "Shadow DOM"],
    link: "https://www.youtube.com/watch?v=NoZFZuZq0Wk",
    privacyPolicy: "https://yashverma2110.github.io/codesloth-privacy/",
    media: {
      images: [
        { src: "/projects/codesloth/01-hero.png", alt: "CodeSloth: take your time and actually read the code", width: 440, height: 280 },
        { src: "/projects/codesloth/02-story.png", alt: "Every pull request is a story", width: 1280, height: 800 },
        { src: "/projects/codesloth/03-one-step.png", alt: "One step at a time", width: 1280, height: 800 },
        { src: "/projects/codesloth/04-commit-story.png", alt: "See how each file got here", width: 1280, height: 800 },
        { src: "/projects/codesloth/05-risky-changes.png", alt: "Catch what breaks after tests pass", width: 1280, height: 800 },
        { src: "/projects/codesloth/06-graph.png", alt: "See how it all connects", width: 1280, height: 800 },
      ],
      youtubeId: "NoZFZuZq0Wk",
    },
  },
  {
    title: "opencode-goalkit",
    description: "opencode-goalkit is an OpenCode plugin, published on npm. It adds /goal and /grill.",
    features: [
      "/goal runs a task only after you approve the plan.",
      "It saves a reusable skill, records handoffs, and checks the result in a separate pass.",
      "It stops when the task should be done once, not as a loop.",
      "/grill asks one question at a time and does not edit files."
    ],
    technologies: ["JavaScript", "OpenCode"],
    link: "https://github.com/yashverma2110/opencode-goalkit",
    github: "https://github.com/yashverma2110/opencode-goalkit",
    tweetLink: "https://x.com/we_chat_tech/status/2070486313195978879",
  },
  {
    title: "Barc",
    description: "Barc is a Chrome extension for tabs. The layout follows the Arc browser.",
    features: [
      "The extension pins URLs on a grid for fast access.",
      "A command palette searches the tabs.",
      "You can select a dark theme, a light theme, or an imported theme.",
      "You can rename a tab. The extension finds duplicate tabs.",
      "You can operate the extension from the keyboard.",
      "The extension does not collect user data."
    ],
    technologies: ["Chrome Extension API", "React", "Tailwind CSS", "TypeScript"],
    link: "https://chromewebstore.google.com/detail/barc/geaofdlkhololmpnbihingjkpfoiadoc",
    github: "https://github.com/yashverma2110/barc",
    tweetLink: "https://x.com/we_chat_tech/status/1982462514127331494",
  }
];

export default PROJECTS;
