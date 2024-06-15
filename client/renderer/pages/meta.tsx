import React from "react";

export default function metaPage(): JSX.Element {
  var [start, setStart] = React.useState<any>(null);
  var [error, setError] = React.useState<any>(null);
  React.useEffect(() => {
    var handleStart = (start: string) => setStart(start);
    var handleError = (error: string) => setError(error);
    window.ipc.on("start", handleStart);
    window.ipc.on("error", handleError);
    return () => {
      window.ipc.off("start", handleStart);
      window.ipc.off("error", handleError);
    };
  }, []);

  return (
    <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-600 font-semibold font-serif">
      <button
        onClick={() => {
          window.ipc.send("meta", { query: "careless-whisper", verbose: true, useTor: true });
        }}
        className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mt-4">
        @meta: IPC-WS
      </button>
      {start && <p className="text-white mt-2">Start: {JSON.stringify(start)}</p>}
      {error && <p className="text-red-600 mt-2">Error: {JSON.stringify(error)}</p>}
    </main>
  );
}
