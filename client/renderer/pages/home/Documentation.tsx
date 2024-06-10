import react from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";

export default function Documentation(): JSX.Element {
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

  return (
    <react.Fragment>
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-12 md:py-24 lg:py-32 bg-neutral-950 text-white">
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
              <Link
                href="/docs/home"
                className="inline-flex h-10 items-center justify-center rounded-2xl border hover:border-neutral-900 text-[#CD322D] font-black border-[#CD322D]/50 bg-neutral-900 hover:bg-[#CD322D] hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#CD322D] disabled:pointer-events-none disabled:opacity-50"
              >
                <FaBook className="mr-2 h-5 w-5" />
                Checkout Usage Documentations for Yt-Dlx
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </react.Fragment>
  );
}
