import ytdlx from "yt-dlx";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
  try {
    const instance = ytdlx.VideoOnly.Highest({ useTor: true, metadata: true, verbose: true, query });
    instance.on("metadata", metadata => {
      return NextResponse.json(metadata);
    });
    instance.on("start", command => {
      console.log("start:", command);
    });
    instance.on("error", error => {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    });
    return new Response("Download started", { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
