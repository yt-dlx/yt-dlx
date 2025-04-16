// Import the express library
import express from "express";
// Import the YouTubeDLX library
import YouTubeDLX from "yt-dlx";

// Initialize the express app
const app = express();
// Define the port
const port = 3000;

// Middleware for parsing request bodies (optional)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the GET route for fetching the home feed
app.get("/home-feed", (req, res) => {
  // Get 'cookies', 'sort', and 'verbose' from query parameters
  const { cookies, sort, verbose } = req.query;

  // Validate that cookies are provided
  if (!cookies) {
    // Send error response if cookies are missing
    return res.status(400).json({ error: "Query parameter 'cookies' is required." });
  }

  // Convert verbose to boolean ('true' string becomes true, otherwise false)
  const isVerbose = verbose === "true";
  // Define allowed sort values for validation (optional but good practice)
  const allowedSorts = ["oldest", "newest", "old-to-new", "new-to-old"];
  // Use the provided sort value only if it's one of the allowed ones
  const sortOrder = allowedSorts.includes(sort) ? sort : undefined;

  try {
    // Call the HomeFeed function with parameters from the request
    const feedEmitter = YouTubeDLX.Account.HomeFeed({
      cookies: cookies, // Pass the cookie string or file path
      sort: sortOrder, // Pass the validated sort order
      verbose: isVerbose, // Pass the verbose flag
    });

    // Handle successful data retrieval
    feedEmitter.on("data", feed => {
      console.log(`API: Successfully fetched home feed (Sort: ${sortOrder || "default"}, Verbose: ${isVerbose})`);
      // Send the feed data as a JSON response
      res.status(200).json(feed);
    });

    // Handle errors during the fetch process
    feedEmitter.on("error", err => {
      console.error("API: Error fetching home feed:", err);
      // Send an error response to the client
      res.status(500).json({ error: "Failed to fetch YouTube home feed.", details: err });
    });
  } catch (error) {
    // Catch synchronous errors during setup
    console.error("API: Error setting up home feed fetch:", error);
    // Send a generic server error response
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`ECMAScript Express server running at http://localhost:${port}`);
  console.log(`Test URL: http://localhost:${port}/home-feed?cookies=YOUR_COOKIES&sort=newest&verbose=true`);
});
