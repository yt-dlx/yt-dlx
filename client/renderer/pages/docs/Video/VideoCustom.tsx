import React from "react";
import { motion } from "framer-motion";
import NavPackage from "../../components/nav";
import { MdDescription } from "react-icons/md";
import FootPackage from "../../components/foot";
import { FaClipboardCheck } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { RiJavascriptFill } from "react-icons/ri";
import Introduction from "../../home/Introduction";

const FromLeftToRight = {
  initial: { opacity: 0, x: -100 },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};
const FromRightToLeft = {
  initial: { opacity: 0, x: 100 },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};
const AndBounce = {
  initial: { opacity: 0, y: -50 },
  whileInView: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, bounce: 0.3 },
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};

export default function AudioVideoHighest(): JSX.Element {
  return (
    <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-600 font-semibold">
      <NavPackage />
      <Introduction />
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-8 md:py-16 lg:py-24 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <motion.div className="inline-block rounded-3xl bg-red-600 text-neutral-900 cursor-not-allowed font-black px-3 py-1 text-sm">
                Viewing Documentation For:
              </motion.div>
              <motion.h2
                className="text-3xl font-black tracking-tighter sm:text-4xl lg:text-5xl text-red-600"
                {...FromLeftToRight}
              >
                YtDlx.VideoOnly.Single.Custom()
              </motion.h2>
              <motion.ul className="grid gap-2 py-4" {...AndBounce}>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  Downloads a YouTube video with custom resolution and optional
                  video filter.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  @param query - The YouTube video URL or ID or name.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  @param resolution - The desired resolution of the video.
                  options: 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p,
                  3072p, 4320p, 6480p, 8640p, 12000p.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  @param stream - (optional) Whether to return the FfmpegCommand
                  instead of downloading the video.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  @param verbose - (optional) Whether to log verbose output or
                  not.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  @param output - (optional) The output directory for the
                  processed files.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  @param filter - (optional) The video filter to apply.
                  Available options: invert, rotate90, rotate270, grayscale,
                  rotate180, flipVertical, flipHorizontal.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  @param onionTor - (optional) Whether to use Tor for the
                  download or not.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  @returns A Promise that resolves when the video has been
                  processed, unless `stream` is `true`, in which case it
                  resolves with an object containing the `ffmpeg` command and
                  the `filename`.
                </li>
              </motion.ul>
              <motion.div className="flex flex-wrap gap-2">
                <button
                  className="inline-flex h-10 items-center justify-center rounded-3xl border hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-4 md:px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => {
                    window.open(
                      "https://github.com/yt-dlx/yt-dlx/blob/main/config/examples/typescript/Video/single.custom.test.ts",
                      "_blank"
                    );
                  }}
                >
                  <BiLogoTypescript className="mr-2 h-5 w-5" />
                  Typescript Example
                </button>
                <button
                  className="inline-flex h-10 items-center justify-center rounded-3xl border hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-4 md:px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => {
                    window.open(
                      "https://github.com/yt-dlx/yt-dlx/blob/main/config/examples/javascript/Video/single.custom.test.js",
                      "_blank"
                    );
                  }}
                >
                  <RiJavascriptFill className="mr-2 h-5 w-5" />
                  Javascript Example
                </button>
                <button
                  className="inline-flex h-10 items-center justify-center rounded-3xl border hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-4 md:px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => {
                    window.open(
                      "https://github.com/yt-dlx/yt-dlx/blob/main/config/examples/ecmascript/Video/single.custom.test.mjs",
                      "_blank"
                    );
                  }}
                >
                  <MdDescription className="mr-2 h-5 w-5" />
                  EcmaScript Example
                </button>
              </motion.div>
            </div>
            <motion.img
              alt="logo"
              width={550}
              height={310}
              src="/eq.gif"
              {...FromRightToLeft}
              className="mx-auto aspect-video overflow-hidden rounded-3xl object-cover object-center w-full max-w-[550px] border-4 border-[#cd322d6e] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-red-600"
            />
          </div>
        </div>
      </motion.section>
      <FootPackage />
    </main>
  );
}
