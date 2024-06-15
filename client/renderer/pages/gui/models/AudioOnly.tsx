import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

var AudioOnly: React.FC<{
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, videoId }) => {
  var [outputFolder, setOutputFolder] = useState<string | null>(null);
  var [quality, setQuality] = useState<string | null>(null);
  var [progress, setProgress] = useState<any>(null);
  var [start, setStart] = useState<any>(null);
  var [error, setError] = useState<any>(null);
  var [end, setEnd] = useState<any>(null);
  useEffect(() => {
    var handleProgress = (progress: any) => setProgress(progress);
    var handleStart = (start: string) => setStart(start);
    var handleError = (error: string) => setError(error);
    var handleEnd = (end: string) => setEnd(end);
    window.ipc.on("AudioProgress", handleProgress);
    window.ipc.on("AudioStart", handleStart);
    window.ipc.on("AudioError", handleError);
    window.ipc.on("AudioEnd", handleEnd);
    return () => {
      window.ipc.off("AudioProgress", handleProgress);
      window.ipc.off("AudioStart", handleStart);
      window.ipc.off("AudioError", handleError);
      window.ipc.off("AudioEnd", handleEnd);
    };
  }, []);

  var selectOutputFolder = async () => {
    var folder = await window.ipc.invoke("select-output-folder");
    if (folder) setOutputFolder(folder);
  };
  var handleDownload = () => {
    if (outputFolder && quality) {
      window.ipc.send("Audio", { query: videoId, output: outputFolder, quality });
    }
  };

  return (
    <React.Fragment>
      {isOpen && (
        <motion.div
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 font-serif">
          <div className="bg-neutral-900/90 backdrop-blur-lg border-4 border-double border-red-600 p-4 rounded-3xl max-w-lg w-full shadow-[0_0_400px_rgba(255,0,0,0.5)] shadow-[#707070]">
            <h2 className="text-4xl text-red-600 font-black mb-4">
              Choose Your Poison For <br />
              <span className="text-6xl block">Audio</span>
            </h2>
            <ul className="font-semibold text-white list-disc flex flex-col items-start justify-start m-6">
              <li
                onClick={() => setQuality("Highest")}
                className={`hover:text-red-600 hover:font-black cursor-pointer ${quality === "highest" ? "text-red-600 font-black" : "text-gray-600"}`}>
                Highest Possible Download
              </li>
              <li
                onClick={() => setQuality("Lowest")}
                className={`hover:text-red-600 hover:font-black cursor-pointer ${quality === "lowest" ? "text-red-600 font-black" : "text-gray-600"}`}>
                Lowest Possible Download
              </li>
            </ul>
            {quality && (
              <>
                <div className="text-red-600 text-lg font-black uppercase">
                  You have selected {quality}{" "}
                </div>
                <button
                  onClick={selectOutputFolder}
                  className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110">
                  Select Output Folder
                </button>
                {outputFolder && (
                  <>
                    <p className="text-white mt-2">Output Folder: {outputFolder}</p>
                    <button
                      onClick={handleDownload}
                      className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4">
                      Start Download
                    </button>
                  </>
                )}
              </>
            )}
            {start && <p className="text-white mt-2">Start: {JSON.stringify(start)}</p>}
            {progress && (
              <progress className="progress h-4 w-80 m-4" value={progress.percent || 0} max="100" />
            )}
            {end && <p className="text-white mt-2">End: {JSON.stringify(end)}</p>}
            {error && <p className="text-red-600 mt-2">Error: {JSON.stringify(error)}</p>}
            <button
              onClick={() => {
                onClose();
                setEnd(null);
                setError(null);
                setStart(null);
                setProgress(null);
              }}
              className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4">
              Close Modal Box
            </button>
          </div>
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default AudioOnly;
