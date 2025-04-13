/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  isLive: boolean;
  duration: number | null;
  viewCount: number | null;
  uploadDate: string | null;
  channelid: string | null;
  channelname: string | null;
  description: string | null;
  thumbnails: { url: string }[] | null;
}

export default function Home() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<SearchResult | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a video or playlist to search.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);
    try {
      let response = await fetch(`/api/youtube?action=SearchMultipleVideos&query=${encodeURIComponent(searchQuery)}`);
      const rawText = await response.text();
      console.log("Raw video response:", rawText);
      let data: any;
      try {
        data = JSON.parse(rawText);
      } catch (jsonError) {
        console.error("JSON parse error for videos:", jsonError);
        throw new Error("Invalid response format from server.");
      }
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to fetch videos.");
      }
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        response = await fetch(`/api/youtube?action=SearchMultiplePlaylists&playlistLink=${encodeURIComponent(searchQuery)}`);
        const playlistText = await response.text();
        console.log("Raw playlist response:", playlistText);
        try {
          data = JSON.parse(playlistText);
        } catch (jsonError) {
          console.error("JSON parse error for playlists:", jsonError);
          throw new Error("Invalid response format from server.");
        }
        if (!response.ok || data.error) {
          throw new Error(data.error || "Failed to fetch playlists.");
        }
        if (Array.isArray(data) && data.length > 0) {
          setResults(data);
        } else {
          setError("No videos or playlists found.");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrending = async () => {
    setIsLoading(true);
    setError(null);
    setResults([]);
    try {
      const response = await fetch(`/api/youtube?action=SearchMultipleVideos&query=${encodeURIComponent("trending")}`);
      const rawText = await response.text();
      console.log("Raw trending response:", rawText);
      let data: any;
      try {
        data = JSON.parse(rawText);
      } catch (jsonError) {
        console.error("JSON parse error for trending:", jsonError);
        throw new Error("Invalid response format from server.");
      }
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to fetch trending videos.");
      }
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        setError("No trending videos found.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      console.error("Trending error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoSelect = async (video: SearchResult) => {
    setSelectedVideo(video);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/youtube?action=ExtractVideoData&query=${encodeURIComponent(video.id)}`);
      const rawText = await response.text();
      console.log("Raw video data response:", rawText);
      const data: any = JSON.parse(rawText);
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to fetch video data.");
      }
      const url = data.url;
      if (url) {
        setVideoUrl(url);
      } else {
        throw new Error("No playable URL found.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setVideoUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
    setVideoUrl(null);
  };

  const formatDuration = (seconds: number | null) => {
    if (seconds == null) return "Unknown";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const formatViewCount = (count: number | null) => {
    if (count == null) return "Unknown views";
    return `${count.toLocaleString()} views`;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1] px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div>
        <motion.header className="flex items-center justify-center py-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <svg className="w-12 h-12 text-[#ff0000] mr-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.5 6.5c-.3-1.1-1.1-2-2.2-2.3C19.1 4 12 4 12 4s-7.1 0-9.3.2c-1.1.3-1.9 1.2-2.2 2.3C.2 8.6 0 12 0 12s.2 3.4.5 5.5c.3 1.1 1.1 2 2.2 2.3 2.2.2 9.3.2 9.3.2s7.1 0 9.3-.2c-1.1-.3-1.9-1.2-2.2-2.3-.3-2.1-.5-5.5-.5-5.5s.2-3.4.5-5.5zM9.5 15.5v-7l6 3.5-6 3.5z" />
          </svg>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">YT-DLX App</h1>
        </motion.header>
        <div className="max-w-4xl mx-auto mb-8">
          <motion.div
            className="relative flex items-center bg-[#212121] rounded-full shadow-lg p-2"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}>
            <input
              type="text"
              className="flex-1 bg-transparent text-[#f1f1f1] placeholder-[#606060] text-base sm:text-lg px-4 py-3 outline-none"
              placeholder="Search videos or playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoCapitalize="none"
              autoCorrect="off"
            />
            <motion.button
              className="bg-[#ff0000] p-3 rounded-full disabled:opacity-50"
              whileHover={{ scale: 1.05, backgroundColor: "#cc0000" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={handleSearch}
              disabled={isLoading}>
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <Search className="h-6 w-6 text-white" />
              )}
            </motion.button>
          </motion.div>
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-[#ff4444] text-center mt-4 text-sm sm:text-base"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="max-w-4xl mx-auto flex-grow">
          <AnimatePresence>
            {results.length > 0 ? (
              <div className="grid gap-4">
                {results.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-[#181818] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-lg cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -4, backgroundColor: "#212121" }}
                    onClick={() => handleVideoSelect(item)}>
                    {item.thumbnails && item.thumbnails.length > 0 && (
                      <div className="relative flex-shrink-0 w-full">
                        <Image
                          src={item.thumbnails[0]?.url || ""}
                          alt={item.title}
                          width={640}
                          height={360}
                          className="rounded-xl object-cover w-full h-auto"
                        />
                        {item.isLive && <span className="absolute top-2 left-2 bg-[#ff0000] text-white text-xs font-bold px-2 py-1 rounded-md">LIVE</span>}
                        <span className="absolute bottom-2 right-2 bg-[#0f0f0f] bg-opacity-80 text-white text-xs font-medium px-2 py-1 rounded-md">
                          {formatDuration(item.duration)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-semibold text-[#f1f1f1] line-clamp-2">{item.title}</h2>
                      <p className="text-sm text-[#aaaaaa] mt-1">
                        {item.channelname || "Unknown channel"} • {formatViewCount(item.viewCount)} • {item.uploadDate || "Unknown date"}
                      </p>
                      <p className="text-sm text-[#aaaaaa] mt-2 line-clamp-3">{item.description || "No description available"}</p>
                      <p className="text-xs text-[#606060] mt-2">Video ID: {item.id}</p>
                      {item.channelid && <p className="text-xs text-[#606060]">Channel ID: {item.channelid}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : !isLoading && !error ? (
              <motion.p
                className="text-[#606060] text-center text-base sm:text-lg mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                Search to find videos or playlists.
              </motion.p>
            ) : isLoading ? (
              <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#181818] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 animate-pulse"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}>
                    <div className="w-40 h-24 sm:w-48 sm:h-28 bg-[#212121] rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-[#212121] rounded w-3/4" />
                      <div className="h-4 bg-[#212121] rounded w-1/2" />
                      <div className="h-4 bg-[#212121] rounded w-full" />
                      <div className="h-4 bg-[#212121] rounded w-1/4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoPlayer}>
            <motion.div
              className="bg-white text-black rounded-lg p-4 max-w-5xl w-full relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 50 }}
              transition={{ duration: 0.3 }}>
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl"
                onClick={closeVideoPlayer}>
                ×
              </button>
              <div className="w-full">
                {videoUrl && (
                  <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    controls
                    width="100%"
                    height="auto"
                    playing={true}
                    onError={(e) => setError(`Video playback error: ${e}`)}
                  />
                )}
                {!videoUrl && <p className="text-red-600 text-center">Loading video... {error}</p>}
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600 mr-4">{formatViewCount(selectedVideo.viewCount)}</span>
                  <span className="text-sm text-gray-600">{selectedVideo.uploadDate || "Unknown date"}</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                    {selectedVideo.thumbnails && selectedVideo.thumbnails.length > 0 && (
                      <Image
                        src={selectedVideo.thumbnails[0].url}
                        alt={selectedVideo.channelname || "Channel"}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{selectedVideo.channelname || "Unknown channel"}</p>
                    <p className="text-xs text-gray-500">Subscriber count unavailable</p>
                  </div>
                  <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700">Subscribe</button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-700 line-clamp-3">{selectedVideo.description || "No description available"}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.footer
        className="bg-[#212121] w-full py-3 fixed bottom-0 left-0 flex justify-around items-center shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}>
        <button className="text-[#aaaaaa] hover:text-[#ff0000] text-center flex-1 py-2" onClick={handleTrending}>
          <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <span className="text-xs mt-1 block">Trending</span>
        </button>
        <button className="text-[#aaaaaa] hover:text-[#ff0000] text-center flex-1 py-2">
          <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-xs mt-1 block">Home</span>
        </button>
        <button className="text-[#aaaaaa] hover:text-[#ff0000] text-center flex-1 py-2">
          <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
          </svg>
          <span className="text-xs mt-1 block">Download</span>
        </button>
      </motion.footer>
    </div>
  );
}