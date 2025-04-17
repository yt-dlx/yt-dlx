import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import NavPackage from "../components/nav";
import FootPackage from "../components/foot";
import "react-tooltip/dist/react-tooltip.css";
import Introduction from "../home/Introduction";
import { FaClipboardCheck } from "react-icons/fa";

const FromLeftToRight = { initial: { opacity: 0, x: -100 }, exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }, whileInView: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
const AndBounce = { initial: { opacity: 0, y: -50 }, whileInView: { y: 0, opacity: 1, transition: { duration: 0.8, bounce: 0.3 } }, exit: { opacity: 0, y: -50, transition: { duration: 0.3 } } };

interface Function {
  href: string;
  name: string;
  description: string;
  category: "Audio" | "Video" | "Audio_Video" | "Account" | "Info" | "Search";
}
interface CategorizedFunctions {
  Audio?: Function[];
  Video?: Function[];
  Audio_Video?: Function[];
  Account?: Function[];
  Info?: Function[];
  Search?: Function[];
}

const FunctionTable = ({ title, functions }: { title: string; functions: Function[] }) => (
  <motion.div className="overflow-x-auto mb-8" {...AndBounce}>
    <h3 className="text-2xl font-black tracking-tighter sm:text-3xl text-red-700 mb-4 text-center">{title}</h3>
    <table className="table mx-auto text-left">
      <thead>
        <tr>
          <th className="text-red-700 font-black uppercase">Function Name</th> <th className="text-red-700 font-black uppercase">Description</th>
        </tr>
      </thead>
      <tbody>
        {functions.map(func => (
          <tr key={func.href}>
            <td className="px-6">
              <Link
                href={func.href}
                data-tooltip-place="top"
                data-tooltip-id="function-tooltip"
                data-tooltip-content="Press to see examples"
                className="font-bold flex items-center gap-2 hover:text-red-700"
                data-tooltip-style='{ "backgroundColor": "#1f2937", "color": "#f4f4f5", "fontSize": "14px", "padding": "8px", "borderRadius": "4px", "border": "1px solid #cd322d" }'>
                <FaClipboardCheck className="mr-2 inline-block h-4 w-4 text-red-700" /> {func.name}
              </Link>
              <Tooltip id="function-tooltip" />
            </td>
            <td className="py-2 text-sm font-extralight">{func.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

export default function HomePage() {
  const functions: Function[] = [
    {
      category: "Audio",
      href: "/docs/Audio/AudioCustom",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Audio",
      href: "/docs/Audio/AudioCustom",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Audio",
      href: "/docs/Audio/AudioCustom",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Audio",
      href: "/docs/Audio/AudioCustom",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Video",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Video",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Video",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Video",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Audio_Video",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Audio_Video",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Audio_Video",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Audio_Video",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Account",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Account",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Account",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Account",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Info",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Info",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Info",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Info",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Search",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Search",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Search",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
    {
      category: "Search",
      href: "/docs/placeholder/placeholder",
      name: "YouTubeDLX.placeholder.placeholder()",
      description: "description placeholder placeholder placeholder placeholder placeholder placeholder placeholder.",
    },
  ];

  const categorizedFunctions: CategorizedFunctions = functions.reduce((acc, func) => {
    if (!acc[func.category]) acc[func.category] = [];
    acc[func.category].push(func);
    return acc;
  }, {});

  return (
    <main className="flex flex-col items-center justify-start overflow-y-auto max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-700 font-semibold">
      <NavPackage />
      <div className="w-full px-4 py-8 md:px-6">
        <Introduction />
      </div>
      <motion.section className="flex items-center justify-center border-b-8 border-double border-[#cd322d6e] w-full py-8 md:py-16 lg:py-24 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-6 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <motion.div className="inline-block rounded-3xl bg-red-700 text-neutral-900 cursor-not-allowed font-black px-3 py-1 text-sm"> Viewing Documentation For: </motion.div>
              <motion.h2 className="text-3xl font-black tracking-tighter sm:text-4xl lg:text-5xl text-red-700" {...FromLeftToRight}>
                Various API Functions
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
                {categorizedFunctions.Audio && <FunctionTable title="Audio Functions" functions={categorizedFunctions.Audio} />}
                {categorizedFunctions.Video && <FunctionTable title="Video Functions" functions={categorizedFunctions.Video} />}
                {categorizedFunctions.Audio_Video && <FunctionTable title="Audio/Video Functions" functions={categorizedFunctions.Audio_Video} />}
                {categorizedFunctions.Account && <FunctionTable title="Account Functions" functions={categorizedFunctions.Account} />}
                {categorizedFunctions.Info && <FunctionTable title="Info Functions" functions={categorizedFunctions.Info} />}
                {categorizedFunctions.Search && <FunctionTable title="Search Functions" functions={categorizedFunctions.Search} />}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <FootPackage />
    </main>
  );
}
