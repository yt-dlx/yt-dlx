import react from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaClipboardCheck } from "react-icons/fa"
import { HiFolderDownload } from "react-icons/hi"

const FromLeftToRight = {
  initial: { opacity: 0, x: -100 },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.8 } },
}
const FromRightToLeft = {
  initial: { opacity: 0, x: 100 },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.8 } },
}
const AndBounce = {
  initial: { opacity: 0, y: -50 },
  whileInView: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, bounce: 0.3 },
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
}

export default function Playground(): JSX.Element {
  return (
    <react.Fragment>
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.div className="inline-block rounded-3xl bg-red-600 text-neutral-900 cursor-not-allowed font-black px-3 py-1 text-sm">
                  Playground
                </motion.div>
                <motion.h2
                  className="text-3xl font-black tracking-tighter sm:text-7xl text-red-600"
                  {...FromLeftToRight}>
                  Powerful Multimedia Downloading Playground
                </motion.h2>
                <motion.p className="max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Yt-Dlx allows you to download audio and video content from a
                  wide range of sources, including YouTube, Vimeo, and many
                  more. With its advanced capabilities, you can customize the
                  download format, resolution, and more.
                </motion.p>
              </div>
              <motion.ul className="grid gap-2 py-4">
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  Download audio and video from diverse sources
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  Customize download format, resolution, and more
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  Supports a wide range of media formats
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-600" />
                  Seamless integration with Node.js and other environments
                </li>
              </motion.ul>
              <Link
                href="/gui/home"
                className="inline-flex h-10 items-center justify-center rounded-3xl border hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 disabled:pointer-events-none disabled:opacity-50">
                <HiFolderDownload className="mr-2 h-5 w-5" />
                Try Yt-Dlx in Graphical User Interface mode
              </Link>
            </div>
            <motion.img
              alt="logo"
              width={550}
              height={310}
              src="/YouTube_Circle.gif"
              {...FromRightToLeft}
              className="mx-auto aspect-video overflow-hidden rounded-3xl object-cover object-center sm:w-full border-4 border-[#cd322d6e] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-red-600"
            />
          </div>
        </div>
      </motion.section>
    </react.Fragment>
  )
}
