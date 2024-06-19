import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const AudioOnly: React.FC<{
    videoId: string;
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose, videoId }) => {
    const [outputFolder, _outputFolder] = useState<string | null>(null);
    const [quality, _quality] = useState<string | null>(null);
    const [filename, _filename] = useState<any>(null);
    const [progress, _progress] = useState<any>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [error, _error] = useState<any>(null);
    const [formData, _formData] = useState({
        metadata: false,
        verbose: true,
        useTor: true,
        stream: true,
    });

    useEffect(() => {
        const ClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
                _quality(null);
                _progress(null);
                _filename(null);
                _outputFolder(null);
            }
        };
        if (isOpen) document.addEventListener("mousedown", ClickOutside);
        else document.removeEventListener("mousedown", ClickOutside);
        return () => {
            document.removeEventListener("mousedown", ClickOutside);
        };
    }, [isOpen, onClose]);

    const ws = React.useRef<WebSocket | null>(null);
    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8642");
        ws.current.onopen = () => console.log("WebSocket connected");
        ws.current.onmessage = event => {
            const message = JSON.parse(event.data);
            console.log("Received message:", message); // Add this line
            if (message.event === "progress") _progress(message.data);
            if (message.event === "end") _filename(message.data);
            if (message.event === "error") _error(message.data);
        };
        ws.current.onerror = event => _error("WebSocket error occurred");
        return () => {
            if (ws.current) ws.current.close();
        };
    }, []);

    return (
        <React.Fragment>
            {isOpen && (
                <motion.div
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center h-full w-full backdrop-blur-lg bg-neutral-900/60">
                    <div
                        ref={modalRef}
                        className="bg-neutral-900 rounded-3xl p-8 backdrop-blur-lg border-4 border-double border-red-600 shadow-red-600 shadow-[0_0_800px_rgba(255,0,0,0.5)] w-auto max-w-[90vw] max-h-[90vh] overflow-y-auto flex flex-col items-center justify-start text-center">
                        <h2 className="text-7xl text-red-600 font-black mb-10">
                            Choose Your Poison For <br />
                            <span className="text-9xl block italic">Audio</span>
                        </h2>
                        <ul className="font-semibold list-disc mb-10 text-white text-xl">
                            <li
                                onClick={() => {
                                    _quality(null);
                                    _progress(null);
                                    _filename(null);
                                    _quality("AudioHighest");
                                }}
                                className={`hover:text-red-600 text-2xl cursor-pointer italic font-bold ${quality === "AudioHighest" ? "text-red-600" : "text-white/40"}`}>
                                Highest Possible Download
                            </li>
                            <li
                                onClick={() => {
                                    _quality(null);
                                    _progress(null);
                                    _filename(null);
                                    _quality("AudioLowest");
                                }}
                                className={`hover:text-red-600 text-2xl cursor-pointer italic font-bold ${quality === "AudioLowest" ? "text-red-600" : "text-white/40"}`}>
                                Lowest Possible Download
                            </li>
                        </ul>
                        {quality && (
                            <React.Fragment>
                                <form
                                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                                        event.preventDefault();
                                        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                                            const payLoad = {
                                                event: quality,
                                                payload: {
                                                    metadata: formData.metadata,
                                                    verbose: formData.verbose,
                                                    stream: formData.stream,
                                                    useTor: formData.useTor,
                                                    output: outputFolder,
                                                    query: videoId,
                                                },
                                            };
                                            ws.current.send(JSON.stringify(payLoad));
                                        } else _error("WebSocket connection not established!");
                                    }}
                                    className="flex flex-col items-center">
                                    <div className="flex flex-col items-center">
                                        {outputFolder ? (
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    const folder = await window.ipc.invoke("select-output-folder");
                                                    if (folder) _outputFolder(folder);
                                                }}
                                                className="rounded-3xl border p-2 btn-wide italic text-neutral-900 font-black border-neutral-900 bg-red-600 px-8 text-sm scale-110 mb-4">
                                                Location: {outputFolder}
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    const folder = await window.ipc.invoke("select-output-folder");
                                                    if (folder) _outputFolder(folder);
                                                }}
                                                className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110 mb-4">
                                                Browse Output Location
                                            </button>
                                        )}
                                        {outputFolder && !filename && (
                                            <React.Fragment>
                                                <button
                                                    type="submit"
                                                    className="rounded-3xl border p-2 btn-wide hover:border-neutral-900 text-red-600 font-black border-red-600/50 bg-neutral-900 hover:bg-red-600 hover:text-neutral-900 px-8 text-sm duration-700 transition-transform hover:scale-110">
                                                    Connect and Download
                                                </button>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </form>
                            </React.Fragment>
                        )}
                        {filename && (
                            <ul className="text-white/60 items-start justify-start flex flex-col list-disc mt-6">
                                <li>
                                    <span className="text-red-600 font-black mr-2">Location:</span>
                                    {outputFolder || "-"}
                                </li>
                                <li>
                                    <span className="text-red-600 font-black mr-2">Filename:</span>
                                    {filename || "-"}
                                </li>
                                <li>
                                    <span className="text-red-600 font-black mr-2">frames:</span>
                                    {progress.frames || "-"}
                                </li>
                                <li>
                                    <span className="text-red-600 font-black mr-2">currentFps:</span>
                                    {progress.currentFps || "-"}
                                </li>
                                <li>
                                    <span className="text-red-600 font-black mr-2">targetSize:</span>
                                    {progress.targetSize || "-"}
                                </li>
                                <li>
                                    <span className="text-red-600 font-black mr-2">timemark:</span>
                                    {progress.timemark || "-"}
                                </li>
                                <li>
                                    <span className="text-red-600 font-black mr-2">Error:</span>
                                    {error || "-"}
                                </li>
                            </ul>
                        )}
                    </div>
                </motion.div>
            )}
        </React.Fragment>
    );
};

export default AudioOnly;
