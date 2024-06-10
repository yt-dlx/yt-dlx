import react from "react";
import Link from "next/link";
import { FaLightbulb } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa6";
import { SiFirefoxbrowser } from "react-icons/si";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

export default function Documentation(): JSX.Element {
  return (
    <react.Fragment>
      <section
        id="Documentation"
        className="flex flex-col items-center justify-center"
      >
        <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-bold sm:text-4xl text-red-600">
            Explore All Available Functions
          </h2>
          <p className="mt-4 text-white/60">
            YT-DLX accommodates various node.js coding flavours!{" "}
            <span className="text-red-600">
              (typescript), (commonjs) and (esm)
            </span>
            , ensuring 100% compatibility and comprehensive type safety
            coverage.
          </p>
          <div className="bg-stone-950 mt-8 grid grid-cols-1 gap-8 md:mt-16 border-4 border-red-600 rounded-3xl shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600">
            <div className="overflow-x-auto">
              {/* ========================[ AUDIO ONLY ]======================== */}
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-2 border-b-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600">
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <MdAudioFile className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Audio Only
                    </time>
                    <div className="text-lg font-black">
                      Audio.Single.Highest
                    </div>
                    Downloads and processes the highest quality audio from a
                    single YouTube video.
                    <br />
                    <Link
                      href="/docs/Audio/AudioHighest"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <MdAudioFile className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Audio Only
                    </time>
                    <div className="text-lg font-black">
                      Audio.Single.Lowest
                    </div>
                    Downloads and processes the lowest quality audio from a
                    single YouTube video.
                    <br />
                    <Link
                      href="/docs/Audio/AudioLowest"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <MdAudioFile className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Audio Only
                    </time>
                    <div className="text-lg font-black">
                      Audio.Single.Custom
                    </div>
                    Downloads and processes a single YouTube video with audio
                    customization options.
                    <br />
                    <Link
                      href="/docs/Audio/AudioCustom"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
              </ul>
              {/* ========================[ VIDEO ONLY ]======================== */}
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-2 border-b-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600">
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <FaFileVideo className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Video Only
                    </time>
                    <div className="text-lg font-black">
                      Video.Single.Highest
                    </div>
                    Downloads the highest quality version of a YouTube video
                    with customization options.
                    <br />
                    <Link
                      href="/docs/Video/VideoHighest"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <FaFileVideo className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Video Only
                    </time>
                    <div className="text-lg font-black">
                      Video.Single.Lowest
                    </div>
                    Downloads the lowest quality version of a YouTube video with
                    customization options.
                    <br />
                    <Link
                      href="/docs/Video/VideoLowest"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <FaFileVideo className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Video Only
                    </time>
                    <div className="text-lg font-black">
                      Video.Single.Custom
                    </div>
                    Downloads a YouTube video with customization options.
                    <br />
                    <Link
                      href="/docs/Video/VideoCustom"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
              </ul>
              {/* ========================[ AUDIO VIDEO ]======================== */}
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-2 border-b-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600">
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <AiFillCodeSandboxCircle
                      className="text-red-600"
                      size={30}
                    />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Audio with Video
                    </time>
                    <div className="text-lg font-black">
                      AudioVideo.Single.Highest
                    </div>
                    Downloads audio and video from a YouTube video URL with the
                    highest available resolution.
                    <br />
                    <Link
                      href="/docs/AudioVideo/AudioVideoHighest"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <AiFillCodeSandboxCircle
                      className="text-red-600"
                      size={30}
                    />
                  </div>
                  <div className="timeline-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Audio with Video
                    </time>
                    <div className="text-lg font-black">
                      AudioVideo.Single.Lowest
                    </div>
                    Downloads audio and video from a YouTube video URL with the
                    lowest available resolution.
                    <br />
                    <Link
                      href="/docs/AudioVideo/AudioVideoLowest"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <AiFillCodeSandboxCircle
                      className="text-red-600"
                      size={30}
                    />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Audio with Video
                    </time>
                    <div className="text-lg font-black">
                      AudioVideo.Single.Custom
                    </div>
                    Downloads audio and video from a YouTube video URL with
                    customizable options.
                    <br />
                    <Link
                      href="/docs/AudioVideo/AudioVideoCustom"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
              </ul>
              {/* ========================[ YTSEARCH ]======================== */}
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-2 border-b-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600">
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <SiFirefoxbrowser className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      YouTube Search
                    </time>
                    <div className="text-lg font-black">Video.Single</div>
                    Fetches data for a single YouTube video based on the video
                    ID or link.
                    <br />
                    <Link
                      href="/docs/Command/video_data"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <SiFirefoxbrowser className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      YouTube Search
                    </time>
                    <div className="text-lg font-black">Video.Multiple</div>
                    Searches for YouTube videos based on the query.
                    <br />
                    <Link
                      href="/docs/Command/search_videos"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <SiFirefoxbrowser className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      YouTube Search
                    </time>
                    <div className="text-lg font-black">Playlist.Single</div>
                    Extracts metadata for videos in a YouTube playlist.
                    <br />
                    <Link
                      href="/docs/Command/playlist_data"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <SiFirefoxbrowser className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      YouTube Search
                    </time>
                    <div className="text-lg font-black">Playlist.Multiple</div>
                    Searches for YouTube playlists based on the query.
                    <br />
                    <Link
                      href="/docs/Command/search_playlist"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
              </ul>
              {/* ========================[ INFO GATHERER ]======================== */}
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-2 border-b-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600">
                <li>
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <FaLightbulb className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Info Gatherer
                    </time>
                    <div className="text-lg font-black">info.extract</div>
                    Extracts metadata information from a YouTube video.
                    <br />
                    <Link
                      href="/docs/Command/extract"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle bg-stone-800 p-2 rounded-2xl">
                    <FaLightbulb className="text-red-600" size={30} />
                  </div>
                  <div className="timeline-end mb-10">
                    <time className="font-mono italic font-bold text-red-600">
                      Info Gatherer
                    </time>
                    <div className="text-lg font-black">info.list_formats</div>
                    Lists the available formats and manifest information for a
                    YouTube video.
                    <br />
                    <Link
                      href="/docs/Command/list_formats"
                      className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                    >
                      check usage and example!
                    </Link>
                  </div>
                  <hr />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </react.Fragment>
  );
}
