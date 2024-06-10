import react from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [num1, setNum1] = react.useState<number>(0);
  const [num2, setNum2] = react.useState<number>(0);
  const [Added, setAdd] = react.useState<any>();
  react.useEffect(() => {
    window.ipc.on("add", (response: string) => setAdd(response));
  }, []);

  return (
    <react.Fragment>
      <motion.div className="min-h-screen bg-neutral-900 text-neutral-300 flex flex-col items-center justify-center">
        <motion.div className="text-center text-neutral-500 font-semibold text-xl">
          Add two numbers using Electron IPC
        </motion.div>
        <motion.div className="flex justify-center mt-4">
          <motion.input
            value={num1}
            type="number"
            onChange={(e) => setNum1(parseFloat(e.target.value))}
            className="bg-neutral-800 px-2 py-1 rounded text-neutral-300 mr-2"
          />
          +
          <motion.input
            value={num2}
            type="number"
            onChange={(e) => setNum2(parseFloat(e.target.value))}
            className="bg-neutral-800 px-2 py-1 rounded text-neutral-300 ml-2"
          />
          <motion.button
            onClick={() => window.ipc.send("add", { num1, num2 })}
            className="ml-2 bg-blue-400 px-2 py-1 rounded text-neutral-900"
          >
            Add
          </motion.button>
        </motion.div>
        {Added !== null && (
          <motion.div className="mt-4 text-green-400">
            Result: {Added}
          </motion.div>
        )}
      </motion.div>
    </react.Fragment>
  );
}

{
  /* <react.Fragment>
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
</react.Fragment> */
}
