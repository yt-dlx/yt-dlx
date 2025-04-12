import ytdlx from "yt-dlx";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const resolution = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "3072p", "4320p", "6480p", "8640p", "12000p"].includes(searchParams.get("resolution") || "")
    ? (searchParams.get("resolution") as "144p" | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "3072p" | "4320p" | "6480p" | "8640p" | "12000p")
    : "720p";
  if (!query) return NextResponse.json({ error: "Missing query parameter." }, { status: 400 });
  if (!resolution) return NextResponse.json({ error: "Missing resolution parameter." }, { status: 400 });
  try {
    const instance = ytdlx.VideoOnly.Custom({ useTor: true, metadata: true, verbose: true, query, resolution });
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
