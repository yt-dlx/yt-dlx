import React from "react";
import HomePage from "./pages";
import IPCPage from "./pages/IPCPage";
import VideoId from "./pages/videoId";
import { RiHome5Fill } from "react-icons/ri";
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";
import AudioLowest from "./pages/docs/Audio/AudioLowest";
import AudioCustom from "./pages/docs/Audio/AudioCustom";
import AudioHighest from "./pages/docs/Audio/AudioHighest";
import VideoLowest from "./pages/docs/Video/VideoLowest";
import VideoCustom from "./pages/docs/Video/VideoCustom";
import VideoHighest from "./pages/docs/Video/VideoHighest";
import AudioVideoLowest from "./pages/docs/AudioVideo/AudioVideoLowest";
import AudioVideoCustom from "./pages/docs/AudioVideo/AudioVideoCustom";
import AudioVideoHighest from "./pages/docs/AudioVideo/AudioVideoHighest";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const Navigation: () => JSX.Element = () => {
  const navigate = useNavigate();
  const handleBack = (): void => navigate(-1);
  const handleForward = (): void => navigate(1);
  return (
    <nav className="navbar bg-red-800/10 shadow-red-800/20 shadow-2xl text-white/60 backdrop-blur-md fixed z-50 top-0 flex justify-between items-center px-4">
      <Link
        to="/"
        className="text-red-600 cursor-pointer text-xl font-bold flex items-center gap-1 hover:scale-105 duration-500 hover:animate-pulse"
      >
        <RiHome5Fill size={20} />
        yt-dlx <span className="text-[10px]">Copyright © 2024</span>
      </Link>
      <ul className="flex space-x-2">
        <li>
          <button
            onClick={handleBack}
            className="text-red-700 font-black uppercase text-xs hover:text-red-600"
          >
            <IoCaretBackOutline className="text-red-600" size={30} />
          </button>
        </li>
        <li>
          <button
            onClick={handleForward}
            className="text-red-700 font-black uppercase text-xs hover:text-red-600"
          >
            <IoCaretForward className="text-red-600" size={30} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/IPCPage" element={<IPCPage />} />
          <Route path="/videoId/:id" element={<VideoId />} />
          <Route path="/AudioLowest" element={<AudioLowest />} />
          <Route path="/AudioCustom" element={<AudioCustom />} />
          <Route path="/AudioHighest" element={<AudioHighest />} />
          <Route path="/VideoLowest" element={<VideoLowest />} />
          <Route path="/VideoCustom" element={<VideoCustom />} />
          <Route path="/VideoHighest" element={<VideoHighest />} />
          <Route path="/AudioLowest" element={<AudioVideoLowest />} />
          <Route path="/AudioCustom" element={<AudioVideoCustom />} />
          <Route path="/AudioHighest" element={<AudioVideoHighest />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
