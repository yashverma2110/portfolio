import { POSITIONING } from "./profile";
import { getTotalYears } from "../utils/experienceUtils";

// Homepage title and description. The root layout uses them as defaults; the homepage sets its own
// canonical and og:url with them.
export const HOME_TITLE = POSITIONING.title;
export const HOME_DESCRIPTION = `I build backend systems and LLM agents that run in production. ${getTotalYears()} of data pipelines, search, and AI agents. Open to senior backend and AI roles at Series A startups.`;
