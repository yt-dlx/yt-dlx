import Link from "next/link";
import { RiHome5Fill } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function NavPackage() {
  return (
    <nav className="navbar bg-red-800/10 shadow-red-800/20 shadow-2xl text-white/60 backdrop-blur-md fixed z-50 top-0 flex justify-between items-center px-4">
      <Link
        href="/home"
        className="text-red-600 cursor-pointer text-4xl font-bold flex items-center gap-2 hover:scale-105 duration-500 hover:animate-pulse"
      >
        <RiHome5Fill size={30} />
        yt-dlx <span className="text-sm">Copyright © 2024</span>
      </Link>
      <div className="flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="text-red-600 cursor-pointer text-xs font-bold flex items-center gap-2 hover:scale-105 duration-500 hover:animate-pulse"
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          onClick={() => window.history.forward()}
          className="text-red-600 cursor-pointer text-xs font-bold flex items-center gap-2 hover:scale-105 duration-500 hover:animate-pulse"
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </nav>
  );
}
