"use client";
import React from "react";
import { motion } from "framer-motion";
import NavPackage from "@/components/nav";
import Introduction from "@/app/home/page";
import FootPackage from "@/components/foot";
import { MdDescription } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { RiJavascriptFill } from "react-icons/ri";
const FromRightToLeft = { initial: { opacity: 0, x: 100 }, exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }, whileInView: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
const FromLeftToRight = { initial: { opacity: 0, x: -100 }, exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }, whileInView: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
const AndBounce = { initial: { opacity: 0, y: -50 }, whileInView: { y: 0, opacity: 1, transition: { duration: 0.8, bounce: 0.3 } }, exit: { opacity: 0, y: -50, transition: { duration: 0.3 } } };
export default function AudioHighest() {
  return (
    <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-700 font-semibold">
      <NavPackage />
      <div className="w-full px-4 py-8 md:px-6">
        <Introduction />
      </div>
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-8 md:py-16 lg:py-24 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <motion.div className="inline-block rounded-3xl bg-red-700 text-neutral-900 cursor-not-allowed font-black px-3 py-1 text-sm"> Viewing Documentation For: </motion.div>
              <motion.h2 className="text-3xl font-black tracking-tighter sm:text-4xl lg:text-5xl text-red-700" {...FromLeftToRight}>
                YtDlx.Audio.Highest()
              </motion.h2>
              <motion.ul className="grid gap-2 py-4" {...AndBounce}>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> Downloads or streams the highest quality audio from YouTube.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @param options - An object containing the configuration options.
                </li>
                <ul className="grid gap-2 pl-6">
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @param options.query - The search query or video URL. <strong>Required</strong>.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @param options.output - (optional) The directory to save the output file. Cannot be used with{" "}
                    <code>metadata: true</code>.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @param options.useTor - (optional) Whether to use Tor.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @param options.stream - (optional) Whether to stream the output. Cannot be used with{" "}
                    <code>metadata: true</code>.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @param options.verbose - (optional) Enable verbose logging.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @param options.metadata - (optional) Only fetch metadata. Cannot be used with <code>output</code>,{" "}
                    <code>stream</code>, or <code>filter</code>.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @param options.filter - (optional) An audio filter to apply. Cannot be used with <code>metadata: true</code>
                    . Available: &quot;echo&quot;, &quot;slow&quot;, &quot;speed&quot;, &quot;phaser&quot;, &quot;flanger&quot;, &quot;panning&quot;, &quot;reverse&quot;, &quot;vibrato&quot;,
                    &quot;subboost&quot;, &quot;surround&quot;, &quot;bassboost&quot;, &quot;nightcore&quot;, &quot;superslow&quot;, &quot;vaporwave&quot;, &quot;superspeed&quot;.
                  </li>
                </ul>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> @returns An EventEmitter instance for handling events during the audio processing.
                </li>
                <ul className="grid gap-2 pl-6">
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> Emits &quot;start&quot;: FFmpeg command started.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> Emits &quot;progress&quot;: Download/stream progress.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> Emits &quot;end&quot;: Process complete (path or stream path).
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> Emits &quot;metadata&quot; (if <code>metadata: true</code>): Video metadata, highest audio format details,
                    suggested filename.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> Emits &quot;stream&quot; (if <code>stream: true</code>): Streamable filename/path and FFmpeg instance.
                  </li>
                  <li>
                    <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> Emits &quot;error&quot;: Error occurred.
                  </li>
                </ul>
              </motion.ul>
              <motion.div className="flex flex-wrap gap-2">
                <button
                  className="inline-flex h-10 items-center justify-center rounded-3xl border hover:border-neutral-900 text-red-700 font-black border-red-700/50 bg-neutral-900 hover:bg-red-700 hover:text-neutral-900 px-4 md:px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700 disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => {
                    window.open("https://github.com/yt-dlx/yt-dlx/blob/main/config/examples/typescript/Audio/highest.test.ts", "_blank");
                  }}>
                  <BiLogoTypescript className="mr-2 h-5 w-5" /> Typescript Examples
                </button>
                <button
                  className="inline-flex h-10 items-center justify-center rounded-3xl border hover:border-neutral-900 text-red-700 font-black border-red-700/50 bg-neutral-900 hover:bg-red-700 hover:text-neutral-900 px-4 md:px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700 disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => {
                    window.open("https://github.com/yt-dlx/yt-dlx/blob/main/config/examples/javascript/Audio/highest.test.js", "_blank");
                  }}>
                  <RiJavascriptFill className="mr-2 h-5 w-5" /> Javascript Examples
                </button>
                <button
                  className="inline-flex h-10 items-center justify-center rounded-3xl border hover:border-neutral-900 text-red-700 font-black border-red-700/50 bg-neutral-900 hover:bg-red-700 hover:text-neutral-900 px-4 md:px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700 disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => {
                    window.open("https://github.com/yt-dlx/yt-dlx/blob/main/config/examples/ecmascript/Audio/highest.test.mjs", "_blank");
                  }}>
                  <MdDescription className="mr-2 h-5 w-5" /> EcmaScript Examples
                </button>
              </motion.div>
            </div>
            <motion.img
              alt="Audio Equalizer Visualization"
              width={550}
              height={310}
              src="/eq.gif"
              {...FromRightToLeft}
              className="mx-auto aspect-video overflow-hidden rounded-3xl object-cover object-center w-full max-w-[550px] border-4 border-[#cd322d6e] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-red-700"
            />
          </div>
        </div>
      </motion.section>
      <FootPackage />
    </main>
  );
}
