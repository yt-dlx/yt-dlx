import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

var VideoOnly: React.FC<{
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, videoId }) => {
  var [outputFolder, setOutputFolder] = useState<string | null>(null);
  var [quality, setQuality] = useState<string | null>(null);
  var [progress, setProgress] = useState<any>(null);
  var [metadata, setMetadata] = useState<any>(null);
  var [start, setStart] = useState<any>(null);
  var [error, setError] = useState<any>(null);
  var [end, setEnd] = useState<any>(null);
  useEffect(() => {
    var handleProgress = (progress: any) => setProgress(progress);
    var handleMetadata = (metadata: any) => setMetadata(metadata);
    var handleStart = (start: string) => setStart(start);
    var handleError = (error: string) => setError(error);
    var handleEnd = (end: string) => setEnd(end);
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

  var selectOutputFolder = async () => {
    var folder = await window.ipc.invoke("select-output-folder");
    if (folder) setOutputFolder(folder);
  };
  var handleDownload = () => {
    if (outputFolder && quality) {
      window.ipc.send("Video", { videoId, output: outputFolder, quality });
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
              <span className="text-6xl block">Video</span>
            </h2>
            <ul className="font-semibold text-white list-disc flex flex-col items-start justify-start m-6">
              <li
                onClick={() => setQuality("highest")}
                className={`hover:text-red-600 hover:font-black cursor-pointer ${quality === "highest" ? "text-red-600 font-black" : "text-gray-600"}`}>
                Highest Possible Download
              </li>
              <li
                onClick={() => setQuality("lowest")}
                className={`hover:text-red-600 hover:font-black cursor-pointer ${quality === "lowest" ? "text-red-600 font-black" : "text-gray-600"}`}>
                Lowest Possible Download
              </li>
            </ul>
            {quality && (
              <>
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
            {start && <p className="text-white mt-2">Start: {start}</p>}
            {metadata && <p className="text-white mt-2">Metadata: {JSON.stringify(metadata)}</p>}
            {progress && (
              <progress className="progress h-4 w-80 m-4" value={progress.percent || 0} max="100" />
            )}
            {end && <p className="text-white mt-2">End: {end}</p>}
            {error && <p className="text-red-600 mt-2">Error: {error}</p>}
            <button
              onClick={() => {
                onClose();
                setEnd(null);
                setError(null);
                setStart(null);
                setMetadata(null);
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

export default VideoOnly;
