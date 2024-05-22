"use client";
import react from "react";
import Link from "next/link";
import Image from "next/image";
import io from "socket.io-client";
import { SiBun } from "react-icons/si";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { HiFire } from "react-icons/hi";
import { GoNumber } from "react-icons/go";
import { TbBrandNpm } from "react-icons/tb";
import * as socketIO from "socket.io-client";
import { FaLightbulb } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa6";
import { TbWorldSearch } from "react-icons/tb";
import { TbDiamondFilled } from "react-icons/tb";
import NavPackage from "@/pages/components/nav";
import FootPackage from "@/pages/components/foot";
import { SiFirefoxbrowser } from "react-icons/si";
import VerPackage from "@/pages/components/version";
import { SiGradleplaypublisher } from "react-icons/si";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function home() {
  var QueryClient = useQueryClient();
  var [Query, setQuery] = react.useState<string>("");
  var [similar, setSimilar] = react.useState<string[]>([]);
  var [socket, setSocket] = react.useState<socketIO.Socket>();
  var [TubeSearch, setTubeSearch] = react.useState<any>(null);
  var [currentDate, setCurrentDate] = react.useState(new Date());
  var ApiSearch = useMutation({
    mutationFn: async () => {
      var resp = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: Query,
        }),
      });
      if (resp.status === 200) setTubeSearch(await resp.json());
      else setTubeSearch(null);
    },
    onMutate: () => console.log("ApiSearch started!"),
  });
  react.useEffect(() => {
    fetch("/api/ioSocket").finally(() => {
      var ioSocket = io();
      var getSimilar = (data: string[]) => setSimilar(data.slice(0, 10));
      ioSocket.on("similar", getSimilar);
      setSocket(ioSocket);
      return () => {
        ioSocket.off("similar", getSimilar);
        ioSocket.disconnect();
      };
    });
  }, []);
  react.useEffect(() => {
    var interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  var fdate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "short" }
  )} ${currentDate.getFullYear()}`;
  var Introduction = () => {
    return (
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
    );
  };
  var Documentation = () => {
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
            {/* ========================[ AUDIO ONLY ]======================== */}
            <div className="bg-stone-950 mt-8 grid grid-cols-1 gap-8 md:mt-16 border-4 border-red-600 rounded-3xl shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600">
              <div className="overflow-x-auto overflow-y-auto">
                <table className="table text-white/60">
                  <thead>
                    <tr>
                      <th className="text-red-600 text-lg">
                        Function Category
                      </th>
                      <th className="text-red-600 text-lg">Function Call</th>
                      <th className="text-red-600 text-lg">
                        Brief Description
                      </th>
                      <th className="text-red-600 text-lg">Usage & Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
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
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/Audio/AudioHighest"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
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
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/Audio/AudioLowest"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
                        <MdAudioFile
                          size={20}
                          className="text-red-600 animate-pulse"
                        />
                        Audio Only
                      </td>
                      <td>Audio.Single.Custom</td>
                      <td>
                        Downloads and processes a single YouTube video with
                        audio customization options.
                      </td>
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
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
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
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
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/Video/VideoHighest"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
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
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/Video/VideoLowest"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
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
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
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
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
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
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/AudioVideo/AudioVideoHighest"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
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
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/AudioVideo/AudioVideoLowest"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
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
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
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
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
                        <SiFirefoxbrowser
                          size={20}
                          className="text-red-600 animate-pulse"
                        />
                        YouTube Search
                      </td>
                      <td>Video.Single</td>
                      <td>
                        Fetches data for a single YouTube video based on the
                        video ID or link.
                      </td>
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/Command/video_data"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
                        <SiFirefoxbrowser
                          size={20}
                          className="text-red-600 animate-pulse"
                        />
                        YouTube Search
                      </td>
                      <td>Video.Multiple</td>
                      <td>Searches for YouTube videos based on the query.</td>
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/Command/search_videos"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
                        <SiFirefoxbrowser
                          size={20}
                          className="text-red-600 animate-pulse"
                        />
                        YouTube Search
                      </td>
                      <td>Playlist.Single</td>
                      <td>
                        Extracts metadata for videos in a YouTube playlist.
                      </td>
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/Command/playlist_data"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
                        <SiFirefoxbrowser
                          size={20}
                          className="text-red-600 animate-pulse"
                        />
                        YouTube Search
                      </td>
                      <td>Playlist.Multiple</td>
                      <td>
                        Searches for YouTube playlists based on the query.
                      </td>
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
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
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
                        <FaLightbulb
                          size={20}
                          className="text-red-600 animate-pulse"
                        />
                        Info Gatherer
                      </td>
                      <td>info.extract</td>
                      <td>
                        Extracts metadata information from a YouTube video.
                      </td>
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
                        <Link
                          href="/docs/Command/extract"
                          className="font-bold"
                        >
                          click here!
                        </Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-600/20">
                      <td className="font-semibold flex items-center justify-center gap-2 text-red-600">
                        <FaLightbulb
                          size={20}
                          className="text-red-600 animate-pulse"
                        />
                        Info Gatherer
                      </td>
                      <td>info.list_formats</td>
                      <td>
                        Lists the available formats and manifest information for
                        a YouTube video.
                      </td>
                      <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white/60">
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
      </react.Fragment>
    );
  };
  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-[#111111] scrollbar-track-[#111111] scrollbar-thumb-red-600">
      <NavPackage />
      <Introduction />
      <section
        id="Playground"
        className="flex flex-col items-center justify-center"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setTubeSearch(null);
            ApiSearch.mutate();
          }}
          className="bg-stone-950 max-w-screen-xl p-10 text-red-600 mx-auto my-8 rounded-2xl border-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600"
        >
          <h1 className="text-6xl mb-4 font-bold">Yt-Dlx PlayGround</h1>
          <h2 className="text-3xl font-bold text-red-600 mb-4 font-mono">
            Effortless Audio Video Downloader And Streamer!
          </h2>
          <p className="mb-8 italic text-white/60">
            Unlock the power of YT-DLX, the ultimate node.js toolkit for
            seamless audio and video downloading and streaming. Effortlessly
            handle various coding flavors, from TypeScript to CommonJS and ESM,
            ensuring 100% compatibility and comprehensive type safety.
          </p>
          <div className="flex items-center gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="flex flex-row items-center justify-center label-text text-red-600 text-sm">
                  <HiFire size={20} className="text-red-600 animate-pulse" />
                  option :
                  <span className="text-white/60">provide video name</span>
                </span>
                <span className="flex flex-row items-center justify-center label-text-alt text-red-600 text-sm">
                  <HiFire size={20} className="text-red-600 animate-pulse" />
                  option :
                  <span className="text-white/60">provide video link</span>
                </span>
              </div>
              <input
                type="text"
                value={Query}
                placeholder="required"
                disabled={ApiSearch.isPending}
                onChange={(e) => {
                  setQuery(e.target.value);
                  socket?.emit("similar", {
                    query: e.target.value,
                    user: socket.id,
                  });
                }}
                className="input input-bordered w-full rounded-2xl bg-neutral-800"
              />
              <div className="label">
                <span className="flex flex-row items-center justify-center label-text-alt text-red-600 text-sm">
                  <HiFire size={20} className="text-red-600 animate-pulse" />
                  option :
                  <span className="text-white/60">provide video id</span>
                </span>
              </div>
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={ApiSearch.isPending}
              className="flex flex-row items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:ring-2 active:ring-red-500 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-800 hover:bg-red-600 text-white/60 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg w-full"
            >
              <TbWorldSearch
                size={20}
                className="text-white/60 mr-1 font-bold"
              />
              Search YouTube
            </button>
          </div>
          {/* <div className="mockup-code bg-stone-950 text-red-600">
<pre data-prefix="$">
<code className="text-red-600 font-bold lowercase">
Copyright © {fdate}
</code>
</pre>
{similar.length > 0 ? (
similar.map((data: any, index: number) => (
<pre
key={index}
data-prefix=">"
className="text-sm overflow-x-auto overflow-y-auto"
>
<code>{data.title}</code>
</pre>
))
) : (
<pre data-prefix=">" className="text-sm animate-pulse">
<code>start typing to get suggestions...</code>
</pre>
)}
</div> */}
          {TubeSearch && (
            <react.Fragment>
              <section className="px-4 mx-auto max-w-7xl">
                <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 border-b-4 border-double border-red-600 mb-10">
                  <div className="grid gap-10 row-gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                      <div className="mb-3">
                        <a
                          aria-label="Article"
                          className="inline-block text-red-600 transition-colors duration-200"
                        >
                          <p className="font-sans text-xl font-thin leading-none tracking-tight lg:text-4xl xl:text-5xl">
                            You've Searched For <br></br>
                            <span className="text-red-600 text-6xl font-extrabold">
                              " {Query} "
                            </span>
                          </p>
                        </a>
                      </div>
                      <p className="mb-4 text-base text-white/60 md:text-lg flex flex-row">
                        <GoNumber className="text-red-600" size={50} /> Found
                        Total{" "}
                        <span className="text-red-600 text-4xl">
                          " {TubeSearch.length || 0} "
                        </span>{" "}
                        Videos For Your Query !!
                      </p>
                    </div>
                  </div>
                </div>
                {/* ========================================================== */}
                <section className="w-full mx-auto">
                  <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    {TubeSearch &&
                      TubeSearch.map((item: any, index: number) => (
                        <Link
                          key={index}
                          href={`/${item.id}`}
                          className="relative group mb-4 duration-700 bg-[#111111] p-1 shadow-red-900 hover:shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] rounded-2xl border-2 border-red-600/40 hover:border-red-600 flex flex-col justify-between"
                        >
                          <div className="relative">
                            <Image
                              alt="logo"
                              width={400}
                              height={400}
                              loading="lazy"
                              src={item.thumbnails[0].url}
                              className="object-cover w-full h-56 mb-5 bg-center rounded-t-2xl duration-700 group-hover:shadow-red-600 shadow-red-600/40 shadow-[0_0_20px_rgba(255,0,0,0.5)] group-hover:blur-sm"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                              <SiGradleplaypublisher
                                className="text-red-600 animate-spin"
                                size={140}
                              />
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col">
                            <p className="mb-2 text-xs font-semibold tracking-wider text-red-600 uppercase">
                              number :: {index}
                            </p>
                            <h2 className="mb-2 text-xl font-bold leading-snug text-red-600">
                              {item.title}
                            </h2>
                            <p className="mb-4 text-sm font-normal text-white/60">
                              {item.description}
                            </p>
                            <div className="flex items-center text-white/60">
                              <ul className="mb-3 list-disc ml-4 text-xs">
                                <li>
                                  <span className="text-red-600 text-sm">
                                    videoId:
                                  </span>{" "}
                                  {item.id}
                                </li>
                                <li>
                                  <span className="text-red-600 text-sm">
                                    channelid:
                                  </span>{" "}
                                  {item.channelid}
                                </li>
                                <li>
                                  <span className="text-red-600 text-sm">
                                    channelname:
                                  </span>{" "}
                                  {item.channelname}
                                </li>
                                <li>
                                  <span className="text-red-600 text-sm">
                                    duration:
                                  </span>{" "}
                                  {item.duration}
                                </li>
                                <li>
                                  <span className="text-red-600 text-sm">
                                    uploadDate:
                                  </span>{" "}
                                  {item.uploadDate}
                                </li>
                                <li>
                                  <span className="text-red-600 text-sm">
                                    viewCount:
                                  </span>{" "}
                                  {item.viewCount}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flex items-center justify-center p-2 duration-700 group-hover:bg-red-600/60 bg-red-600/40 text-white/90 mt-0.5 w-full text-sm gap-1 rounded-b-xl">
                            powered by <TbDiamondFilled size={20} /> yt-dlx{" "}
                          </div>
                        </Link>
                      ))}
                  </div>
                </section>
              </section>
            </react.Fragment>
          )}
        </form>
      </section>
      <Documentation />
      <FootPackage />
    </main>
  );
}
