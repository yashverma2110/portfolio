import { POSITIONING } from "./profile";
import { getTotalYears } from "../utils/experienceUtils";

// Homepage title and description. The root layout uses them as defaults; the homepage sets its own
// canonical and og:url with them.
export const HOME_TITLE = POSITIONING.title;
export const HOME_DESCRIPTION = `I build products and the systems behind them. ${getTotalYears()} shipping features, shaping roadmaps, and owning the analytics, page speed, and infrastructure. Open to product, full-stack, backend, and frontend roles.`;
