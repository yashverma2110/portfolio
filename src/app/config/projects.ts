import { IProject } from "@/app/types/projects";

const PROJECTS: IProject[] = [
  {
    title: "Amaizely",
    description: "A smart way for spaced repetition based learning with AI generation of flashcards",
    features: [
      "AI-generation of flashcard decks using website links",
      "AI-generation of flashcard decks using YouTube",
      "Use PDFs to generate flashcard decks using AI",
      "AI-generation of flashcard decks using custom text",
      "Custom flashcard creation with rich text formatting tools",
      "Revision of specific decks",
      "Smart revision recommendations for spaced repetition",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Express", "MongoDB"],
    link: "https://amaizely.com",
  }
];

export default PROJECTS;