import React from "react";
import { motion } from "framer-motion";
import NavPackage from "../components/nav";
import FootPackage from "../components/foot";
import Introduction from "../home/Introduction";
import { FaClipboardCheck } from "react-icons/fa";

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

export default function HomePage(): JSX.Element {
  return (
    <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-[#CD322D] font-semibold">
      <NavPackage />
      <Introduction />
      <motion.section
        id="Features"
        className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-12 md:py-24 lg:py-32 bg-black text-white"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <motion.div className="inline-block rounded-2xl bg-[#CD322D] text-neutral-900 cursor-not-allowed font-black px-3 py-1 text-sm">
                placeholder
              </motion.div>
              <motion.h2
                className="text-3xl font-black tracking-tighter sm:text-7xl text-[#CD322D]"
                {...FromLeftToRight}
              >
                Laboris exercitation velit ex duis dolor labore deserunt.
              </motion.h2>
              <motion.ul className="grid gap-2 py-4" {...AndBounce}>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Occaecat amet reprehenderit consequat commodo aliqua commodo.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Nulla culpa laborum nostrud nisi officia nostrud laborum
                  deserunt commodo et.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Magna dolore eiusmod ex qui magna laboris laboris eu dolore
                  mollit labore nulla.
                </li>
                <li>
                  <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-[#CD322D]" />
                  Commodo minim minim elit esse qui anim aliqua incididunt aute
                  esse excepteur excepteur.
                </li>
              </motion.ul>
            </div>
            <motion.img
              alt="logo"
              width={550}
              height={310}
              src="/eq.gif"
              {...FromRightToLeft}
              className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full border-4 border-[#cd322d6e] shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#CD322D]"
            />
          </div>
        </div>
      </motion.section>
      <FootPackage />
    </main>
  );
}
