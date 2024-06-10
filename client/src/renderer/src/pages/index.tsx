import react from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SiBun } from "react-icons/si";
import { HiFire } from "react-icons/hi";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { GoNumber } from "react-icons/go";
import { TbBrandNpm } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { MdAudioFile } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa6";
import { TbWorldSearch } from "react-icons/tb";
import { TbDiamondFilled } from "react-icons/tb";
import { SiFirefoxbrowser } from "react-icons/si";
import { SiGradleplaypublisher } from "react-icons/si";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

export default function HomePage(): JSX.Element {
  var [Query, setQuery] = react.useState<string>("");
  var [TubeSearch, setTubeSearch] = react.useState<any>(null);
  react.useEffect(() => {
    var search = (_event: Electron.IpcRendererEvent, result: any): void => {
      setTubeSearch(result);
    };
    window.electron.ipcRenderer.on("SearchGet", search);
    return () => {
      window.electron.ipcRenderer.on("SearchGet", search);
    };
  }, []);

  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-[#111111] scrollbar-track-[#111111] scrollbar-thumb-red-600">
      <react.Fragment>
        <section
          id="Introduction"
          className="flex flex-col items-center justify-center mt-20"
        >
          <div className="max-w-screen-2xl px-6 py-16 mx-auto space-y-12">
            <article className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl text-red-600 font-bold lg:text-9xl">
                  YT-DLX@12.4.0
                </h1>
              </div>
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
      <react.Fragment>
        <section
          id="Playground"
          className="flex flex-col items-center justify-center"
        >
          <form
            onSubmit={(event) => {
              setTubeSearch(null);
              event.preventDefault();
              window.electron.ipcRenderer.send("SearchSend", { query: Query });
            }}
            className="bg-stone-950 max-w-screen-2xl p-10 text-red-600 mx-auto my-8 rounded-2xl border-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600"
          >
            <h1 className="text-6xl mb-4 font-bold">Yt-Dlx PlayGround</h1>
            <h2 className="text-3xl font-bold text-red-600 mb-4 font-mono">
              Effortless Audio Video Downloader And Streamer!
            </h2>
            <p className="mb-8 italic text-white/60">
              Unlock the power of YT-DLX, the ultimate node.js toolkit for
              seamless audio and video downloading and streaming. Effortlessly
              handle various coding flavors, from TypeScript to CommonJS and
              ESM, ensuring 100% compatibility and comprehensive type safety.
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
                  // disabled={ApiSearch.isPending}
                  onChange={(e) => setQuery(e.target.value)}
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
                // disabled={ApiSearch.isPending}
                className="flex flex-row items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:ring-2 active:ring-red-500 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg w-full"
              >
                <TbWorldSearch size={20} className="mr-1 font-bold" />
                Search YouTube
              </button>
            </div>
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
                            to={`/videoId/${item.id}`}
                            className="relative group mb-4 duration-700 bg-[#111111] p-1 shadow-red-900 hover:shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] rounded-2xl border-2 border-red-600/40 hover:border-red-600 flex flex-col justify-between"
                          >
                            <div className="relative">
                              <img
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
      </react.Fragment>
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
                        to="/AudioHighest"
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
                      <a
                        href="/AudioLowest"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/AudioCustom"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/VideoHighest"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/VideoLowest"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/VideoCustom"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/AudioVideoHighest"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/AudioVideoLowest"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/AudioVideoCustom"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/video_data"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/search_videos"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/playlist_data"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/search_playlist"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/extract"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
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
                      <a
                        href="/list_formats"
                        className="text-white bg-red-900 hover:bg-red-800 btn btn-wide no-animation mt-4 font-mono"
                      >
                        check usage and example!
                      </a>
                    </div>
                    <hr />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </react.Fragment>
      <motion.footer
        id="Footer"
        className="pt-20 pb-6 flex flex-wrap items-baseline justify-center"
      >
        <span className="text-[#e73d75] text-3xl mr-2">
          Mixly <span className="text-[#C4C4C4] text-lg">&</span>{" "}
          <span className="text-red-600">Yt-Dlx</span>
        </span>
        <span className="mt-2 text-sm font-light text-[#C4C4C4]">
          Copyright © 2024
        </span>
      </motion.footer>
    </main>
  );
}
