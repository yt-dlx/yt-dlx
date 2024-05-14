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
  const { push } = useRouter();
  const { videoId }: any = useParams();
  const QueryClient = useQueryClient();
  const [TubeSearch, setTubeSearch] = react.useState<any>(null);
  const ApiSearch = useMutation({
    mutationFn: async () => {
      const resp = await fetch("/api/search", {
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

  const Introduction = () => {
    return (
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
    );
  };

  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-900 scrollbar-neutral-900 scrollbar-thumb-red-600">
      <NavPackage />
      <Introduction />
      {TubeSearch && (
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
            <section className="flex flex-col items-center justify-center">
              <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 bg-red-950/10 border-4 border-red-600 border-double rounded-3xl shadow-red-600 duration-500 shadow-2xl">
                <div className="overflow-x-auto">
                  <section className="max-w-screen-2xl px-6 py-8 mx-auto p-4">
                    <div className="mt-8">
                      <iframe
                        allowFullScreen
                        title="yt-dlx player"
                        src={`https://www.youtube.com/embed/${TubeSearch.id}`}
                        className="w-full h-64 my-10 rounded-3xl md:h-80 shadow-2xl shadow-red-800"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      />
                      <h2 className="mt-6 text-4xl font-bold text-red-600">
                        {TubeSearch.title}
                      </h2>
                      <p className="mt-2 leading-loose text-white/80 lowercase">
                        <span className="text-red-600 font-bold">
                          @description:{" "}
                        </span>
                        {TubeSearch.description}
                      </p>
                      <ul className="mt-2 text-white/80 list-disc">
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
                    </div>
                    <div className="mt-8">
                      <div className="mt-4 space-y-2 -mx-2">
                        <button
                          onClick={() => {
                            window.location.href = `/api/audio?videoId=${videoId}`;
                          }}
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm overflow-hidden text-white duration-300 bg-red-900 hover:bg-red-700 rounded-3xl shadow-black shadow-2xl hover:shadow-red-900 hover:scale-105 duration300 transition-transform sm:w-auto sm:mx-2 cursor-pointer"
                        >
                          Get it as 'Audio Only'
                        </button>
                        <button
                          onClick={() => {
                            window.location.href = `/api/video?videoId=${videoId}`;
                          }}
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm overflow-hidden text-white duration-300 bg-red-900 hover:bg-red-700 rounded-3xl shadow-black shadow-2xl hover:shadow-red-900 hover:scale-105 duration300 transition-transform sm:w-auto sm:mx-2 cursor-pointer"
                        >
                          Get it as 'Video Only'
                        </button>
                        <button
                          onClick={() => {
                            window.location.href = `/api/audio_video?videoId=${videoId}`;
                          }}
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm overflow-hidden text-white duration-300 bg-red-900 hover:bg-red-700 rounded-3xl shadow-black shadow-2xl hover:shadow-red-900 hover:scale-105 duration300 transition-transform sm:w-auto sm:mx-2 cursor-pointer"
                        >
                          Get it as 'Audio + Video'
                        </button>
                      </div>
                      <p className="mt-6 text-xs text-red-600 items-center justify-center flex font-bold">
                        Effortless Audio-Video Downloading And Streaming Is
                        Provided Free Of Cost To You With The Power Of Yt-Dlx
                        Copyright © 2024
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
      <FootPackage />
    </main>
  );
}
