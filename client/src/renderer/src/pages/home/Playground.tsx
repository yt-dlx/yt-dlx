import react from "react";
import { Link } from "react-router-dom";

import { HiFire } from "react-icons/hi";
import { GoNumber } from "react-icons/go";
import { TbWorldSearch } from "react-icons/tb";
import { TbDiamondFilled } from "react-icons/tb";
import { SiGradleplaypublisher } from "react-icons/si";

export default function Playground(): JSX.Element {
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

  return (
    <react.Fragment>
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
          className="bg-stone-950 max-w-screen-2xl p-10 text-red-600 mx-auto my-8 rounded-2xl border-4 border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] shadow-red-600"
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
              disabled={ApiSearch.isPending}
              className="flex flex-row items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:ring-2 active:ring-red-500 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg w-full"
            >
              <TbWorldSearch size={20} className="mr-1 font-bold" />
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
  );
}
