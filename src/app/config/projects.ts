import { IProject } from "@/app/types/projects";

const PROJECTS: IProject[] = [
  {
    title: "Barc",
    description: "Arc browser-style tab management extension for Chrome, reimagining how users organize and navigate their tabs.",
    features: [
      "Pinned URLs to a beautiful grid for instant access",
      "Powerful command palette for search at the speed of thought",
      "Custom themes with Dark, Light, and custom import support",
      "Smart tab management including renaming and duplicate detection",
      "Keyboard-first navigation with intuitive shortcuts",
      "Privacy-focused design with zero data collection",
    ],
    technologies: ["Chrome Extension API", "React", "Tailwind CSS", "TypeScript"],
    link: "https://chromewebstore.google.com/detail/barc/geaofdlkhololmpnbihingjkpfoiadoc",
    tweetLink: "https://x.com/we_chat_tech/status/1982462514127331494",
  }
];

export default PROJECTS;