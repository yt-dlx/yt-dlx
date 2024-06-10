import react from "react";
import { SiBun } from "react-icons/si";
import { FaYarn } from "react-icons/fa";
import { SiPnpm } from "react-icons/si";
import { TbBrandNpm } from "react-icons/tb";
import VerPackage from "../components/version";

export default function Introduction(): JSX.Element {
  return (
    <react.Fragment>
      <section
        id="Introduction"
        className="flex flex-col items-center justify-center mt-20"
      >
        <div className="max-w-screen-2xl px-6 py-16 mx-auto space-y-12">
          <article className="space-y-8">
            <VerPackage />
            <p className="text-white/60">
              Yt-Dlx Is A Robust Multimedia Downloading Tool Meticulously
              Crafted To Elevate Your Media Consumption Experience. With Its
              Advanced Capabilities, It Offers An All-Encompassing Solution For
              Effortlessly Acquiring Audio And Video Content From Diverse
              Sources. Drawing Inspiration From Renowned Projects Such As
              Python-Yt-Dlp And Python-Youtube-Dl, Yt-Dlx Combines Cutting-Edge
              Features With Real-Time Data Acquisition Facilitated By Puppeteer
              Technologies. Whether You Seek To Enrich Your Audio Library Or
              Curate A Collection Of High-Quality Videos, Yt-Dlx Stands As Your
              Indispensable Companion, Ensuring Seamless And Efficient Media
              Acquisition.
            </p>
          </article>
          <div>
            <div className="flex flex-wrap py-2 gap-2 border-b border-[#CD322D] border-dashed">
              <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-white/60">
                <div className="flex items-center gap-2 md:space-x-2">
                  <TbBrandNpm className="text-[#CD322D]" size={50} />
                  <FaYarn className="text-[#CD322D]" size={30} />
                  <SiPnpm className="text-[#CD322D]" size={30} />
                  <SiBun className="text-[#CD322D]" size={30} />
                </div>
              </div>
            </div>
            <div className="space-y-2 pt-8">
              <p className="text-2xl font-semibold text-[#CD322D]">
                Install Now Using Any Package Manager Of Your Choice!
              </p>
              <ul className="ml-4 space-y-1 list-disc text-white/60">
                <li>
                  <a rel="noopener noreferrer" className="cursor-pointer">
                    <span className="text-[#CD322D]">yarn</span> add yt-dlx |{" "}
                    <span className="text-[#CD322D]">yarn</span> global add yt-dlx
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" className="cursor-pointer">
                    <span className="text-[#CD322D]">bun</span> add yt-dlx |{" "}
                    <span className="text-[#CD322D]">bun</span> add -g yt-dlx
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" className="cursor-pointer">
                    <span className="text-[#CD322D]">npm</span> install yt-dlx |{" "}
                    <span className="text-[#CD322D]">npm</span> install -g yt-dlx
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" className="cursor-pointer">
                    <span className="text-[#CD322D]">pnpm</span> install yt-dlx |{" "}
                    <span className="text-[#CD322D]">pnpm</span> install -g yt-dlx
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </react.Fragment>
  );
}
