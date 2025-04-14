import colors from "colors";
import TubeLogin from "../utils/TubeLogin";

async function main(): Promise<void> {
  const client = await TubeLogin();
  const unseenNotifications = await client.getUnseenNotificationsCount();
  const subscriptions = await client.getSubscriptionsFeed();
  const comments = await client.getComments("kJi_cNVStMo");
  const history = await client.getHistory();
  const homeFeed = await client.getHomeFeed();
  const library = await client.getLibrary();
  const printInfo = (label: string, data: unknown) => {
    console.log(colors.green("@info:"), `${label}:`, data);
    console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider ⭐starring the GitHub repo https://github.com/yt-dlx.");
  };
  printInfo("Unseen Notifications", unseenNotifications);
  printInfo("Subscriptions Feed", subscriptions);
  printInfo("Home Feed", homeFeed);
  printInfo("Comments", comments);
  printInfo("History", history);
  printInfo("Library", library);
}

main();
