import colors from "colors";
import ytdlx from "../../base/Agent";
import type EngineOutput from "../../interfaces/EngineOutput";

/**
 * Extracts metadata information from a YouTube video.
 *
 * @param query - The YouTube video URL to extract metadata from.
 * @param verbose - (optional) Whether to log verbose output or not.
 * @param useTor - (optional) Whether to use Tor for the download or not.
 * @returns A Promise that resolves with an object containing metadata information about the video.
 */
export default async function extract({ query, verbose }: { query: string; verbose?: boolean }) {
  var metaBody: EngineOutput = await ytdlx({ query, verbose });
  if (!metaBody) {
    return {
      message: "Unable to get response!",
      status: 500,
    };
  }
  var uploadDate = new Date(
    metaBody.metaData.upload_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
  );
  var currentDate = new Date();
  var daysAgo = Math.floor((currentDate.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24));
  var prettyDate = uploadDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  var uploadAgoObject = calculateUploadAgo(daysAgo);
  var videoTimeInSeconds = metaBody.metaData.duration;
  var videoDuration = calculateVideoDuration(videoTimeInSeconds);
  var viewCountFormatted = formatCount(metaBody.metaData.view_count);
  var likeCountFormatted = formatCount(metaBody.metaData.like_count);
  function calculateUploadAgo(days: number) {
    var years = Math.floor(days / 365);
    var months = Math.floor((days % 365) / 30);
    var remainingDays = days % 30;
    var formattedString = `${years > 0 ? years + " years, " : ""}${
      months > 0 ? months + " months, " : ""
    }${remainingDays} days`;
    return { years, months, days: remainingDays, formatted: formattedString };
  }
  function calculateVideoDuration(seconds: number) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    var formattedString = `${hours > 0 ? hours + " hours, " : ""}${
      minutes > 0 ? minutes + " minutes, " : ""
    }${remainingSeconds} seconds`;
    return {
      hours,
      minutes,
      seconds: remainingSeconds,
      formatted: formattedString,
    };
  }
  function formatCount(count: number) {
    var abbreviations = ["K", "M", "B", "T"];
    for (var i = abbreviations.length - 1; i >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3);
      if (size <= count) {
        var formattedCount = Math.round((count / size) * 10) / 10;
        return `${formattedCount}${abbreviations[i]}`;
      }
    }
    return `${count}`;
  }
  var payload = {
    AudioLowF: metaBody.AudioLowF,
    AudioHighF: metaBody.AudioHighF,
    VideoLowF: metaBody.VideoLowF,
    VideoHighF: metaBody.VideoHighF,
    AudioLowDRC: metaBody.AudioLowDRC,
    AudioHighDRC: metaBody.AudioHighDRC,
    AudioLow: metaBody.AudioLow,
    AudioHigh: metaBody.AudioHigh,
    VideoLowHDR: metaBody.VideoLowHDR,
    VideoHighHDR: metaBody.VideoHighHDR,
    VideoLow: metaBody.VideoLow,
    VideoHigh: metaBody.VideoHigh,
    ManifestLow: metaBody.ManifestLow,
    ManifestHigh: metaBody.ManifestHigh,
    meta_data: {
      id: metaBody.metaData.id,
      original_url: metaBody.metaData.original_url,
      webpage_url: metaBody.metaData.webpage_url,
      title: metaBody.metaData.title,
      view_count: metaBody.metaData.view_count,
      like_count: metaBody.metaData.like_count,
      view_count_formatted: viewCountFormatted,
      like_count_formatted: likeCountFormatted,
      uploader: metaBody.metaData.uploader,
      uploader_id: metaBody.metaData.uploader_id,
      uploader_url: metaBody.metaData.uploader_url,
      thumbnail: metaBody.metaData.thumbnail,
      categories: metaBody.metaData.categories,
      time: videoTimeInSeconds,
      duration: videoDuration,
      age_limit: metaBody.metaData.age_limit,
      live_status: metaBody.metaData.live_status,
      description: metaBody.metaData.description,
      full_description: metaBody.metaData.description,
      upload_date: prettyDate,
      upload_ago: daysAgo,
      upload_ago_formatted: uploadAgoObject,
      comment_count: metaBody.metaData.comment_count,
      comment_count_formatted: formatCount(metaBody.metaData.comment_count),
      channel_id: metaBody.metaData.channel_id,
      channel_name: metaBody.metaData.channel,
      channel_url: metaBody.metaData.channel_url,
      channel_follower_count: metaBody.metaData.channel_follower_count,
      channel_follower_count_formatted: formatCount(metaBody.metaData.channel_follower_count),
    },
  };
  console.log(
    colors.green("@info:"),
    "❣️ Thank you for using",
    colors.green("yt-dlx."),
    "Consider",
    colors.green("🌟starring"),
    "the github repo",
    colors.green("https://github.com/yt-dlx\n"),
  );
  return payload;
}
