// Import the YouTubeDLX library using require
const YouTubeDLX = require("yt-dlx");
// Import path module for handling file paths
const path = require("path");

// Define an asynchronous function (using async IIFE)
(async () => {
  try {
    // Example 1: Fetch subscriptions feed using a cookie string and verbose
    console.log("Fetching subscriptions feed (cookie string, verbose)...");
    // Call the function, providing cookies and verbose options
    YouTubeDLX.Account.SubscriptionsFeed({
      cookies: "YOUR_YOUTUBE_COOKIE_STRING_HERE", // Replace with your cookies
      verbose: true, // Enable detailed logs
    })
      // Handle the 'data' event
      .on("data", feed => {
        console.log("Subscriptions feed received (cookie string, verbose):");
        // Log the count of items
        console.log(` - Items: ${feed.data?.contents?.length || 0}`);
      })
      // Handle the 'error' event
      .on("error", err => {
        console.error("Error fetching subscriptions feed (cookie string, verbose):", err);
      });

    // Optional delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Example 2: Fetch subscriptions feed using cookies file (no verbose)
    console.log("\nFetching subscriptions feed (cookies file)...");
    // Construct the path to the cookies file relative to the script
    const cookiesFilePath = path.join(__dirname, "your_cookies.txt"); // Adjust file name/path
    // Call the function with only the cookies file path
    YouTubeDLX.Account.SubscriptionsFeed({
      cookies: cookiesFilePath,
    })
      // Handle data event
      .on("data", feed => {
        console.log("Subscriptions feed received (cookies file):");
        console.log(` - Items: ${feed.data?.contents?.length || 0}`);
        // Log titles of the first 2 items if available
        if (feed.data?.contents?.length > 0) {
          console.log("   - First 2 item titles:");
          feed.data.contents.slice(0, 2).forEach((item, i) => {
            console.log(`     [${i + 1}] ${item?.content?.title?.text || "N/A"}`);
          });
        }
      })
      // Handle error event
      .on("error", err => {
        console.error("Error fetching subscriptions feed (cookies file):", err);
      });
  } catch (error) {
    // Catch any synchronous errors during setup
    console.error("Failed to initiate subscriptions feed fetch:", error);
  }
})(); // Immediately invoke the async function
