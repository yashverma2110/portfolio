import { IProject } from "@/app/types/projects";

const PROJECTS: IProject[] = [
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
