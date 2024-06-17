import React, { useState, useEffect } from "react";

export default function HomePage(): JSX.Element {
  const [outputFolder, setOutputFolder] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [start, setStart] = useState<any>(null);
  const [formData, setFormData] = useState({
    metadata: false,
    verbose: true,
    useTor: false,
    stream: true,
    query: "",
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
        event: "AudioLowest",
        payload: {
          stream: formData.stream,
          useTor: formData.useTor,
          verbose: formData.verbose,
          metadata: formData.metadata,
          output: outputFolder,
          query: formData.query,
        },
      };
      ws.current.send(JSON.stringify(message));
    } else setError("WebSocket connection not established");
  };

  return (
    <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-600 font-semibold font-serif">
      <section className="h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="text-white">
            <input
              type="checkbox"
              name="stream"
              checked={formData.stream}
              onChange={handleInputChange}
            />
            Stream
          </label>
          <label className="text-white">
            <input
              type="checkbox"
              name="useTor"
              checked={formData.useTor}
              onChange={handleInputChange}
            />
            Use Tor
          </label>
          <label className="text-white">
            <input
              type="checkbox"
              name="verbose"
              checked={formData.verbose}
              onChange={handleInputChange}
            />
            Verbose
          </label>
          <label className="text-white">
            <input
              type="checkbox"
              name="metadata"
              checked={formData.metadata}
              onChange={handleInputChange}
            />
            Metadata
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleSelectOutputFolder}
              className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4">
              Browse for Output Folder
            </button>
            {outputFolder && (
              <span className="ml-4 text-white">Selected Folder: {outputFolder}</span>
            )}
          </div>
          <input
            type="text"
            name="query"
            value={formData.query}
            onChange={handleInputChange}
            placeholder="Enter search query"
            className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4"
          />
          <button
            type="submit"
            className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4">
            Start Search
          </button>
        </form>
        {start && <p className="text-white mt-2">Start: {JSON.stringify(start)}</p>}
        {progress && <p className="text-white mt-2">Progress: {JSON.stringify(progress)}</p>}
        {metadata && <p className="text-white mt-2">Metadata: {JSON.stringify(metadata)}</p>}
        {error && <p className="text-red-600 mt-2">Error: {error}</p>}
      </section>
    </main>
  );
}
