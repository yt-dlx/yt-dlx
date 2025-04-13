import type VideoInfo from "./VideoInfo";
import type AudioFormat from "./AudioFormat";
import type VideoFormat from "./VideoFormat";
import type ManifestFormat from "./ManifestFormat";

/**
 * Represents the output of the engine, containing information about videos and audio formats,
 * including both low and high-quality versions, as well as metadata.
 *
 * @interface EngineOutput
 */
export default interface EngineOutput {
  /**
   * Metadata about the video, such as title, description, channel, etc.
   *
   * @type {VideoInfo}
   */
  metaData: VideoInfo;

  /**
   * The lowest quality audio format.
   *
   * @type {AudioFormat}
   */
  AudioLowF: AudioFormat;

  /**
   * The highest quality audio format.
   *
   * @type {AudioFormat}
   */
  AudioHighF: AudioFormat;

  /**
   * List of all available low-quality audio formats.
   *
   * @type {AudioFormat[]}
   */
  AudioLow: AudioFormat[];

  /**
   * List of all available high-quality audio formats.
   *
   * @type {AudioFormat[]}
   */
  AudioHigh: AudioFormat[];

  /**
   * List of low-quality audio formats with DRC (Dynamic Range Compression).
   *
   * @type {AudioFormat[]}
   */
  AudioLowDRC: AudioFormat[];

  /**
   * List of high-quality audio formats with DRC (Dynamic Range Compression).
   *
   * @type {AudioFormat[]}
   */
  AudioHighDRC: AudioFormat[];

  /**
   * The lowest quality video format.
   *
   * @type {VideoFormat}
   */
  VideoLowF: VideoFormat;

  /**
   * The highest quality video format.
   *
   * @type {VideoFormat}
   */
  VideoHighF: VideoFormat;

  /**
   * List of all available low-quality video formats.
   *
   * @type {VideoFormat[]}
   */
  VideoLow: VideoFormat[];

  /**
   * List of all available high-quality video formats.
   *
   * @type {VideoFormat[]}
   */
  VideoHigh: VideoFormat[];

  /**
   * List of low-quality video formats with HDR (High Dynamic Range).
   *
   * @type {VideoFormat[]}
   */
  VideoLowHDR: VideoFormat[];

  /**
   * List of high-quality video formats with HDR (High Dynamic Range).
   *
   * @type {VideoFormat[]}
   */
  VideoHighHDR: VideoFormat[];

  /**
   * List of low-quality video formats in manifest format.
   *
   * @type {ManifestFormat[]}
   */
  ManifestLow: ManifestFormat[];

  /**
   * List of high-quality video formats in manifest format.
   *
   * @type {ManifestFormat[]}
   */
  ManifestHigh: ManifestFormat[];
}
