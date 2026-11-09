import { NextResponse } from "next/server";
import { getLinkByShortCode } from "@/data/links";

type ShortLinkRouteContext = {
  params: Promise<{ shortcode: string }>;
};

export async function GET(
  _request: Request,
  { params }: ShortLinkRouteContext,
) {
  const { shortcode } = await params;
  const result = await getLinkByShortCode(shortcode);

  if (result.error) {
    return new NextResponse("Unable to resolve this short link.", {
      status: 500,
    });
  }

  if (!result.data) {
    return new NextResponse("Short link not found.", { status: 404 });
  }

  let destination: URL;

  try {
    destination = new URL(result.data.url);
  } catch {
    return new NextResponse("Invalid destination URL.", { status: 500 });
  }

  if (destination.protocol !== "http:" && destination.protocol !== "https:") {
    return new NextResponse("Invalid destination URL.", { status: 500 });
  }

  return NextResponse.redirect(destination, 302);
}