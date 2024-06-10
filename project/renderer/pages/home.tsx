import React from "react";
import Head from "next/head";
import Image from "next/image";

export default function HomePage() {
  const [time, setMessage] = React.useState("No time found");
  React.useEffect(() => {
    window.ipc.on("time", (time: string) => setMessage(time));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-typescript)</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p className="text-xl mb-4">⚡ Electron + Next.js ⚡ - </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={256}
          height={256}
          className="mb-4"
        />
      </div>
      <div className="flex flex-col items-center mt-4">
        <button
          onClick={() => window.ipc.send("time", new Date().toISOString())}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          new Date().toISOString()
        </button>
        <p className="mt-2 text-gray-700">{time}</p>
      </div>
    </React.Fragment>
  );
}
