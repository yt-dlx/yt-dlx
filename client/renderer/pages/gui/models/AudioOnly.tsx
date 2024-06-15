import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AudioOnly: React.FC<{
  ws: WebSocket;
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, videoId, ws }) => {
  const [outputFolder, setOutputFolder] = useState<string | null>(null);
  const [quality, setQuality] = useState<string | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [start, setStart] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);

  useEffect(() => {
    ws = new WebSocket("ws://localhost:8642");
    ws.onopen = () => setStart("@info: WebSocket connected");
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      switch (message.event) {
        case "start":
          setStart(message.data);
          break;
        case "progress":
          setProgress(message.data);
          break;
        case "end":
          setEnd(message.data);
          break;
        case "error":
          setError(message.data);
          break;
        case "metadata":
          setMetadata(message.data);
          break;
        default:
          console.warn("Unknown event type:", message.event);
      }
    };
    ws.onerror = event => setError(JSON.stringify(event));
    return () => {
      if (ws) ws.close();
    };
  }, []);

  const selectOutputFolder = async () => {
    const folder = await window.ipc.invoke("select-output-folder");
    if (folder) setOutputFolder(folder);
  };
  const handleDownload = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        action: "meta",
        payload: {
          useTor: true,
          verbose: true,
          query: videoId,
          output: outputFolder,
        },
      };
      ws.send(JSON.stringify(message));
    } else setError("WebSocket connection not established");
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
                className={`hover:text-red-600 hover:font-black cursor-pointer ${quality === "Highest" ? "text-red-600 font-black" : "text-gray-600"}`}>
                Highest Possible Download
              </li>
              <li
                onClick={() => setQuality("Lowest")}
                className={`hover:text-red-600 hover:font-black cursor-pointer ${quality === "Lowest" ? "text-red-600 font-black" : "text-gray-600"}`}>
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
            {metadata && <p className="text-white mt-2">Metadata: {JSON.stringify(metadata)}</p>}
            {error && <p className="text-red-600 mt-2">Error: {JSON.stringify(error)}</p>}
            <button
              onClick={() => {
                onClose();
                setEnd(null);
                setError(null);
                setStart(null);
                setProgress(null);
                setMetadata(null);
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
