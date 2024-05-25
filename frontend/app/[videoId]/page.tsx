"use client";
import react from "react";
import { SiBun } from "react-icons/si";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { TbBrandNpm } from "react-icons/tb";
import NavPackage from "@/pages/components/nav";
import FootPackage from "@/pages/components/foot";
import VerPackage from "@/pages/components/version";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function home() {
  var { push } = useRouter();
  var { videoId }: any = useParams();
  var QueryClient = useQueryClient();
  var [TubeSearch, setTubeSearch] = react.useState<any>(null);
  var ApiSearch = useMutation({
    mutationFn: async () => {
      var resp = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      });
      if (resp.status === 200) setTubeSearch(await resp.json());
    },
    onMutate: () => console.log("ApiSearch started!"),
  });
  react.useEffect(() => {
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) push("/");
    else ApiSearch.mutate();
  }, [videoId]);

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
      {/* =================================[ Downloader ]=============================== */}
      <react.Fragment>
        {TubeSearch ? (
          <section className="flex flex-col items-center justify-center">
            <div className="max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
              <div className="max-w-screen-2xl">
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
              </div>
              <section className="flex flex-col items-center justify-center">
                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 bg-stone-950 border-4 border-red-600 border-double rounded-3xl shadow-red-600 duration-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                  <div className="overflow-x-auto">
                    <section className="max-w-screen-2xl px-6 mx-auto p-1">
                      <iframe
                        allowFullScreen
                        title="yt-dlx player"
                        className="w-full h-64 my-10 rounded-3xl md:h-80"
                        src={`https://www.youtube.com/embed/${TubeSearch.id}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      />
                      <h2 className="mt-6 text-4xl font-bold text-red-600">
                        {TubeSearch.title}
                      </h2>
                      <div className="mt-4 space-x-2 -mx-2 items-center justify-center flex">
                        <select className="select select-bordered w-full max-w-xs bg-stone-900">
                          <option disabled selected>
                            Get it as 'Audio Only'
                          </option>
                          <option
                            onClick={() => {
                              window.location.href = `/api/audio?videoId=${videoId}`;
                            }}
                          >
                            Highest
                          </option>
                          <option
                            onClick={() => {
                              window.location.href = `/api/audio?videoId=${videoId}`;
                            }}
                          >
                            Lowest
                          </option>
                        </select>
                        <select className="select select-bordered w-full max-w-xs bg-stone-900">
                          <option disabled selected>
                            Get it as 'Video Only'
                          </option>
                          <option
                            onClick={() => {
                              window.location.href = `/api/video?videoId=${videoId}`;
                            }}
                          >
                            Highest
                          </option>
                          <option
                            onClick={() => {
                              window.location.href = `/api/video?videoId=${videoId}`;
                            }}
                          >
                            Lowest
                          </option>
                        </select>
                        <select className="select select-bordered w-full max-w-xs bg-stone-900">
                          <option disabled selected>
                            Get it as 'Audio + Video'
                          </option>
                          <option
                            onClick={() => {
                              window.location.href = `/api/audio_video?videoId=${videoId}`;
                            }}
                          >
                            Highest
                          </option>
                          <option
                            onClick={() => {
                              window.location.href = `/api/audio_video?videoId=${videoId}`;
                            }}
                          >
                            Lowest
                          </option>
                        </select>
                      </div>
                      <p className="mt-6 text-xs text-red-600 items-center justify-center flex font-bold">
                        Effortless Audio-Video Downloading And Streaming Is
                        Provided Free Of Cost To You With The Power Of Yt-Dlx
                        Copyright © 2024
                      </p>
                      <p className="mt-2 leading-loose text-white/60 lowercase">
                        <span className="text-red-600 font-bold">
                          @description:{" "}
                        </span>
                        {TubeSearch.description}
                      </p>
                      <ul className="mt-2 text-white/60 list-disc p-6">
                        <li>
                          <span className="text-red-600 font-bold">
                            @videoId:
                          </span>{" "}
                          {TubeSearch.id}
                        </li>
                        <li>
                          <span className="text-red-600 font-bold">
                            @channelid:
                          </span>{" "}
                          {TubeSearch.channelid}
                        </li>
                        <li>
                          <span className="text-red-600 font-bold">
                            @channelname:
                          </span>{" "}
                          {TubeSearch.channelname}
                        </li>
                        <li>
                          <span className="text-red-600 font-bold">
                            @duration:
                          </span>{" "}
                          {TubeSearch.duration}
                        </li>
                        <li>
                          <span className="text-red-600 font-bold">
                            @uploadDate:
                          </span>{" "}
                          {TubeSearch.uploadDate}
                        </li>
                        <li>
                          <span className="text-red-600 font-bold">
                            @viewCount:
                          </span>{" "}
                          {TubeSearch.viewCount}
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </section>
        ) : (
          <section className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-4 w-96">
              <div className="skeleton bg-red-600 border-4 border-neutral-800/60 h-40 w-full shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
              <div className="skeleton bg-red-600 border-4 border-neutral-800/60 h-10 w-28 shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
              <div className="skeleton bg-red-600 border-4 border-neutral-800/60 h-10 w-full shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
              <div className="skeleton bg-red-600 border-4 border-neutral-800/60 h-10 w-full shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
            </div>
          </section>
        )}
      </react.Fragment>
      <FootPackage />
    </main>
  );
}
