import Image, { alt as ogAlt, generateStaticParams as staticParams } from "./opengraph-image";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/app/lib/og";

export const alt = ogAlt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const generateStaticParams = staticParams;

export default Image;
