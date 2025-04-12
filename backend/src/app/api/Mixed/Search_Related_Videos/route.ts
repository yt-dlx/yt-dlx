import ytdlx from "yt-dlx";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  if (!videoId) return NextResponse.json({ error: "Missing videoId parameter." }, { status: 400 });
  try {
    const instance = ytdlx.ytSearch.Video.Related({ videoId });
    instance.on("data", data => {
      return NextResponse.json(data);
    });
    instance.on("error", error => {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    });
    return new Response("Search in progress...", { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
