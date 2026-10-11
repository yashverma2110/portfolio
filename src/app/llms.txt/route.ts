import { LLMS_HEADERS, buildLlmsTxt } from "@/app/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), { headers: LLMS_HEADERS });
}
