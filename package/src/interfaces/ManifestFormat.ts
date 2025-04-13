/**
 * Represents the format of a video manifest, containing detailed information about a video stream.
 *
 * @interface ManifestFormat
 */
export default interface ManifestFormat {
  /**
   * The URL to access the video stream.
   *
   * @type {string}
   */
  url: string;

  /**
   * The URL to the manifest file describing the video stream.
   *
   * @type {string}
   */
  manifest_url: string;

  /**
   * The total bitrate of the video stream in kilobits per second (Kbps).
   *
   * @type {number}
   */
  tbr: number;

  /**
   * The file extension of the video stream (e.g., "mp4", "webm").
   *
   * @type {string}
   */
  ext: string;

  /**
   * The frames per second (FPS) of the video stream.
   *
   * @type {number}
   */
  fps: number;

  /**
   * The width of the video stream in pixels.
   *
   * @type {number}
   */
  width: number;

  /**
   * The height of the video stream in pixels.
   *
   * @type {number}
   */
  height: number;

  /**
   * The video codec used in the video stream (e.g., "avc1", "vp9").
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
   * The format name of the video stream (e.g., "mp4", "webm").
   *
   * @type {string}
   */
  format: string;
}
