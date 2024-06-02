import React from "react";
import { motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <motion.nav className="bg-neutral-800 p-4 flex items-center justify-center font-bold uppercase">
          <motion.ul className="flex space-x-4">
            <motion.li>
              <Link to="/" className="text-white hover:text-neutral-400">
                Home
              </Link>
            </motion.li>
            <motion.li>
              <Link to="/about" className="text-white hover:text-neutral-400">
                About
              </Link>
            </motion.li>
            <motion.li>
              <Link to="/contact" className="text-white hover:text-neutral-400">
                Contact
              </Link>
            </motion.li>
          </motion.ul>
        </motion.nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
