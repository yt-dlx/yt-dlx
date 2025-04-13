/**
 * Represents metadata about a video, including details such as title, uploader, view count, and other video attributes.
 *
 * @interface VideoInfo
 */
export default interface VideoInfo {
  /**
   * The unique identifier for the video.
   *
   * @type {string}
   */
  id: string;

  /**
   * The title of the video.
   *
   * @type {string}
   */
  title: string;

  /**
   * The name of the channel that uploaded the video.
   *
   * @type {string}
   */
  channel: string;

  /**
   * The name of the uploader.
   *
   * @type {string}
   */
  uploader: string;

  /**
   * The duration of the video in seconds.
   *
   * @type {number}
   */
  duration: number;

  /**
   * The URL of the video's thumbnail image.
   *
   * @type {string}
   */
  thumbnail: string;

  /**
   * The age limit rating for the video (e.g., 18 for adult content).
   *
   * @type {number}
   */
  age_limit: number;

  /**
   * The unique identifier for the video channel.
   *
   * @type {string}
   */
  channel_id: string;

  /**
   * The categories associated with the video (e.g., ["Music", "Entertainment"]).
   *
   * @type {string[]}
   */
  categories: string[];

  /**
   * The display ID of the video, which is often used in the video URL.
   *
   * @type {string}
   */
  display_id: string;

  /**
   * A description of the video content.
   *
   * @type {string}
   */
  description: string;

  /**
   * The URL of the channel that uploaded the video.
   *
   * @type {string}
   */
  channel_url: string;

  /**
   * The URL of the video webpage.
   *
   * @type {string}
   */
  webpage_url: string;

  /**
   * Indicates whether the video is live.
   *
   * @type {boolean}
   */
  live_status: boolean;

  /**
   * The number of views the video has received.
   *
   * @type {number}
   */
  view_count: number;

  /**
   * The number of likes the video has received.
   *
   * @type {number}
   */
  like_count: number;

  /**
   * The number of comments the video has received.
   *
   * @type {number}
   */
  comment_count: number;

  /**
   * The number of followers the video uploader has on their channel.
   *
   * @type {number}
   */
  channel_follower_count: number;

  /**
   * The date the video was uploaded, in ISO 8601 format (e.g., "2023-04-25T18:30:00Z").
   *
   * @type {string}
   */
  upload_date: string;

  /**
   * The unique identifier for the uploader's account.
   *
   * @type {string}
   */
  uploader_id: string;

  /**
   * The original URL of the video.
   *
   * @type {string}
   */
  original_url: string;

  /**
   * The URL of the uploader's channel.
   *
   * @type {string}
   */
  uploader_url: string;

  /**
   * The duration of the video as a human-readable string (e.g., "1 hour 30 minutes").
   *
   * @type {string}
   */
  duration_string: string;
}
