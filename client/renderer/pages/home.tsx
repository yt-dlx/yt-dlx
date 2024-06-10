import React from "react";
import AndBounce from "./anim/home";
import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";
import NavPackage from "./components/nav";
import FromBottomToTop from "./anim/home";
import FromTopToBottom from "./anim/home";
import FromLeftToRight from "./anim/home";
import FromRightToLeft from "./anim/home";
import { HiSupport } from "react-icons/hi";
import { TbBrandNpm } from "react-icons/tb";
import FootPackage from "./components/foot";
import NpmModel from "./home/models/NpmModel";
import BunModel from "./home/models/BunModel";
import { SiBun, SiPnpm } from "react-icons/si";
import YarnModel from "./home/models/YarnModel";
import PnpmModel from "./home/models/PnpmModel";
import { HiFolderDownload } from "react-icons/hi";
import { RiContactsBookFill } from "react-icons/ri";
import { TbHelpHexagonFilled } from "react-icons/tb";
import { FaYarn, FaClipboardCheck } from "react-icons/fa";
// ===============================================================================
export default function HomePage(): JSX.Element {
  const [ShowYarn, setShowYarn] = React.useState(false);
  const [ShowPnpm, setShowPnpm] = React.useState(false);
  const [ShowNpm, setShowNpm] = React.useState(false);
  const [ShowBun, setShowBun] = React.useState(false);
  const ToggleYarn = () => setShowYarn(!ShowYarn);
  const TogglePnpm = () => setShowPnpm(!ShowPnpm);
  const ToggleNpm = () => setShowNpm(!ShowNpm);
  const ToggleBun = () => setShowBun(!ShowBun);

  return (
    <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-[#CD322D] font-semibold">
      <NavPackage />
      {/* =================================================================[ Introduction ]=============================================== */}
      <motion.section
        id="Introduction"
        className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full pt-12 md:pt-24 lg:pt-32 bg-neutral-950 text-white"
      >
        <div className="container space-y-10 xl:space-y-16">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <motion.h1
                className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-[#CD322D]"
                {...FromTopToBottom}
              >
                Yt-Dlx: The Ultimate Multimedia Downloader
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-white md:text-xl"
                {...FromTopToBottom}
              >
                Yt-Dlx is a powerful and versatile tool that allows you to
                download audio and video content from a wide range of sources,
                including YouTube, Vimeo, and many more.
              </motion.p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={ToggleNpm}
                className="inline-flex h-10 items-center justify-center rounded-2xl border hover:border-neutral-900 text-[#CD322D] font-black border-[#CD322D]/50 bg-neutral-900 hover:bg-[#CD322D] hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
              >
                <TbBrandNpm className="mr-2 h-5 w-5" />
                Install Using Npm
              </button>
              <button
                onClick={ToggleYarn}
                className="inline-flex h-10 items-center justify-center rounded-2xl border hover:border-neutral-900 text-[#CD322D] font-black border-[#CD322D]/50 bg-neutral-900 hover:bg-[#CD322D] hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
              >
                <FaYarn className="mr-2 h-5 w-5" />
                Install Using Yarn
              </button>
              <button
                onClick={TogglePnpm}
                className="inline-flex h-10 items-center justify-center rounded-2xl border hover:border-neutral-900 text-[#CD322D] font-black border-[#CD322D]/50 bg-neutral-900 hover:bg-[#CD322D] hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
              >
                <SiPnpm className="mr-2 h-5 w-5" />
                Install Using Pnpm
              </button>
              <button
                onClick={ToggleBun}
                className="inline-flex h-10 items-center justify-center rounded-2xl border hover:border-neutral-900 text-[#CD322D] font-black border-[#CD322D]/50 bg-neutral-900 hover:bg-[#CD322D] hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
              >
                <SiBun className="mr-2 h-5 w-5" />
                Install Using Bun
              </button>
            </div>
          </div>
          <motion.img
            alt="logo"
            width={1200}
            height={300}
            src="/youtube.gif"
            {...FromBottomToTop}
            className="mx-auto aspect-[3/1] cursor-none overflow-hidden rounded-t-2xl object-cover object-center border-t-4 border-r-4 border-l-4 border-[#cd322d6e] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
          />
        </div>
      </motion.section>
      {/* =================================================================[ Playground ]==================================================== */}
      <motion.section
        id="Playground"
        className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-12 md:py-24 lg:py-32 bg-black text-white"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.div
                  className="inline-block rounded-2xl bg-[#CD322D] text-neutral-900 cursor-not-allowed font-black px-3 py-1 text-sm"
                  {...FromLeftToRight}
                >
                  Key Features
                </motion.div>
                <motion.h2
                  className="text-3xl font-black tracking-tighter sm:text-7xl text-[#CD322D]"
                  {...FromLeftToRight}
                >
                  Powerful Multimedia Downloading
                </motion.h2>
                <motion.p
                  className="max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  {...FromLeftToRight}
                >
                  Yt-Dlx allows you to download audio and video content from a
                  wide range of sources, including YouTube, Vimeo, and many
                  more. With its advanced capabilities, you can customize the
                  download format, resolution, and more.
                </motion.p>
              </div>
              <motion.ul className="grid gap-2 py-4" {...AndBounce}>
                <motion.li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Download audio and video from diverse sources
                </motion.li>
                <motion.li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Customize download format, resolution, and more
                </motion.li>
                <motion.li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Supports a wide range of media formats
                </motion.li>
                <motion.li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Seamless integration with Node.js and other environments
                </motion.li>
              </motion.ul>
              <button className="inline-flex h-10 items-center justify-center rounded-2xl border hover:border-neutral-900 text-[#CD322D] font-black border-[#CD322D]/50 bg-neutral-900 hover:bg-[#CD322D] hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50">
                <HiFolderDownload className="mr-2 h-5 w-5" />
                Try Yt-Dlx in Graphical User Interface mode
              </button>
            </div>
            <motion.img
              alt="logo"
              width={550}
              height={310}
              src="/YouTube_Circle.gif"
              {...FromRightToLeft}
              className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full border-4 border-[#cd322d6e] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
            />
          </div>
        </div>
      </motion.section>
      {/* =================================================================[ Documentation ]=============================================== */}
      <motion.section
        id="Documentation"
        className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-12 md:py-24 lg:py-32 bg-neutral-950 text-white"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <motion.img
              alt="logo"
              width={550}
              height={310}
              src="/YouTube_Music.gif"
              {...FromLeftToRight}
              className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full border-4 border-[#cd322d6e] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.div
                  className="inline-block rounded-2xl bg-[#CD322D] text-neutral-900 cursor-not-allowed font-black px-3 py-1 text-sm"
                  {...FromRightToLeft}
                >
                  Documentation
                </motion.div>
                <motion.h2
                  className="text-3xl font-black tracking-tighter sm:text-7xl text-[#CD322D]"
                  {...FromRightToLeft}
                >
                  Comprehensive Guides
                </motion.h2>
                <motion.p
                  className="max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  {...FromRightToLeft}
                >
                  Our extensive documentation provides detailed guides and
                  tutorials to help you get the most out of Yt-Dlx. Whether
                  you're a beginner or an advanced user, you'll find everything
                  you need to know about installation, usage, and more.
                </motion.p>
              </div>
              <motion.ul className="grid gap-2 py-4" {...AndBounce}>
                <motion.li>
                  <RiContactsBookFill className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Detailed installation instructions
                </motion.li>
                <motion.li>
                  <RiContactsBookFill className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Usage examples and best practices
                </motion.li>
                <motion.li>
                  <RiContactsBookFill className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  API reference and advanced configurations
                </motion.li>
                <motion.li>
                  <RiContactsBookFill className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Troubleshooting and FAQs
                </motion.li>
              </motion.ul>
              <button className="inline-flex h-10 items-center justify-center rounded-2xl border hover:border-neutral-900 text-[#CD322D] font-black border-[#CD322D]/50 bg-neutral-900 hover:bg-[#CD322D] hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50">
                <FaBook className="mr-2 h-5 w-5" />
                Checkout Usage Documentations for Yt-Dlx
              </button>
            </div>
          </div>
        </div>
      </motion.section>
      {/* =================================================================[ Support ]===================================================== */}
      <motion.section
        id="Support"
        className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-12 md:py-24 lg:py-32 bg-black text-white"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.div
                  className="inline-block rounded-2xl bg-[#CD322D] text-neutral-900 cursor-not-allowed font-black px-3 py-1 text-sm"
                  {...FromLeftToRight}
                >
                  Support
                </motion.div>
                <motion.h2
                  className="text-3xl font-black tracking-tighter sm:text-7xl text-[#CD322D]"
                  {...FromLeftToRight}
                >
                  We're Here to Help
                </motion.h2>
                <motion.p
                  className="max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  {...FromLeftToRight}
                >
                  If you have any questions or need assistance, our support team
                  is here to help. We provide comprehensive support to ensure
                  you have the best experience with Yt-Dlx.
                </motion.p>
              </div>
              <motion.ul className="grid gap-2 py-4" {...AndBounce}>
                <motion.li>
                  <TbHelpHexagonFilled className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  24/7 customer support
                </motion.li>
                <motion.li>
                  <TbHelpHexagonFilled className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Community forums and knowledge base
                </motion.li>
                <motion.li>
                  <TbHelpHexagonFilled className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Regular updates and improvements
                </motion.li>
                <motion.li>
                  <TbHelpHexagonFilled className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Contact us via email or live chat
                </motion.li>
              </motion.ul>
              <button className="inline-flex h-10 items-center justify-center rounded-2xl border hover:border-neutral-900 text-[#CD322D] font-black border-[#CD322D]/50 bg-neutral-900 hover:bg-[#CD322D] hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50">
                <HiSupport className="mr-2 h-5 w-5" />
                Create an Issue in Here
              </button>
            </div>
            <motion.img
              alt="logo"
              width={550}
              height={310}
              src="/YouTube_Support.gif"
              {...FromRightToLeft}
              className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full border-4 border-[#cd322d6e] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
            />
          </div>
        </div>
      </motion.section>
      {/* =================================================================[ Footer ]====================================================== */}
      <FootPackage />
      {/* =================================================================[ Modal ]======================================================= */}
      <YarnModel isOpen={ShowYarn} onClose={ToggleYarn} />
      <PnpmModel isOpen={ShowPnpm} onClose={TogglePnpm} />
      <NpmModel isOpen={ShowNpm} onClose={ToggleNpm} />
      <BunModel isOpen={ShowBun} onClose={ToggleBun} />
    </main>
  );
}
