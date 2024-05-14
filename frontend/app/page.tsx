"use client";
import Link from "next/link";
import { SiBun } from "react-icons/si";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { GoNumber } from "react-icons/go";
import { TiAnchor } from "react-icons/ti";
import { TbBrandNpm } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa6";
import { MdDataSaverOff } from "react-icons/md";
import NavPackage from "@/pages/components/nav";
import FootPackage from "@/pages/components/foot";
import { SiFirefoxbrowser } from "react-icons/si";
import VerPackage from "@/pages/components/version";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import PlayGround from "@/pages/components/home/Playground";
import react from "react";

export default function home() {
  const [currentDate, setCurrentDate] = react.useState(new Date());
  react.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const fdate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "short" }
  )} ${currentDate.getFullYear()}`;

  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-900 scrollbar-neutral-900 scrollbar-thumb-red-600">
      <NavPackage />
      {/* Introduction */}
      <section
        id="Introduction"
        className="flex flex-col items-center justify-center mt-20"
      >
        <div className="max-w-screen-2xl px-6 py-16 mx-auto space-y-12">
          <article className="space-y-8">
            <VerPackage />
            <p className="text-white/80">
              Yt-Dlx Is A Robust Multimedia Downloading Tool Meticulously
              Crafted To Elevate Your Media Consumption Experience. With Its
              Advanced Capabilities, It Offers An All-Encompassing Solution For
              Effortlessly Acquiring Audio And Video Content From Diverse
              Sources. Drawing Inspiration From Renowned Projects Such As
              Python-Yt-Dlp And Python-Youtube-Dl, Yt-Dlx Combines Cutting-Edge
              Features With Real-Time Data Acquisition Facilitated By Puppeteer
              Technologies. Whether You Seek To Enrich Your Audio Library Or
              Curate A Collection Of High-Quality Videos, Yt-Dlx Stands As Your
              Indispensable Companion, Ensuring Seamless And Efficient Media
              Acquisition.
            </p>
          </article>
          <div>
            <div className="flex flex-wrap py-2 gap-2 border-b border-red-600 border-dashed">
              <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-white/80">
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
              <ul className="ml-4 space-y-1 list-disc text-white/80">
                <li>
                  <a rel="noopener noreferrer" className="cursor-pointer">
                    <span className="text-red-600">yarn</span> add yt-dlx |{" "}
                    <span className="text-red-600">yarn</span> global add yt-dlx
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
                    <span className="text-red-600">npm</span> install -g yt-dlx
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" className="cursor-pointer">
                    <span className="text-red-600">pnpm</span> install yt-dlx |{" "}
                    <span className="text-red-600">pnpm</span> install -g yt-dlx
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <PlayGround />
      {/* ==================================================================== */}
      <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 row-gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="mb-2 text-xs font-semibold tracking-wide text-red-600 uppercase">
              {fdate}
            </p>
            <div className="mb-3">
              <a
                aria-label="Article"
                className="inline-block text-red-600 transition-colors duration-200"
              >
                <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-4xl xl:text-5xl">
                  You've Searched For
                </p>
              </a>
            </div>
            <p className="mb-4 text-base text-white/80 md:text-lg">
              <GoNumber className="text-red-600" size={50} /> Found Total
              <span className="text-red-600 text-4xl"> " n " </span>Videos For
              Your Query !!
            </p>
            <div className="flex items-center">
              <a href="/" aria-label="Author" className="mr-3">
                <img
                  alt="avatar"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  className="object-cover w-10 h-10 rounded-full shadow-sm"
                />
              </a>
              <div>
                <a
                  href="/"
                  aria-label="Author"
                  className="font-semibold text-red-800 transition-colors duration-200"
                >
                  Petru Vîrtos
                </a>
                <p className="text-sm font-medium leading-4 text-red-600">
                  Author
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-8 lg:col-span-3">
            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
              <div className="grid gap-5 row-gap-10 lg:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <div className="max-w-xl mb-6">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-red-600 sm:text-4xl sm:leading-none">
                      The quick, brown fox
                      <br className="hidden md:block" />
                      jumps over{" "}
                      <span className="relative px-1">
                        <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-teal-accent-400" />
                        <span className="relative inline-block text-deep-purple-accent-400">
                          a lazy dog
                        </span>
                      </span>
                    </h2>
                    <p className="text-xs text-white/80 md:text-lg lowercase">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae. explicabo.
                    </p>
                  </div>
                  <p className="mb-4 text-sm font-bold text-red-600 tracking-widest uppercase flex flex-row gap-1">
                    <MdDataSaverOff className="text-red-600" size={20} />
                    meta-data
                  </p>
                  <div className="grid space-y-3 sm:gap-2 sm:grid-cols-2 sm:space-y-0">
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="mr-1">
                          <TiAnchor className="text-red-600" size={20} />
                        </span>
                        un-known
                      </li>
                      <li className="flex">
                        <span className="mr-1">
                          <TiAnchor className="text-red-600" size={20} />
                        </span>
                        un-known
                      </li>
                      <li className="flex">
                        <span className="mr-1">
                          <TiAnchor className="text-red-600" size={20} />
                        </span>
                        un-known
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="mr-1">
                          <TiAnchor className="text-red-600" size={20} />
                        </span>
                        un-known
                      </li>
                      <li className="flex">
                        <span className="mr-1">
                          <TiAnchor className="text-red-600" size={20} />
                        </span>
                        un-known
                      </li>
                      <li className="flex">
                        <span className="mr-1">
                          <TiAnchor className="text-red-600" size={20} />
                        </span>
                        un-known
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <img
                    className="object-cover w-full h-56 rounded-2xl border-2 border-red-600/40 hover:border-red-600 shadow-2xl shadow-red-600 sm:h-96"
                    src="/logo.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Documentation */}
      <section
        id="Documentation"
        className="flex flex-col items-center justify-center"
      >
        <div className="max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-screen-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl text-red-600">
              Explore All Available Functions
            </h2>
            <p className="mt-4 text-white/80">
              YT-DLX accommodates various node.js coding flavours!{" "}
              <span className="text-red-600">
                (typescript), (commonjs) and (esm)
              </span>
              , ensuring 100% compatibility and comprehensive type safety
              coverage.
            </p>
          </div>
          {/* ========================[ AUDIO ONLY ]======================== */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 bg-red-950/10 border-4 border-red-600 border-double rounded-3xl shadow-red-600 duration-500 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="table text-white/80">
                <thead>
                  <tr>
                    <th className="text-red-600 text-lg">Function Category</th>
                    <th className="text-red-600 text-lg">Function Call</th>
                    <th className="text-red-600 text-lg">Brief Description</th>
                    <th className="text-red-600 text-lg">Usage & Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <MdAudioFile
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      Audio Only
                    </td>
                    <td>Audio.Single.Highest</td>
                    <td>
                      Downloads and processes the highest quality audio from a
                      single YouTube video.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Audio/AudioHighest"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <MdAudioFile
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      Audio Only
                    </td>
                    <td>Audio.Single.Lowest</td>
                    <td>
                      Downloads and processes the lowest quality audio from a
                      single YouTube video.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Audio/AudioLowest"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <MdAudioFile
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      Audio Only
                    </td>
                    <td>Audio.Single.Custom</td>
                    <td>
                      Downloads and processes a single YouTube video with audio
                      customization options.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Audio/AudioCustom"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  {/* ========================[ VIDEO ONLY ]======================== */}
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <FaFileVideo
                        size={18}
                        className="text-red-600 animate-pulse"
                      />
                      Video Only
                    </td>
                    <td>Video.Single.Highest</td>
                    <td>
                      Downloads the highest quality version of a YouTube video
                      with customization options.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Video/VideoHighest"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <FaFileVideo
                        size={18}
                        className="text-red-600 animate-pulse"
                      />
                      Video Only
                    </td>
                    <td>Video.Single.Lowest</td>
                    <td>
                      Downloads the lowest quality version of a YouTube video
                      with customization options.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Video/VideoLowest"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <FaFileVideo
                        size={18}
                        className="text-red-600 animate-pulse"
                      />
                      Video Only
                    </td>
                    <td>Video.Single.Custom</td>
                    <td>
                      Downloads a YouTube video with customization options.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Video/VideoCustom"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  {/* ========================[ AUDIO VIDEO ]======================== */}
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <AiFillCodeSandboxCircle
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      Audio Video
                    </td>
                    <td>AudioVideo.Single.Highest</td>
                    <td>
                      Downloads audio and video from a YouTube video URL with
                      the highest available resolution.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/AudioVideo/AudioVideoHighest"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <AiFillCodeSandboxCircle
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      Audio Video
                    </td>
                    <td>AudioVideo.Single.Lowest</td>
                    <td>
                      Downloads audio and video from a YouTube video URL with
                      the lowest available resolution.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/AudioVideo/AudioVideoLowest"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <AiFillCodeSandboxCircle
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      Audio Video
                    </td>
                    <td>AudioVideo.Single.Custom</td>
                    <td>
                      Downloads audio and video from a YouTube video URL with
                      customizable options.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/AudioVideo/AudioVideoCustom"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  {/* ========================[ YTSEARCH ]======================== */}
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <SiFirefoxbrowser
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      YouTube Search
                    </td>
                    <td>Video.Single</td>
                    <td>
                      Fetches data for a single YouTube video based on the video
                      ID or link.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Command/video_data"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <SiFirefoxbrowser
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      YouTube Search
                    </td>
                    <td>Video.Multiple</td>
                    <td>Searches for YouTube videos based on the query.</td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Command/search_videos"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <SiFirefoxbrowser
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      YouTube Search
                    </td>
                    <td>Playlist.Single</td>
                    <td>Extracts metadata for videos in a YouTube playlist.</td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Command/playlist_data"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <SiFirefoxbrowser
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      YouTube Search
                    </td>
                    <td>Playlist.Multiple</td>
                    <td>Searches for YouTube playlists based on the query.</td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Command/search_playlist"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                  {/* ========================[ INFO GATHERER ]======================== */}
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <FaLightbulb
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      Info Gatherer
                    </td>
                    <td>info.extract</td>
                    <td>Extracts metadata information from a YouTube video.</td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link href="/docs/Command/extract" className="font-bold">
                        click here!
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-600/20">
                    <td className="flex items-center justify-center gap-2">
                      <FaLightbulb
                        size={20}
                        className="text-red-600 animate-pulse"
                      />
                      Info Gatherer
                    </td>
                    <td>info.list_formats</td>
                    <td>
                      Lists the available formats and manifest information for a
                      YouTube video.
                    </td>
                    <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                      <Link
                        href="/docs/Command/list_formats"
                        className="font-bold"
                      >
                        click here!
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <FootPackage />
    </main>
  );
}
