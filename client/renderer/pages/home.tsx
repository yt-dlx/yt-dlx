import React, { useState, useEffect } from "react";

export default function HomePage(): JSX.Element {
  const [start, setStart] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  let ws: WebSocket | null = null;

  useEffect(() => {
    ws = new WebSocket("ws://localhost:8642");
    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.success) setStart(message.data);
      else setError(message.error);
    };
    ws.onerror = event => {
      console.error("WebSocket error:", event);
      setError("WebSocket error occurred");
    };
    return () => {
      if (ws) ws.close();
    };
  }, []);

  const handleMetaRequest = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        action: "meta",
        payload: { query: "careless-whisper", verbose: true, useTor: true },
      };
      ws.send(JSON.stringify(message));
    } else setError("WebSocket connection not established");
  };

  return (
    <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-600 font-semibold font-serif">
      <section className="h-screen flex items-center justify-center">
        <button
          onClick={handleMetaRequest}
          className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4">
          @meta: WebSocket
        </button>
        {start && <p className="text-white mt-2">Start: {JSON.stringify(start)}</p>}
        {error && <p className="text-red-600 mt-2">Error: {error}</p>}
      </section>
    </main>
  );
}

// import React from "react";
// import Support from "./home/Support";
// import NavPackage from "./components/nav";
// import Playground from "./home/Playground";
// import FootPackage from "./components/foot";
// import Introduction from "./home/Introduction";
// import Documentation from "./home/Documentation";

// export default function metaPage(): JSX.Element {
// return (
// <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-600 font-semibold font-serif">
// <NavPackage />
// <Introduction />
// <Playground />
// <Documentation />
// <Support />
// <FootPackage />
// </main>
// );
// }
