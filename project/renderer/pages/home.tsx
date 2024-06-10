import React from "react";
import Head from "next/head";

export default function HomePage() {
  const [time, setTime] = React.useState("No time found");
  React.useEffect(() => {
    window.ipc.on("time", (time: string) => setTime(time));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-typescript)</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p className="text-xl mb-4">⚡ Electron + Next.js ⚡ - </p>
      </div>
      <button
        onClick={() => window.ipc.send("time", new Date().toISOString())}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Current Time
      </button>
      <p className="mt-2 text-gray-700">{time}</p>
    </React.Fragment>
  );
}
