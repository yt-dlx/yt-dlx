/**
 * Represents the audio format information for a media file.
 *
 * This interface defines the structure of an audio format, including details such as file size,
 * format, bitrate, codec, and other attributes related to audio streams in media files.
 *
 * @interface AudioFormat
 */
export default interface AudioFormat {
  /**
   * The size of the audio file in bytes.
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
   * The audio sampling rate (in Hz).
   *
   * @type {number}
   */
  asr: number;

  /**
   * A string indicating additional information about the audio format, such as the codec used.
   *
   * @type {string}
   */
  format_note: string;

  /**
   * The total bitrate of the audio stream, in kilobits per second (Kbps).
   *
   * @type {number}
   */
  tbr: number;

  /**
   * The URL to access the audio file.
   *
   * @type {string}
   */
  url: string;

  /**
   * The file extension for the audio file.
   *
   * @type {string}
   */
  ext: string;

  /**
   * The audio codec used in the audio file (e.g., "mp3", "aac").
   *
   * @type {string}
   */
  acodec: string;

  /**
   * The container format for the audio file (e.g., "mp4", "mkv").
   *
   * @type {string}
   */
  container: string;

  /**
   * The resolution of the audio file (if applicable).
   *
   * @type {string}
   */
  resolution: string;

  /**
   * The audio extension used in the file (e.g., "mp3", "aac").
   *
   * @type {string}
   */
  audio_ext: string;

  /**
   * The average bitrate (ABR) of the audio stream in kilobits per second (Kbps).
   *
   * @type {number}
   */
  abr: number;

  /**
   * The format name of the audio stream (e.g., "mp3", "flac").
   *
   * @type {string}
   */
  format: string;
}
