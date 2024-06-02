import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HomePage(): JSX.Element {
  const [additionResult, setAdditionResult] = useState<number | null>(null);
  const [clockMessage, setClockMessage] = useState<string>("");
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);

  useEffect(() => {
    const ApiAdd = (_event: Electron.IpcRendererEvent, result: number): void =>
      setAdditionResult(result);

    const ApiTime = (_event: Electron.IpcRendererEvent, time: string): void =>
      setClockMessage(time);

    window.electron.ipcRenderer.on("TimeGet", ApiTime);
    window.electron.ipcRenderer.on("AddGet", ApiAdd);
    return () => {
      window.electron.ipcRenderer.on("TimeGet", ApiTime);
      window.electron.ipcRenderer.on("AddGet", ApiAdd);
    };
  }, []);

  return (
    <React.Fragment>
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
            onClick={() => {
              window.electron.ipcRenderer.send("AddSend", { num1, num2 });
            }}
            className="ml-2 bg-blue-400 px-2 py-1 rounded text-neutral-900"
          >
            Add
          </motion.button>
        </motion.div>
        {additionResult !== null && (
          <motion.div className="mt-4 text-green-400">
            Result: {additionResult}
          </motion.div>
        )}
        {clockMessage && (
          <motion.div className="mt-6 text-green-400">
            {clockMessage}
          </motion.div>
        )}
      </motion.div>
    </React.Fragment>
  );
}
