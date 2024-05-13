"use client";
import react from "react";
import Link from "next/link";
import Image from "next/image";
import io from "socket.io-client";
import { SiBun } from "react-icons/si";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { TbBrandNpm } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import * as socketIO from "socket.io-client";
import { FaFileVideo } from "react-icons/fa6";
import NavPackage from "@/pages/components/nav";
import FootPackage from "@/pages/components/foot";
import { SiFirefoxbrowser } from "react-icons/si";
import VerPackage from "@/pages/components/version";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { useQueryClient, useMutation } from "@tanstack/react-query";

var Introduction = () => {
  return (
    <section
      id="Introduction"
      className="flex flex-col items-center justify-center mt-20"
    >
      <div className="max-w-screen-2xl px-6 py-16 mx-auto space-y-12">
        <article className="space-y-8">
          <VerPackage />
          <p className="text-white/80">
            Yt-Dlx Is A Robust Multimedia Downloading Tool Meticulously Crafted
            To Elevate Your Media Consumption Experience. With Its Advanced
            Capabilities, It Offers An All-Encompassing Solution For
            Effortlessly Acquiring Audio And Video Content From Diverse Sources.
            Drawing Inspiration From Renowned Projects Such As Python-Yt-Dlp And
            Python-Youtube-Dl, Yt-Dlx Combines Cutting-Edge Features With
            Real-Time Data Acquisition Facilitated By Puppeteer Technologies.
            Whether You Seek To Enrich Your Audio Library Or Curate A Collection
            Of High-Quality Videos, Yt-Dlx Stands As Your Indispensable
            Companion, Ensuring Seamless And Efficient Media Acquisition.
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
  );
};
var Playground = () => {
  var QueryClient = useQueryClient();
  var [Query, setQuery] = react.useState<string>("");
  var [TubeSearch, setTubeSearch] = react.useState<any>(null);
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
  var [similar, setSimilar] = react.useState<string[]>([]);
  var [socket, setSocket] = react.useState<socketIO.Socket>();
  react.useEffect(() => {
    fetch("/api/ioSocket").finally(() => {
      var ioSocket = io();
      var getSimilar = (data: string[]) => setSimilar(data.slice(0, 8));
      ioSocket.on("similar", getSimilar);
      setSocket(ioSocket);
      return () => {
        ioSocket.off("similar", getSimilar);
        ioSocket.disconnect();
      };
    });
  }, []);

  return (
    <section
      id="Playground"
      className="flex flex-col items-center justify-center"
    >
      <div className="max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="max-w-screen-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl text-red-600">
            Yt-Dlx PlayGround
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
        <section className="mt-8 grid grid-cols-1 gap-8 md:mt-16 bg-red-950/10 border-4 border-red-600 border-double rounded-3xl shadow-red-600 duration-500 shadow-2xl">
          <div className="overflow-x-auto">
            <section className="grid grid-cols-1 gap-0 lg:grid-cols-12">
              <div className="w-full col-span-1 p-4 mx-auto mt-6 lg:col-span-8 xl:p-12 md:w-2/4">
                <h1 className="mt-6 mb-4 text-3xl font-black text-left text-red-600">
                  Effortless Audio Video Downloader And Streamer!
                </h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setTubeSearch(null);
                    setSimilar([]);
                    ApiSearch.mutate();
                  }}
                  className="pb-1 space-y-4"
                >
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-xs text-red-600 font-bold">
                        Provide Video Link!
                      </span>
                      <span className="label-text-alt text-red-600 font-bold">
                        Provide Video ID!
                      </span>
                    </div>
                    <input
                      required
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
                      className="input input-bordered w-full max-w-xs"
                    />
                    <div className="label">
                      <span className="label-text-alt text-red-600 font-bold">
                        Provide Video Name!
                      </span>
                      <span className="label-text-alt text-red-600 font-bold">
                        Copyright © 2024
                      </span>
                    </div>
                  </label>
                  <button
                    type="submit"
                    disabled={ApiSearch.isPending}
                    className="btn btn-wide bg-red-800 hover:bg-red-600 duration-500 text-white font-bold ml-4"
                  >
                    Search YouTube
                  </button>
                </form>
              </div>
              <div className="col-span-1 lg:col-span-4 p-2 m-2">
                {similar.length > 0 ? (
                  similar.map((data: any, index: number) => (
                    <ul key={index} className="text-sm list-disc">
                      <li>{data.title}</li>
                    </ul>
                  ))
                ) : (
                  <img
                    alt="logo"
                    loading="lazy"
                    src="/logo.png"
                    className="object-cover w-full h-64 min-h-full"
                  />
                )}
              </div>
            </section>
            {TubeSearch && (
              <react.Fragment>
                <section className="px-4 py-24 mx-auto max-w-7xl">
                  <h2 className="pb-8 mb-12 text-2xl font-extrabold leading-tight text-red-600 border-b-4 border-double border-red-600 md:text-6xl">
                    YouTube Results
                  </h2>
                  <div className="w-full xl:w-4/6">
                    <div className="flex flex-col space-y-16">
                      {TubeSearch &&
                        TubeSearch.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 gap-6 md:grid-cols-4"
                          >
                            <Image
                              width={200}
                              height={200}
                              loading="lazy"
                              alt="thumbnail"
                              src={item.thumbnails[0].url}
                              className="object-cover w-full h-40 col-span-1 bg-center rounded-3xl duration-300 shadow-black shadow-2xl border border-red-600"
                            />
                            <div className="col-span-1 md:col-span-3">
                              <h2 className="mb-2 text-2xl font-extrabold leading-snug text-red-600">
                                {item.title}
                              </h2>
                              <ul className="mb-3 list-disc ml-4">
                                <li>
                                  <span className="text-red-600 font-bold">
                                    @description:
                                  </span>{" "}
                                  {item.description}
                                </li>
                                <li>
                                  <span className="text-red-600 font-bold">
                                    @videoId:
                                  </span>{" "}
                                  {item.id}
                                </li>
                                <li>
                                  <span className="text-red-600 font-bold">
                                    @channelid:
                                  </span>{" "}
                                  {item.channelid}
                                </li>
                                <li>
                                  <span className="text-red-600 font-bold">
                                    @channelname:
                                  </span>{" "}
                                  {item.channelname}
                                </li>
                                <li>
                                  <span className="text-red-600 font-bold">
                                    @duration:
                                  </span>{" "}
                                  {item.duration}
                                </li>
                                <li>
                                  <span className="text-red-600 font-bold">
                                    @uploadDate:
                                  </span>{" "}
                                  {item.uploadDate}
                                </li>
                                <li>
                                  <span className="text-red-600 font-bold">
                                    @viewCount:
                                  </span>{" "}
                                  {item.viewCount}
                                </li>
                              </ul>
                              <div className="md:flex items-left justify-left gap-2">
                                <Link
                                  href={`/${item.id}`}
                                  className="btn bg-red-800 hover:bg-red-600 rounded-2xl shadow-black shadow-2xl text-white font-bold btn-wide"
                                >
                                  stream or download file!
                                </Link>
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();
                                  }}
                                  className="btn bg-red-800 hover:bg-red-600 rounded-2xl shadow-black shadow-2xl text-white font-bold btn-wide"
                                >
                                  download metadata!
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              </react.Fragment>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};
var Documentation = () => {
  return (
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
                    <Link href="/docs/Audio/AudioHighest" className="font-bold">
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
                    <Link href="/docs/Audio/AudioLowest" className="font-bold">
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
                    <Link href="/docs/Audio/AudioCustom" className="font-bold">
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
                    <Link href="/docs/Video/VideoHighest" className="font-bold">
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
                    Downloads the lowest quality version of a YouTube video with
                    customization options.
                  </td>
                  <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                    <Link href="/docs/Video/VideoLowest" className="font-bold">
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
                  <td>Downloads a YouTube video with customization options.</td>
                  <td className="cursor-pointer hover:bg-red-800 hover:animate-pulse rounded-r-3xl text-white">
                    <Link href="/docs/Video/VideoCustom" className="font-bold">
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
                    Downloads audio and video from a YouTube video URL with the
                    highest available resolution.
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
                    Downloads audio and video from a YouTube video URL with the
                    lowest available resolution.
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
                    <Link href="/docs/Command/video_data" className="font-bold">
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
  );
};
var Accordion = () => {
  var [activeIndex, setActiveIndex] = react.useState(null);
  var onItemClick = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  var editClick = (event: any) => event.stopPropagation();
  var deleteClick = (event: any) => event.stopPropagation();
  var items = [
    {
      title: "Section 1",
      content: "Content of section 1...",
    },
    {
      title: "Section 2",
      content: "Content of section 2...",
    },
    {
      title: "Section 3",
      content: "Content of section 3...",
    },
  ];
  return (
    <div className="accordion mt-20">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <div
            className={`accordion-title flex justify-between items-center py-3 px-4 cursor-pointer ${
              index === activeIndex ? "bg-gray-200" : ""
            }`}
            onClick={() => onItemClick(index)}
          >
            <span>{item.title}</span>
            {index === activeIndex && (
              <div className="accordion-buttons flex">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  onClick={editClick}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={deleteClick}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div
            className={`accordion-content py-3 px-4 ${
              index === activeIndex ? "block" : "hidden"
            }`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function home() {
  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-900 scrollbar-neutral-900 scrollbar-thumb-red-600">
      <NavPackage />
      <Introduction />
      <Playground />
      <Documentation />
      <FootPackage />
    </main>
  );
}
