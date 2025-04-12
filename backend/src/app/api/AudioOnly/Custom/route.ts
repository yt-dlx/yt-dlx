import ytdlx from "yt-dlx";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const resolution = ["high", "medium", "low", "ultralow"].includes(searchParams.get("resolution") || "") ? (searchParams.get("resolution") as "high" | "medium" | "low" | "ultralow") : "medium";
  if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
  if (!resolution) return NextResponse.json({ error: "Missing resolution parameter." }, { status: 400 });
  try {
    const instance = ytdlx.AudioOnly.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
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
