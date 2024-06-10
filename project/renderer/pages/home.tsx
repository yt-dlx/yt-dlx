import React from "react";
import Head from "next/head";
import Image from "next/image";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");
  React.useEffect(() => {
    window.ipc.on("message", (message: unknown) => {
      if (typeof message === "string") setMessage(message);
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-typescript)</title>
      </Head>
      <div>
        <p>⚡ Electron + Next.js ⚡</p>
        <Image alt="Logo image" src="/logo.png" width={256} height={256} />
      </div>
      <div>
        <button
          onClick={() => {
            window.ipc.send("message", "Hello");
          }}
        >
          Test IPC
        </button>
        <p>{message}</p>
      </div>
    </React.Fragment>
  );
}
