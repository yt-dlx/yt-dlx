import React from "react";
import Support from "./home/Support";
import NavPackage from "./components/nav";
import Playground from "./home/Playground";
import FootPackage from "./components/foot";
import Introduction from "./home/Introduction";
import Documentation from "./home/Documentation";

export default function HomePage(): JSX.Element {
    return (
        <main className="flex flex-col overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-600 font-semibold">
            <NavPackage />
            <Introduction />
            <Playground />
            <Documentation />
            <Support />
            <FootPackage />
        </main>
    );
}
