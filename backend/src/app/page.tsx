/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a video or playlist to search.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      // Search videos
      let response = await fetch(`/api/Mixed/Search_Multiple_Videos?query=${encodeURIComponent(searchQuery)}`);
      // Log raw response for debugging
      const rawText = await response.text();
      console.log("Raw video response:", rawText);

      let data;
      try {
        data = JSON.parse(rawText);
      } catch (jsonError) {
        console.error("JSON parse error for videos:", jsonError);
        throw new Error("Invalid response format from server.");
      }

      if (response.ok && Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        // Search playlists
        response = await fetch(`/api/Mixed/Search_Multiple_Playlists?playlistLink=${encodeURIComponent(searchQuery)}`);
        const playlistText = await response.text();
        console.log("Raw playlist response:", playlistText);

        try {
          data = JSON.parse(playlistText);
        } catch (jsonError) {
          console.error("JSON parse error for playlists:", jsonError);
          throw new Error("Invalid response format from server.");
        }

        if (response.ok && Array.isArray(data) && data.length > 0) {
          setResults(data);
        } else {
          setError("No videos or playlists found.");
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <header className="flex items-center mt-10 mb-5">
        <svg className="w-12 h-12 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.5 6.5c-.3-1.1-1.1-2-2.2-2.3C19.1 4 12 4 12 4s-7.1 0-9.3.2c-1.1.3-1.9 1.2-2.2 2.3C.2 8.6 0 12 0 12s.2 3.4.5 5.5c.3 1.1 1.1 2 2.2 2.3 2.2.2 9.3.2 9.3.2s7.1 0 9.3-.2c1.1-.3 1.9-1.2 2.2-2.3.3-2.1.5-5.5.5-5.5s-.2-3.4-.5-5.5zM9.5 15.5v-7l6 3.5-6 3.5z" />
        </svg>
        <h1 className="text-4xl font-extrabold">YouTubeMax</h1>
      </header>
      <p className="text-center text-gray-400 mb-5">Find your favorite videos and playlists.</p>
      <div className="flex items-center bg-gray-800 rounded-xl p-2 shadow-lg mb-5 max-w-2xl mx-auto">
        <input
          type="text"
          className="flex-1 bg-transparent text-white placeholder-gray-500 text-base p-3 outline-none"
          placeholder="Video name, ID, link, or playlist..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          autoCapitalize="none"
          autoCorrect="off"
        />
        <button className="bg-red-600 p-3 rounded-lg disabled:opacity-50" onClick={handleSearch} disabled={isLoading}>
          {isLoading ? (
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Search className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      {error && <p className="text-red-400 text-center mb-3">{error}</p>}
      <div className="max-w-2xl mx-auto">
        {results.length > 0
          ? results.map(item => (
              <div key={item.id} className="flex items-center bg-gray-800 rounded-lg p-3 mb-3 shadow-md">
                {item.thumbnails && item.thumbnails[0]?.url && <Image src={item.thumbnails[0].url} alt={item.title || "Thumbnail"} width={80} height={60} className="rounded-md mr-3" />}
                <div className="flex-1">
                  <p className="text-base text-white">{item.title || "Untitled"}</p>
                  <p className="text-sm text-gray-500">
                    {item.viewCount} views • {item.uploadDate}
                  </p>
                </div>
              </div>
            ))
          : !isLoading && !error && <p className="text-gray-500 text-center mt-5">Search to find videos or playlists.</p>}
      </div>
    </div>
  );
}
