import ytdlx from "yt-dlx";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
  try {
    const instance = ytdlx.ytSearch.Video.Multiple({ query });
    instance.on("data", data => {
      console.log("Data received:", data);
      return NextResponse.json(data);
    });
    instance.on("error", error => {
      console.error("Error occurred:", error);
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    });
    return new Response("Search in progress...", { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
