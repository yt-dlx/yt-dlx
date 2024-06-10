import Link from "next/link";
import { motion } from "framer-motion";
import { IoBook } from "react-icons/io5";
import { FaQuora } from "react-icons/fa6";
import { TbPackages } from "react-icons/tb";
import { MdFileDownload } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";
import { TbHelpHexagonFilled } from "react-icons/tb";

export default function HomePage(): JSX.Element {
  return (
    <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-[#CD322D] font-semibold">
      <motion.section className="flex items-center justify-center border-b-8 border-t-8 border-double border-[#CD322D] w-full pt-12 md:pt-24 lg:pt-32 bg-neutral-950 text-white">
        <div className="container space-y-10 xl:space-y-16">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-[#CD322D]">
                Yt-Dlx: The Ultimate Multimedia Downloader
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Yt-Dlx is a powerful and versatile tool that allows you to
                download audio and video content from a wide range of sources,
                including YouTube, Vimeo, and many more.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#CD322D] px-8 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                <MdFileDownload className="mr-2 h-5 w-5" />
                Get Started
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-neutral-950 bg-black px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                <TbPackages className="mr-2 h-5 w-5" />
                Install on npm
              </Link>
            </div>
          </div>
          <img
            alt="logo"
            width={1200}
            height={300}
            src="/youtube.gif"
            className="mx-auto aspect-[3/1] cursor-none overflow-hidden rounded-t-2xl object-cover object-center border-t-4 border-r-4 border-l-4 border-[#CD322D] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
          />
        </div>
      </motion.section>
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#CD322D] w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-2xl bg-neutral-950 px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-black tracking-tighter sm:text-7xl text-[#CD322D]">
                  Powerful Multimedia Downloading
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Yt-Dlx allows you to download audio and video content from a
                  wide range of sources, including YouTube, Vimeo, and many
                  more. With its advanced capabilities, you can customize the
                  download format, resolution, and more.
                </p>
              </div>
              <ul className="grid gap-2 py-4">
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Download audio and video from diverse sources
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Customize download format, resolution, and more
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Supports a wide range of media formats
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Seamless integration with Node.js and other environments
                </li>
              </ul>
            </div>
            <img
              alt="logo"
              width={550}
              height={310}
              src="/YouTube_Circle.gif"
              className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full border-4 border-[#CD322D] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
            />
          </div>
        </div>
      </motion.section>
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#CD322D] w-full py-12 md:py-24 lg:py-32 bg-neutral-950 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <img
              alt="logo"
              width={550}
              height={310}
              src="/YouTube_Music.gif"
              className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full border-4 border-[#CD322D] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-2xl bg-neutral-950 px-3 py-1 text-sm">
                  Documentation
                </div>
                <h2 className="text-3xl font-black tracking-tighter sm:text-7xl text-[#CD322D]">
                  Comprehensive API Documentation
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our detailed API documentation to learn how to
                  leverage Yt-Dlx's powerful features. From downloading media to
                  customizing the output, our docs have you covered.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#CD322D] px-8 text-sm font-medium text-white shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D] transition-colors hover:bg-[#CC0000] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <IoBook className="mr-2 h-5 w-5" />
                  View Docs
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-2xl border border-neutral-950 bg-black px-8 text-sm font-medium shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D] transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <TbHelpHexagonFilled className="mr-2 h-5 w-5" />
                  Troubleshooting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#CD322D] w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-2xl bg-black px-3 py-1 text-sm">
                  Support
                </div>
                <h2 className="text-3xl font-black tracking-tighter sm:text-5xl text-[#CD322D]">
                  Get Help and Support
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  If you encounter any issues or have questions about Yt-Dlx,
                  our support team is here to help. Check out our
                  troubleshooting guides, FAQs, and contact us for personalized
                  assistance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#CD322D] px-8 text-sm font-medium text-white shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D] transition-colors hover:bg-[#CC0000] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <RiContactsBookFill className="mr-2 h-5 w-5" />
                  Contact Support
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-2xl border border-neutral-950 bg-black px-8 text-sm font-medium shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D] transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <FaQuora className="mr-2 h-5 w-5" />
                  FAQs
                </Link>
              </div>
            </div>
            <img
              src="/logo.png"
              width="550"
              height="310"
              alt="Support"
              className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full border-4 border-[#CD322D] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
            />
          </div>
        </div>
      </motion.section>
    </main>
  );
}
// =========================================================================================================================================================
// import NavPackage from "./components/nav";
// import Playground from "./home/Playground";
// import FootPackage from "./components/foot";
// import Introduction from "./home/Introduction";
// import Documentation from "./home/Documentation";
// export default function HomePage(): JSX.Element {
// return (
// <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-[#111111] scrollbar-track-[#111111] scrollbar-thumb-[#CD322D]">
// <NavPackage />
// <Introduction />
// <Playground />
// <Documentation />
// <FootPackage />
// </main>
// );
// }
// =========================================================================================================================================================
