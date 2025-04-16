// Import the express library
const express = require("express");
// Import the YouTubeDLX library
const YouTubeDLX = require("yt-dlx");

// Initialize express app
const app = express();
// Define port
const port = 3000;

// Middleware for parsing request bodies (optional)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the GET route handler for /home-feed
app.get("/home-feed", (req, res) => {
  // Extract query parameters
  const cookies = req.query.cookies;
  const sort = req.query.sort;
  const verbose = req.query.verbose === "true"; // Convert verbose string to boolean

  // Validate if cookies parameter exists
  if (!cookies) {
    return res.status(400).json({ error: "Query parameter 'cookies' is mandatory." });
  }

  // Optional: Validate the sort parameter
  const validSorts = ["oldest", "newest", "old-to-new", "new-to-old"];
  const sortOption = validSorts.includes(sort) ? sort : undefined;

  try {
    // Initiate the home feed fetch
    const feedEmitter = YouTubeDLX.Account.HomeFeed({
      cookies: cookies, // Use cookies from request
      sort: sortOption, // Use validated sort option
      verbose: verbose, // Use verbose flag
    });

    // Set up event handler for successful data fetch
    feedEmitter.on("data", feed => {
      console.log(`API Call: Fetched home feed. Sort: ${sortOption || "N/A"}, Verbose: ${verbose}`);
      // Send the data back to the client
      res.status(200).json(feed);
    });

    // Set up event handler for errors
    feedEmitter.on("error", err => {
      console.error("API Call: Error fetching home feed:", err);
      // Send an error response
      res.status(500).json({ error: "Could not fetch YouTube home feed.", details: err });
    });
  } catch (error) {
    // Catch synchronous errors during setup
    console.error("API Call: Error setting up home feed fetch:", error);
    res.status(500).json({ error: "Server error during setup." });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`CommonJS Express server running on http://localhost:${port}`);
  console.log(`Usage example: curl "http://localhost:${port}/home-feed?cookies=YOUR_COOKIE_STRING&sort=oldest"`);
});
