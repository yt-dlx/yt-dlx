import react from "react";

export default function HomePage() {
  const [Added, setAdd] = react.useState<any>();
  react.useEffect(() => {
    window.ipc.on("add", (response: string) => setAdd(response));
  }, []);
  // window.ipc.send("add", { num1, num2 })

  return <react.Fragment></react.Fragment>;
}
