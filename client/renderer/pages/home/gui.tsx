import react from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiFire } from "react-icons/hi";
import Introduction from "./Introduction";
import { GoNumber } from "react-icons/go";
import NavPackage from "../components/nav";
import { TbWorldSearch } from "react-icons/tb";
import { TbDiamondFilled } from "react-icons/tb";
import { SiGradleplaypublisher } from "react-icons/si";

export default function Gui(): JSX.Element {
  var [Query, setQuery] = react.useState<string>("");
  var [TubeSearch, setTubeSearch] = react.useState<any>(null);
  react.useEffect(() => {
    window.ipc.on("search", (response: string) => setTubeSearch(response));
  }, []);

  return (
    <react.Fragment>
      <NavPackage />
      <Introduction />
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <form
            onSubmit={(event) => {
              setTubeSearch(null);
              event.preventDefault();
              window.ipc.send("search", { query: Query });
            }}
            className="bg-stone-950 max-w-screen-2xl p-10 text-[#CD322D] mx-auto my-8 rounded-2xl border-4 border-[#CD322D] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
          >
            <h1 className="text-6xl mb-4 font-bold">Yt-Dlx PlayGround</h1>
            <h2 className="text-3xl font-bold text-[#CD322D] mb-4">
              Effortless Audio Video Downloader And Streamer!
            </h2>
            <p className="mb-8 italic text-white">
              Unlock the power of YT-DLX, the ultimate node.js toolkit for
              seamless audio and video downloading and streaming. Effortlessly
              handle various coding flavors, from TypeScript to CommonJS and
              ESM, ensuring 100% compatibility and comprehensive type safety.
            </p>
            <div className="flex items-center gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="flex flex-row items-center justify-center label-text text-[#CD322D] text-sm">
                    <HiFire
                      size={20}
                      className="text-[#CD322D] animate-pulse"
                    />
                    option :
                    <span className="text-white">provide video name</span>
                  </span>
                  <span className="flex flex-row items-center justify-center label-text-alt text-[#CD322D] text-sm">
                    <HiFire
                      size={20}
                      className="text-[#CD322D] animate-pulse"
                    />
                    option :
                    <span className="text-white">provide video link</span>
                  </span>
                </div>
                <input
                  type="text"
                  value={Query}
                  placeholder="required"
                  onChange={(e) => setQuery(e.target.value)}
                  className="input input-bordered w-full rounded-2xl bg-neutral-800"
                />
                <div className="label">
                  <span className="flex flex-row items-center justify-center label-text-alt text-[#CD322D] text-sm">
                    <HiFire
                      size={20}
                      className="text-[#CD322D] animate-pulse"
                    />
                    option :<span className="text-white">provide video id</span>
                  </span>
                </div>
              </label>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex flex-row items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:ring-2 active:ring-red-500 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg w-full"
              >
                <TbWorldSearch size={20} className="mr-1 font-bold" />
                Search YouTube
              </button>
            </div>
            {TubeSearch && (
              <react.Fragment>
                <section className="px-4 mx-auto max-w-7xl">
                  <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 border-b-4 border-double border-[#CD322D] mb-10">
                    <div className="grid gap-10 row-gap-8 lg:grid-cols-5">
                      <div className="lg:col-span-2">
                        <a className="inline-block text-[#CD322D] transition-colors duration-200">
                          <p className="font-sans text-xl font-thin leading-none tracking-tight lg:text-4xl xl:text-5xl">
                            You've Searched For <br></br>
                            <span className="text-[#CD322D] text-6xl font-extrabold">
                              " {Query} "
                            </span>
                          </p>
                        </a>
                        <p className="mb-4 text-base text-white md:text-lg flex flex-row">
                          <GoNumber className="text-[#CD322D]" size={50} />{" "}
                          Found Total{" "}
                          <span className="text-[#CD322D] text-4xl">
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
                            href={`/home/${item.id}`}
                            className="relative group mb-4 duration-700 bg-[#111111] p-1 shadow-red-900 hover:shadow-[#CD322D] shadow-[0 0 20px rgba(255, 0, 0, 0.5)] rounded-2xl border-2 border-[#CD322D]/40 hover:border-[#CD322D] flex flex-col justify-between"
                          >
                            <div className="relative">
                              <img
                                alt="logo"
                                width={400}
                                height={400}
                                loading="lazy"
                                src={item.thumbnails[0].url}
                                className="object-cover w-full h-56 mb-5 bg-center rounded-t-2xl duration-700 group-hover:shadow-[#CD322D] shadow-[#CD322D]/40 shadow-[0_0_20px_rgba(255,0,0,0.5)] group-hover:blur-sm"
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <SiGradleplaypublisher
                                  className="text-[#CD322D] animate-spin"
                                  size={140}
                                />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                              <p className="mb-2 text-xs font-semibold tracking-wider text-[#CD322D] uppercase">
                                number :: {index}
                              </p>
                              <h2 className="mb-2 text-xl font-bold leading-snug text-[#CD322D]">
                                {item.title}
                              </h2>
                              <p className="mb-4 text-sm font-normal text-white">
                                {item.description}
                              </p>
                              <div className="flex items-center text-white">
                                <ul className="mb-3 list-disc ml-4 text-xs">
                                  <li>
                                    <span className="text-[#CD322D] text-sm">
                                      videoId:
                                    </span>{" "}
                                    {item.id}
                                  </li>
                                  <li>
                                    <span className="text-[#CD322D] text-sm">
                                      channelid:
                                    </span>{" "}
                                    {item.channelid}
                                  </li>
                                  <li>
                                    <span className="text-[#CD322D] text-sm">
                                      channelname:
                                    </span>{" "}
                                    {item.channelname}
                                  </li>
                                  <li>
                                    <span className="text-[#CD322D] text-sm">
                                      duration:
                                    </span>{" "}
                                    {item.duration}
                                  </li>
                                  <li>
                                    <span className="text-[#CD322D] text-sm">
                                      uploadDate:
                                    </span>{" "}
                                    {item.uploadDate}
                                  </li>
                                  <li>
                                    <span className="text-[#CD322D] text-sm">
                                      viewCount:
                                    </span>{" "}
                                    {item.viewCount}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-2 duration-700 group-hover:bg-[#CD322D]/60 bg-[#CD322D]/40 text-white/90 mt-0.5 w-full text-sm gap-1 rounded-b-xl">
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
        </div>
      </motion.section>
    </react.Fragment>
  );
}
