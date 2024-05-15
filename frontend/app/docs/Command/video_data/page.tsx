import { SiBun } from "react-icons/si";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { TbBrandNpm } from "react-icons/tb";
import NavPackage from "@/pages/components/nav";
import FootPackage from "@/pages/components/foot";
import VerPackage from "@/pages/components/version";

export default function AwesomePackage({ param }: any) {
  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-900 scrollbar-neutral-900 scrollbar-thumb-red-600">
      <NavPackage />
      <section className="flex flex-col items-center justify-center mt-20">
        <div className="max-w-screen-2xl px-6 py-16 mx-auto space-y-12">
          <article className="space-y-8">
            <VerPackage />
            <p className="text-white/80">
              Uncover an unparalleled solution for effortless audio and video
              downloads powered by YT-DLX - An advanced{" "}
              <span className="text-red-600">
                (command-line + Node.js + Streaming)
              </span>{" "}
              tool meticulously designed for avid enthusiasts. YT-DLX stands out
              as a feature-rich advanced package built upon the foundation of{" "}
              <span className="text-red-600">(Youtube-DL & Python yt-dlx)</span>
              , consistently evolving with state-of-the-art functionalities.
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
                Install now using any package manager of your choice!
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

      <section className="flex flex-col items-center justify-center">
        <div className="max-w-screen-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-screen-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl text-red-600">
              Viewing YtDlx.ytSearch.Video.Single()
            </h2>
            <p className="mt-4 text-white/80">
              yt-dlx accommodates various node.js coding flavours!{" "}
              <span className="text-red-600">(typescript), (commonjs),</span>{" "}
              and <span className="text-red-600">(esm)</span>, ensuring 100%
              compatibility and comprehensive type safety coverage.
            </p>
            <ul className="list-disc m-4 bg-neutral-800/40 shadow-black shadow-2xl p-8 rounded-3xl border border-dashed border-red-600">
              <li>
                Fetches data for a single YouTube video based on the video ID or
                link.
              </li>
              <li>@param query - The YouTube video URL or ID or name.</li>
              <li>
                @returns A Promise that resolves with the metadata for the
                single video.
              </li>
              <li>
                @throws An error if the input is an incorrect video link or if
                unable to get a response.
              </li>
            </ul>
            <section className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
              <div className="grid grid-cols-1">
                <div className="w-full max-w-lg mx-auto my-4 bg-neutral-800 shadow-xl rounded-xl">
                  <img
                    alt="team"
                    src="/ts.png"
                    className="flex-shrink-0 object-cover object-center w-16 h-16 mx-auto -mt-8 rounded-full shadow-xl aboslute"
                  />
                  <div className="p-6 lg:text-center">
                    <h4 className="mt-8 text-2xl font-semibold leading-none tracking-tighter text-red-600 lg:text-3xl">
                      TypeScript
                    </h4>
                    <p className="mt-3 text-base leading-relaxed text-white/80">
                      A superset of JavaScript that adds optional static typing
                      and other features to enhance code maintainability and
                      scalability. It compiles down to plain JavaScript and is
                      widely adopted for large-scale applications due to its
                      ability to catch errors during development.
                      <br />
                      <span className="font-black text-red-600 text-xl">
                        import ytdlx from "yt-dlx";
                      </span>
                    </p>
                    <div className="mt-6">
                      <a
                        href="https://github.com/yt-dlx/yt-dlx/blob/main/examples/typescript/Command/video_data.test.ts"
                        className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-red-900 rounded-xl hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        View profile
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-lg mx-auto my-4 bg-neutral-800 shadow-xl rounded-xl">
                  <img
                    alt="team"
                    src="/js.png"
                    className="flex-shrink-0 object-cover object-center w-16 h-16 mx-auto -mt-8 rounded-full shadow-xl aboslute"
                  />
                  <div className="p-6 lg:text-center">
                    <h4 className="mt-8 text-2xl font-semibold leading-none tracking-tighter text-red-600 lg:text-3xl">
                      JavaScript
                    </h4>
                    <p className="mt-3 text-base leading-relaxed text-white/80">
                      A versatile, high-level programming language primarily
                      used for web development, enabling dynamic and interactive
                      content on websites. It's supported by all modern web
                      browsers and can be used for both front-end and back-end
                      development.
                      <br />
                      <span className="font-black text-red-600 text-xl">
                        const ytdlx = require("yt-dlx");
                      </span>
                    </p>
                    <div className="mt-6">
                      <a
                        href="https://github.com/yt-dlx/yt-dlx/blob/main/examples/javascript/Command/video_data.test.js"
                        className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-red-900 rounded-xl hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        View profile
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-lg mx-auto my-4 bg-neutral-800 shadow-xl rounded-xl">
                  <img
                    alt="team"
                    src="/esm.png"
                    className="flex-shrink-0 object-cover object-center w-16 h-16 mx-auto -mt-8 rounded-full shadow-xl aboslute"
                  />
                  <div className="p-6 lg:text-center">
                    <h4 className="mt-8 text-2xl font-semibold leading-none tracking-tighter text-red-600 lg:text-3xl">
                      ECMAScript
                    </h4>
                    <p className="mt-3 text-base leading-relaxed text-white/80">
                      The standardized specification for JavaScript, defining
                      the syntax, semantics, and behavior of the language.
                      JavaScript is the most popular implementation of
                      ECMAScript, and new versions are regularly released to add
                      features and improve the language.
                      <br />
                      <span className="font-black text-red-600 text-xl">
                        import ytdlx from "yt-dlx";
                      </span>
                    </p>
                    <div className="mt-6">
                      <a
                        href="https://github.com/yt-dlx/yt-dlx/blob/main/examples/ecmascript/Command/video_data.test.mjs"
                        className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-red-900 rounded-xl hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        View profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <FootPackage />
    </main>
  );
}
