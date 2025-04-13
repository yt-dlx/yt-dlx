/**
 * Represents the video format information for a media file, including details such as file size,
 * resolution, codec, bitrate, and other attributes related to video streams.
 *
 * @interface VideoFormat
 */
export default interface VideoFormat {
  /**
   * The size of the video file in bytes.
   *
   * @type {number}
   */
  filesize: number;

  /**
   * A human-readable version of the filesize in bytes, MB, GB, etc.
   *
   * @type {string | number}
   */
  filesizeP: string | number;

  /**
   * A string indicating additional information about the video format, such as the resolution or codec.
   *
   * @type {string}
   */
  format_note: string;

  /**
   * The frames per second (FPS) of the video stream.
   *
   * @type {number}
   */
  fps: number;

  /**
   * The height of the video stream in pixels.
   *
   * @type {number}
   */
  height: number;

  /**
   * The width of the video stream in pixels.
   *
   * @type {number}
   */
  width: number;

  /**
   * The total bitrate of the video stream in kilobits per second (Kbps).
   *
   * @type {number}
   */
  tbr: number;

  /**
   * The URL to access the video file.
   *
   * @type {string}
   */
  url: string;

  /**
   * The file extension for the video file.
   *
   * @type {string}
   */
  ext: string;

  /**
   * The video codec used in the video file (e.g., "avc1", "vp9").
   *
   * @type {string}
   */
  vcodec: string;

  /**
   * The dynamic range of the video stream (e.g., "SDR", "HDR").
   *
   * @type {string}
   */
  dynamic_range: string;

  /**
   * The container format for the video file (e.g., "mp4", "mkv").
   *
   * @type {string}
   */
  container: string;

  /**
   * The resolution of the video stream (e.g., "1920x1080").
   *
   * @type {string}
   */
  resolution: string;

  /**
   * The aspect ratio of the video stream.
   *
   * @type {number}
   */
  aspect_ratio: number;

  /**
   * The video file extension (e.g., "mp4", "webm").
   *
   * @type {string}
   */
  video_ext: string;

  /**
   * The video bitrate in kilobits per second (Kbps).
   *
   * @type {number}
   */
  vbr: number;

  /**
   * The format name of the video stream (e.g., "mp4", "flv").
   *
   * @type {string}
   */
  format: string;
}
