import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalProviders from "./providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProviders>
      <Component {...pageProps} />
    </GlobalProviders>
  );
}

export default MyApp;
