// Import necessary libraries
import express, { Request, Response } from "express";
import YouTubeDLX from "yt-dlx";

// Initialize the Express application
const app = express();
// Define the port the server will listen on
const port = 3000;

// Middleware to parse JSON request bodies (optional, if needed)
app.use(express.json());
// Middleware to parse URL-encoded request bodies (useful for form data)
app.use(express.urlencoded({ extended: true }));

// Define a GET route to fetch the home feed
// Expects 'cookies' query parameter (and optionally 'sort' and 'verbose')
app.get("/home-feed", (req: Request, res: Response) => {
  // Extract cookies, sort, and verbose options from the query parameters
  const cookies = req.query.cookies as string;
  const sort = req.query.sort as "oldest" | "newest" | "old-to-new" | "new-to-old" | undefined;
  // Convert verbose query param to boolean, default to false if not 'true'
  const verbose = req.query.verbose === "true";

  // Basic validation: Check if cookies are provided
  if (!cookies) {
    // Send a 400 Bad Request response if cookies are missing
    return res.status(400).json({ error: "Missing 'cookies' query parameter." });
  }

  try {
    // Call the HomeFeed function with the provided options
    const feedEmitter = YouTubeDLX.Account.HomeFeed({
      cookies: cookies, // Use the cookies from the query parameter (can be string or file path)
      sort: sort, // Pass the sort option if provided
      verbose: verbose, // Pass the verbose option
    });

    // Handle the 'data' event when the feed is successfully fetched
    feedEmitter.on("data", feed => {
      console.log(`Successfully fetched home feed for request (Sort: ${sort || "default"})`);
      // Send the fetched feed data back to the client as JSON
      res.status(200).json(feed);
    });

    // Handle the 'error' event if fetching fails
    feedEmitter.on("error", err => {
      console.error("Error fetching home feed via API:", err);
      // Send a 500 Internal Server Error response with the error details
      res.status(500).json({ error: "Failed to fetch home feed.", details: err });
    });
  } catch (error) {
    // Catch synchronous errors during the setup phase
    console.error("Error setting up home feed fetch in Express:", error);
    // Send a 500 Internal Server Error response
    res.status(500).json({ error: "Internal server error during setup." });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
  console.log(`Example Usage:`);
  console.log(` - Simple: http://localhost:${port}/home-feed?cookies=YOUR_COOKIE_STRING_OR_PATH`);
  console.log(` - With Sort & Verbose: http://localhost:${port}/home-feed?cookies=YOUR_COOKIE_STRING_OR_PATH&sort=newest&verbose=true`);
});
