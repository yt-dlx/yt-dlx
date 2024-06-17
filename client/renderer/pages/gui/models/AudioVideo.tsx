import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AudioVideo: React.FC<{
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, videoId }) => {
  const [outputFolder, setOutputFolder] = useState<string | null>(null);
  const [quality, setQuality] = useState<string | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [start, setStart] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [formData, setFormData] = useState({
    metadata: false,
    verbose: false,
    useTor: false,
    stream: true,
  });
  const ws = React.useRef<WebSocket | null>(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8642");
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onmessage = event => {
      const message = JSON.parse(event.data);
      switch (message.event) {
        case "start":
          setStart(message.data);
          break;
        case "progress":
          setProgress(message.data);
          break;
        case "metadata":
          setMetadata(message.data);
          break;
        case "error":
          setError(message.data);
          break;
        case "end":
          setEnd(message.data);
          break;
        default:
          console.warn(`Unhandled event received: ${message.event}`);
      }
    };
    ws.current.onerror = event => setError("WebSocket error occurred");
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };
  const handleSelectOutputFolder = async () => {
    const folder = await window.ipc.invoke("select-output-folder");
    if (folder) setOutputFolder(folder);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        event: quality,
        payload: {
          metadata: formData.metadata,
          verbose: formData.verbose,
          stream: formData.stream,
          useTor: formData.useTor,
          output: outputFolder,
          query: videoId,
        },
      };
      ws.current.send(JSON.stringify(message));
    } else setError("WebSocket connection not established");
  };

  return (
    <React.Fragment>
      {isOpen && (
        <motion.div
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center h-full w-full">
          <div className="bg-neutral-900/90 backdrop-blur-lg border-4 border-double border-red-600 w-full h-full max-w-full max-h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl text-red-600 font-black mb-4">
              Choose Your Poison For <br />
              <span className="text-6xl block">Audio</span>
            </h2>
            <ul className="font-semibold text-white list-disc m-6">
              <li
                onClick={() => setQuality("AudioHighest")}
                className={`hover:text-red-600 hover:font-black cursor-pointer ${quality === "AudioHighest" ? "text-red-600 font-black" : "text-gray-600"}`}>
                Highest Possible Download
              </li>
              <li
                onClick={() => setQuality("AudioLowest")}
                className={`hover:text-red-600 hover:font-black cursor-pointer ${quality === "AudioLowest" ? "text-red-600 font-black" : "text-gray-600"}`}>
                Lowest Possible Download
              </li>
            </ul>
            {quality && (
              <React.Fragment>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                  <div className="flex flex-row space-x-4">
                    <label>
                      <input
                        name="stream"
                        type="checkbox"
                        checked={formData.stream}
                        onChange={handleInputChange}
                        className="checkbox checkbox-xs checkbox-error mr-2 bg-neutral-800"
                      />
                      Stream
                    </label>
                    <label>
                      <input
                        name="useTor"
                        type="checkbox"
                        checked={formData.useTor}
                        onChange={handleInputChange}
                        className="checkbox checkbox-xs checkbox-error mr-2 bg-neutral-800"
                      />
                      Use Tor
                    </label>
                    <label>
                      <input
                        name="verbose"
                        type="checkbox"
                        checked={formData.verbose}
                        onChange={handleInputChange}
                        className="checkbox checkbox-xs checkbox-error mr-2 bg-neutral-800"
                      />
                      Verbose
                    </label>
                    <label>
                      <input
                        name="metadata"
                        type="checkbox"
                        checked={formData.metadata}
                        onChange={handleInputChange}
                        className="checkbox checkbox-xs checkbox-error mr-2 bg-neutral-800"
                      />
                      Metadata
                    </label>
                  </div>
                  <div className="flex items-center mt-4">
                    <button
                      type="button"
                      onClick={handleSelectOutputFolder}
                      className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110">
                      Browse for Output Folder
                    </button>
                    {outputFolder && (
                      <span className="ml-4 text-white">Selected Folder: {outputFolder}</span>
                    )}
                  </div>
                  {outputFolder && (
                    <React.Fragment>
                      <button
                        type="submit"
                        className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4">
                        Start Search
                      </button>
                    </React.Fragment>
                  )}
                </form>
              </React.Fragment>
            )}
            {end && <p className="text-red-600 mt-2">End: {end}</p>}
            {error && <p className="text-red-600 mt-2">Error: {error}</p>}
            {start && <p className="text-white mt-2">Start: {JSON.stringify(start)}</p>}
            {progress && <p className="text-white mt-2">Progress: {JSON.stringify(progress)}</p>}
            {metadata && <p className="text-white mt-2">Metadata: {JSON.stringify(metadata)}</p>}
            {progress && (
              <progress className="progress h-4 w-80 m-4" value={progress.percent || 0} max="100" />
            )}
            <button
              onClick={() => onClose()}
              className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4">
              Close Modal Box
            </button>
          </div>
        </motion.div>
      )}
    </React.Fragment>
  );
};
export default AudioVideo;
