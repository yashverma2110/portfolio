import { LLMS_HEADERS, buildLlmsFullTxt } from "@/app/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(), { headers: LLMS_HEADERS });
}
