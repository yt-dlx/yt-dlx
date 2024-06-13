import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AudioOnly: React.FC<{
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, videoId }) => {
  const [progress, setProgress] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [start, setStart] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [outputFolder, setOutputFolder] = useState<string | null>(null);

  useEffect(() => {
    const handleProgress = (progress: any) => setProgress(progress);
    const handleMetadata = (metadata: any) => setMetadata(metadata);
    const handleStart = (start: string) => setStart(start);
    const handleError = (error: string) => setError(error);
    const handleEnd = (end: string) => setEnd(end);

    window.ipc.on("progress", handleProgress);
    window.ipc.on("metadata", handleMetadata);
    window.ipc.on("start", handleStart);
    window.ipc.on("error", handleError);
    window.ipc.on("end", handleEnd);

    return () => {
      window.ipc.off("progress", handleProgress);
      window.ipc.off("metadata", handleMetadata);
      window.ipc.off("start", handleStart);
      window.ipc.off("error", handleError);
      window.ipc.off("end", handleEnd);
    };
  }, []);

  const selectOutputFolder = async () => {
    const folder = await window.ipc.invoke("select-output-folder");
    if (folder) {
      setOutputFolder(folder);
    }
  };

  const handleDownload = (quality: string) => {
    window.ipc.send("Audio", { videoId, output: outputFolder, quality });
  };

  return (
    <React.Fragment>
      {isOpen && (
        <motion.div
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-neutral-900/90 backdrop-blur-lg border-4 border-double border-red-600 p-4 rounded-3xl max-w-lg w-full shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#707070]">
            <h2 className="text-4xl text-red-600 font-black mb-4">
              Choose Your Poison For <br />
              <span className="text-6xl block">Audio</span>
            </h2>
            <ul className="font-semibold text-white list-disc flex flex-col items-start justify-start m-6">
              <li
                onClick={() => handleDownload("highest")}
                className="hover:text-red-600 hover:font-black cursor-pointer">
                Highest Possible Download
              </li>
              <li
                onClick={() => handleDownload("lowest")}
                className="hover:text-red-600 hover:font-black cursor-pointer">
                Lowest Possible Download
              </li>
            </ul>
            <button
              onClick={selectOutputFolder}
              className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110">
              Select Output Folder
            </button>
            {outputFolder && <p className="text-white">Output Folder: {outputFolder}</p>}
            {start && <p className="text-white">Start: {start}</p>}
            {metadata && <p className="text-white">Metadata: {JSON.stringify(metadata)}</p>}
            {progress && (
              <progress className="progress h-4 w-80 m-4" value={progress.percent || 0} max="100" />
            )}
            {end && <p className="text-white">End: {end}</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            <button
              onClick={onClose}
              className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110">
              Close Modal Box
            </button>
          </div>
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default AudioOnly;
