import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function VideoId(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-[#111111] scrollbar-track-[#111111] scrollbar-thumb-red-600">
      <h1 className="text-4xl flex items-center justify-center mt-48">
        dynamic page videoId: {id}
      </h1>
      <motion.footer
        id="Footer"
        className="pt-20 pb-6 flex flex-wrap items-baseline justify-center"
      >
        <span className="text-[#e73d75] text-3xl mr-2">
          Mixly <span className="text-[#C4C4C4] text-lg">&</span>{" "}
          <span className="text-red-600">Yt-Dlx</span>
        </span>
        <span className="mt-2 text-sm font-light text-[#C4C4C4]">
          Copyright © 2024
        </span>
      </motion.footer>
    </main>
  );
}
