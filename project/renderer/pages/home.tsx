import react from "react";
import Link from "next/link";
import Image from "next/image";
import { SiBun } from "react-icons/si";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { HiFire } from "react-icons/hi";
import { GoNumber } from "react-icons/go";
import NavPackage from "./components/nav";
import FootPackage from "./components/foot";
import { TbBrandNpm } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa6";
import VerPackage from "./components/version";
import { TbWorldSearch } from "react-icons/tb";
import { TbDiamondFilled } from "react-icons/tb";
import { SiFirefoxbrowser } from "react-icons/si";
import { SiGradleplaypublisher } from "react-icons/si";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

export default function HomePage() {
  // const [Added, setAdd] = react.useState<any>();
  // react.useEffect(() => {
  // window.ipc.on("add", (response: string) => setAdd(response));
  // }, []);
  // window.ipc.send("add", { num1, num2 })

  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-[#111111] scrollbar-track-[#111111] scrollbar-thumb-red-600">
      <NavPackage />
      {/* ================================[ Introduction ]============================== */}
      <react.Fragment>
        <section
          id="Introduction"
          className="flex flex-col items-center justify-center mt-20"
        >
          <div className="max-w-screen-2xl px-6 py-16 mx-auto space-y-12">
            <article className="space-y-8">
              <VerPackage />
              <p className="text-white/60">
                Yt-Dlx Is A Robust Multimedia Downloading Tool Meticulously
                Crafted To Elevate Your Media Consumption Experience. With Its
                Advanced Capabilities, It Offers An All-Encompassing Solution
                For Effortlessly Acquiring Audio And Video Content From Diverse
                Sources. Drawing Inspiration From Renowned Projects Such As
                Python-Yt-Dlp And Python-Youtube-Dl, Yt-Dlx Combines
                Cutting-Edge Features With Real-Time Data Acquisition
                Facilitated By Puppeteer Technologies. Whether You Seek To
                Enrich Your Audio Library Or Curate A Collection Of High-Quality
                Videos, Yt-Dlx Stands As Your Indispensable Companion, Ensuring
                Seamless And Efficient Media Acquisition.
              </p>
            </article>
            <div>
              <div className="flex flex-wrap py-2 gap-2 border-b border-red-600 border-dashed">
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-white/60">
                  <div className="flex items-center gap-2 md:space-x-2">
                    <TbBrandNpm className="text-red-600" size={50} />
                    <FaYarn className="text-red-600" size={30} />
                    <SiPnpm className="text-red-600" size={30} />
                    <SiBun className="text-red-600" size={30} />
                  </div>
                </div>
              </div>
              <div className="space-y-2 pt-8">
                <p className="text-2xl font-semibold text-red-600">
                  Install Now Using Any Package Manager Of Your Choice!
                </p>
                <ul className="ml-4 space-y-1 list-disc text-white/60">
                  <li>
                    <a rel="noopener noreferrer" className="cursor-pointer">
                      <span className="text-red-600">yarn</span> add yt-dlx |{" "}
                      <span className="text-red-600">yarn</span> global add
                      yt-dlx
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" className="cursor-pointer">
                      <span className="text-red-600">bun</span> add yt-dlx |{" "}
                      <span className="text-red-600">bun</span> add -g yt-dlx
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" className="cursor-pointer">
                      <span className="text-red-600">npm</span> install yt-dlx |{" "}
                      <span className="text-red-600">npm</span> install -g
                      yt-dlx
                    </a>
                  </li>
                  <li>
                    <a rel="noopener noreferrer" className="cursor-pointer">
                      <span className="text-red-600">pnpm</span> install yt-dlx
                      | <span className="text-red-600">pnpm</span> install -g
                      yt-dlx
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </react.Fragment>
      {/* ================================[ Documentation ]============================== */}
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
                      Downloads the lowest quality version of a YouTube video
                      with customization options.
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
                      Downloads audio and video from a YouTube video URL with
                      the highest available resolution.
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
                      Downloads audio and video from a YouTube video URL with
                      the lowest available resolution.
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
                      <div className="text-lg font-black">
                        Playlist.Multiple
                      </div>
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
                      <div className="text-lg font-black">
                        info.list_formats
                      </div>
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
      <FootPackage />
    </main>
  );
}
