// import NavPackage from "./components/nav";
// import Playground from "./home/Playground";
// import FootPackage from "./components/foot";
// import Introduction from "./home/Introduction";
// import Documentation from "./home/Documentation";

// export default function HomePage(): JSX.Element {
// return (
// <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-[#111111] scrollbar-track-[#111111] scrollbar-thumb-red-600">
// <NavPackage />
// <Introduction />
// <Playground />
// <Documentation />
// <FootPackage />
// </main>
// );
// }

import react from "react";
import Link from "next/link";
import Image from "next/image";
import { IoBook } from "react-icons/io5";
import { FaQuora } from "react-icons/fa6";
import { TbPackages } from "react-icons/tb";
import { MdFileDownload } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";
import { TbHelpHexagonFilled } from "react-icons/tb";

export default function HomePage(): JSX.Element {
  return (
    <react.Fragment>
      <div className="flex flex-col min-h-[100dvh]">
        <header className="px-4 lg:px-6 h-14 flex items-center bg-[#282828] text-white">
          <Link
            href="#"
            className="flex items-center justify-center"
            prefetch={false}
          >
            <MdFileDownload className="h-6 w-6" />
            <span className="sr-only">Yt-Dlx</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Usage
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Docs
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Support
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y bg-[#282828] text-white">
            <div className="container space-y-10 xl:space-y-16">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#FF0000]">
                    Yt-Dlx: The Ultimate Multimedia Downloader
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                    Yt-Dlx is a powerful and versatile tool that allows you to
                    download audio and video content from a wide range of
                    sources, including YouTube, Vimeo, and many more.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#FF0000] px-8 text-sm font-medium text-white shadow-2xl transition-colors hover:bg-[#CC0000] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    <MdFileDownload className="mr-2 h-5 w-5" />
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#333333] bg-[#282828] px-8 text-sm font-medium shadow-2xl transition-colors hover:bg-[#333333] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    <TbPackages className="mr-2 h-5 w-5" />
                    Install on npm
                  </Link>
                </div>
              </div>
              <Image
                alt="logo"
                width={1200}
                height={300}
                src="/logo.png"
                className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover object-center border-2 border-[#FF0000] shadow-2xl"
              />
            </div>
          </section>
          <section
            className="w-full py-12 md:py-24 lg:py-32 bg-[#282828] text-white"
            id="features"
          >
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-[#333333] px-3 py-1 text-sm">
                      Key Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#FF0000]">
                      Powerful Multimedia Downloading
                    </h2>
                    <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Yt-Dlx allows you to download audio and video content from
                      a wide range of sources, including YouTube, Vimeo, and
                      many more. With its advanced capabilities, you can
                      customize the download format, resolution, and more.
                    </p>
                  </div>
                  <ul className="grid gap-2 py-4">
                    <li>
                      <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#FF0000]" />
                      Download audio and video from diverse sources
                    </li>
                    <li>
                      <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#FF0000]" />
                      Customize download format, resolution, and more
                    </li>
                    <li>
                      <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#FF0000]" />
                      Supports a wide range of media formats
                    </li>
                    <li>
                      <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#FF0000]" />
                      Seamless integration with Node.js and other environments
                    </li>
                  </ul>
                </div>
                <Image
                  alt="logo"
                  width={550}
                  height={310}
                  src="/logo.png"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full border-2 border-[#FF0000] shadow-2xl"
                />
              </div>
            </div>
          </section>
          <section
            className="w-full py-12 md:py-24 lg:py-32 bg-[#333333] text-white"
            id="usage"
          >
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <Image
                  alt="logo"
                  width={550}
                  height={310}
                  src="/logo.png"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full border-2 border-[#FF0000] shadow-2xl"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-[#282828] px-3 py-1 text-sm">
                      Usage
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#FF0000]">
                      Seamless Integration and Usage
                    </h2>
                    <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Yt-Dlx is designed to be easy to use and integrate into
                      your projects. Follow our step-by-step guides to install
                      the npm package and start downloading multimedia content
                      with just a few lines of code.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-[#FF0000] px-8 text-sm font-medium text-white shadow-2xl transition-colors hover:bg-[#CC0000] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <TbPackages className="mr-2 h-5 w-5" />
                      Install on npm
                    </Link>
                    <Link
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-[#333333] bg-[#282828] px-8 text-sm font-medium shadow-2xl transition-colors hover:bg-[#333333] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <IoBook className="mr-2 h-5 w-5" />
                      Usage Guide
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="w-full py-12 md:py-24 lg:py-32 bg-[#282828] text-white"
            id="docs"
          >
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-[#333333] px-3 py-1 text-sm">
                      Documentation
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#FF0000]">
                      Comprehensive API Documentation
                    </h2>
                    <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Explore our detailed API documentation to learn how to
                      leverage Yt-Dlx's powerful features. From downloading
                      media to customizing the output, our docs have you
                      covered.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-[#FF0000] px-8 text-sm font-medium text-white shadow-2xl transition-colors hover:bg-[#CC0000] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <IoBook className="mr-2 h-5 w-5" />
                      View Docs
                    </Link>
                    <Link
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-[#333333] bg-[#282828] px-8 text-sm font-medium shadow-2xl transition-colors hover:bg-[#333333] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <TbHelpHexagonFilled className="mr-2 h-5 w-5" />
                      Troubleshooting
                    </Link>
                  </div>
                </div>
                <Image
                  alt="logo"
                  width={550}
                  height={310}
                  src="/logo.png"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full border-2 border-[#FF0000] shadow-2xl"
                />
              </div>
            </div>
          </section>
          <section
            className="w-full py-12 md:py-24 lg:py-32 bg-[#333333] text-white"
            id="support"
          >
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <Image
                  src="/logo.png"
                  width="550"
                  height="310"
                  alt="Support"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full border-2 border-[#FF0000] shadow-2xl"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-[#282828] px-3 py-1 text-sm">
                      Support
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#FF0000]">
                      Get Help and Support
                    </h2>
                    <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      If you encounter any issues or have questions about
                      Yt-Dlx, our support team is here to help. Check out our
                      troubleshooting guides, FAQs, and contact us for
                      personalized assistance.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-[#FF0000] px-8 text-sm font-medium text-white shadow-2xl transition-colors hover:bg-[#CC0000] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <RiContactsBookFill className="mr-2 h-5 w-5" />
                      Contact Support
                    </Link>
                    <Link
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-[#333333] bg-[#282828] px-8 text-sm font-medium shadow-2xl transition-colors hover:bg-[#333333] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      <FaQuora className="mr-2 h-5 w-5" />
                      FAQs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </react.Fragment>
  );
}
