import NavPackage from "./components/nav";
import FootPackage from "./components/foot";
import Introduction from "./home/Introduction";
import Documentation from "./home/Documentation";

export default function HomePage(): JSX.Element {
  // const [Added, setAdd] = react.useState<any>();
  // react.useEffect(() => {
  // window.ipc.on("add", (response: string) => setAdd(response));
  // }, []);
  // window.ipc.send("add", { num1, num2 })

  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-[#111111] scrollbar-track-[#111111] scrollbar-thumb-red-600">
      <NavPackage />
      <Introduction />
      <Documentation />
      <FootPackage />
    </main>
  );
}
