// Import the YouTubeDLX library
import YouTubeDLX from "yt-dlx";

// Define an asynchronous function to fetch the home feed
async function fetchHomeFeed() {
  try {
    // Example 1: Fetch home feed using a cookie string
    console.log("Fetching home feed with cookie string...");
    // Call the HomeFeed function with the required cookies option
    YouTubeDLX.Account.HomeFeed({ cookies: "YOUR_YOUTUBE_COOKIE_STRING_HERE" })
      // Listen for the 'data' event which contains the feed data
      .on("data", feed => {
        console.log("Home feed received (cookie string):");
        // Log the number of videos and shorts found
        console.log(` - Videos: ${feed.data?.Videos.length}`);
        console.log(` - Shorts: ${feed.data?.Shorts.length}`);
        // Optionally, log the full feed data (can be large)
        // console.log(JSON.stringify(feed, null, 2));
      })
      // Listen for the 'error' event in case something goes wrong
      .on("error", err => {
        console.error("Error fetching home feed (cookie string):", err);
      });

    // Add a small delay between requests (optional, good practice)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Example 2: Fetch home feed using a path to a cookies file, enable verbose logging, and sort by newest
    console.log("\nFetching home feed with cookies file, verbose mode, and sorting...");
    // Call the HomeFeed function with cookies file path, verbose, and sort options
    YouTubeDLX.Account.HomeFeed({
      cookies: "path/to/your/cookies.txt", // Replace with the actual path to your cookies file
      verbose: true, // Enable detailed logging from yt-dlx
      sort: "newest", // Sort the feed items, showing the newest first
    })
      // Listen for the 'data' event
      .on("data", feed => {
        console.log("Home feed received (cookies file, verbose, sorted):");
        console.log(` - Videos: ${feed.data?.Videos.length}`);
        // Log titles of the first 5 videos if available
        if (feed.data?.Videos.length > 0) {
          console.log("   - Newest Video Titles:");
          feed.data.Videos.slice(0, 5).forEach((video: any) => console.log(`     - ${video.title}`));
        }
        console.log(` - Shorts: ${feed.data?.Shorts.length}`);
      })
      // Listen for the 'error' event
      .on("error", err => {
        console.error("Error fetching home feed (cookies file, verbose, sorted):", err);
      });

    // Example 3: Fetch home feed and handle errors differently
    console.log("\nFetching home feed with alternative error handling...");
    // Call the HomeFeed function
    const feedEmitter = YouTubeDLX.Account.HomeFeed({
      cookies: "YOUR_YOUTUBE_COOKIE_STRING_HERE", // Use cookie string again or file path
      sort: "oldest", // Sort to get the oldest items first
    });

    // Handle data using a separate function
    const handleData = (feed: any) => {
      console.log("Home feed received (alternative handling):");
      console.log(` - Videos: ${feed.data?.Videos.length}`);
      console.log(` - Shorts: ${feed.data?.Shorts.length}`);
      // Process the oldest video if it exists
      if (feed.data?.Videos.length > 0) {
        console.log(`   - Oldest Video ID: ${feed.data.Videos[0].videoId}`);
      }
    };

    // Handle errors using a separate function
    const handleError = (err: any) => {
      console.error("Error fetching home feed (alternative handling):", err);
      // Perform specific actions based on the error type if needed
    };

    // Attach the handlers to the emitter
    feedEmitter.on("data", handleData);
    feedEmitter.on("error", handleError);
  } catch (error) {
    // Catch any synchronous errors during setup (less likely here as it's event-based)
    console.error("Synchronous error setting up home feed fetch:", error);
  }
}

// Execute the function
fetchHomeFeed();
