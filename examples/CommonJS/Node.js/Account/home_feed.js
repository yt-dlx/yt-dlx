// Import the YouTubeDLX library using require
const YouTubeDLX = require("yt-dlx");
// Import path module for handling file paths
const path = require("path");

// Define an asynchronous function (using async IIFE or top-level await if supported)
(async () => {
  try {
    // Example 1: Fetch home feed using a cookie string
    console.log("Fetching home feed with cookie string...");
    // Call the function, providing the cookies option
    YouTubeDLX.Account.HomeFeed({ cookies: "YOUR_YOUTUBE_COOKIE_STRING_HERE" })
      // Handle the 'data' event
      .on("data", feed => {
        console.log("Home feed received (cookie string):");
        // Log the count of videos and shorts
        console.log(` - Videos: ${feed.data?.Videos?.length || 0}`);
        console.log(` - Shorts: ${feed.data?.Shorts?.length || 0}`);
      })
      // Handle the 'error' event
      .on("error", err => {
        console.error("Error fetching home feed (cookie string):", err);
      });

    // Optional delay using a Promise-based timeout
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Example 2: Fetch home feed using cookies file, verbose, and sort 'new-to-old'
    console.log("\nFetching home feed with cookies file, verbose, and sorting (new-to-old)...");
    // Construct the path to the cookies file
    const cookiesFilePath = path.join(__dirname, "your_cookies.txt"); // Replace with your file name/path
    // Call the function with multiple options
    YouTubeDLX.Account.HomeFeed({
      cookies: cookiesFilePath, // Provide the file path
      verbose: true, // Enable verbose logging
      sort: "new-to-old", // Sort items from newest to oldest
    })
      // Handle data event
      .on("data", feed => {
        console.log("Home feed received (cookies file, verbose, sorted):");
        // Display the title of the newest video if available
        if (feed.data?.Videos?.length > 0) {
          console.log(`   - Newest Video Title: ${feed.data.Videos[0].title}`);
        }
        // Display the title of the newest short if available
        if (feed.data?.Shorts?.length > 0) {
          console.log(`   - Newest Short Title: ${feed.data.Shorts[0].title}`);
        }
      })
      // Handle error event
      .on("error", err => {
        console.error("Error fetching home feed (cookies file, verbose, sorted):", err);
      });
  } catch (error) {
    // Catch any synchronous errors during setup
    console.error("Failed to initiate home feed fetch:", error);
  }
})(); // Immediately invoke the async function
