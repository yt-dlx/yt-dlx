// Import the YouTubeDLX library using ES module syntax
import YouTubeDLX from "yt-dlx";
// Import path for file path operations (if using cookie files)
import path from "path";
// Import setTimeout for delays (if needed)
import { setTimeout as sleep } from "timers/promises";

// Define an asynchronous function to fetch the home feed
async function fetchHomeFeed() {
  try {
    // Example 1: Fetch home feed using a cookie string and verbose output
    console.log("Fetching home feed with cookie string (verbose)...");
    // Call the HomeFeed function with cookies and verbose options
    YouTubeDLX.Account.HomeFeed({
      cookies: "YOUR_YOUTUBE_COOKIE_STRING_HERE", // Provide your actual YouTube cookie string
      verbose: true, // Enable detailed logging
    })
      // Listen for the 'data' event
      .on("data", feed => {
        console.log("Home feed received (cookie string, verbose):");
        // Display counts of videos and shorts
        console.log(` - Videos found: ${feed.data?.Videos.length ?? 0}`);
        console.log(` - Shorts found: ${feed.data?.Shorts.length ?? 0}`);
      })
      // Listen for the 'error' event
      .on("error", err => {
        console.error("Error fetching home feed (cookie string, verbose):", err);
      });

    // Wait for 2 seconds before the next request (optional)
    await sleep(2000);

    // Example 2: Fetch home feed using a cookies file path and sort 'old-to-new'
    console.log("\nFetching home feed with cookies file and sorting (old-to-new)...");
    // Define the path to the cookies file
    const cookiesFilePath = "path/to/your/cookies.txt"; // Replace with your actual file path
    // Call the HomeFeed function with file path and sorting
    YouTubeDLX.Account.HomeFeed({
      cookies: cookiesFilePath,
      sort: "old-to-new", // Sort results from oldest to newest (based on internal logic)
    })
      // Attach data handler
      .on("data", feed => {
        console.log("Home feed received (cookies file, sorted old-to-new):");
        // Log the titles of the first 3 videos if available
        if (feed.data?.Videos.length > 0) {
          console.log("   - Oldest Video Titles:");
          feed.data.Videos.slice(0, 3).forEach(video => console.log(`     - ${video.title}`));
        } else {
          console.log("   - No videos found in this feed batch.");
        }
      })
      // Attach error handler
      .on("error", err => {
        console.error("Error fetching home feed (cookies file, sorted old-to-new):", err);
      });
  } catch (error) {
    // Catch synchronous errors if any occur during setup
    console.error("Error setting up home feed fetch:", error);
  }
}

// Run the main function
fetchHomeFeed();
