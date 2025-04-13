import { Client } from "youtubei";
export default async function singleVideo({ videoId, languageCode = "en" }) {
  var youtube = new Client();
  var singleVideo = await youtube.getVideoTranscript(videoId, languageCode);
  console.log(JSON.stringify(singleVideo));
}
(async () => {
  await singleVideo({ videoId: "DOT1LmQbFFA", languageCode: "en" });
})();
