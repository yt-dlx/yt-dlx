import NavPackage from "./components/nav";
import Playground from "./home/Playground";
import FootPackage from "./components/foot";
import Introduction from "./home/Introduction";
import Documentation from "./home/Documentation";

export default function HomePage(): JSX.Element {
  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-[#111111] scrollbar-track-[#111111] scrollbar-thumb-red-600">
      <NavPackage />
      <Introduction />
      <Playground />
      <Documentation />
      <FootPackage />
    </main>
  );
}
