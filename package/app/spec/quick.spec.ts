import colors from "colors";
import TubeLogin, { TubeType } from "../utils/TubeLogin";
import path from "path";
interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: "success" | "error";
}
function extractText(textObj: any): { runs?: any[]; text: string } {
  return { runs: textObj?.runs || undefined, text: textObj?.text || textObj?.runs?.[0]?.text || "" };
}
function sanitizeRenderer(renderer: any): any {
  if (!renderer) return null;
  const result: any = { type: renderer.type };
  for (const key in renderer) {
    if (key === "type") continue;
    if (Array.isArray(renderer[key])) result[key] = renderer[key].map((item: any) => (typeof item === "object" ? sanitizeRenderer(item) : item));
    else if (typeof renderer[key] === "object") result[key] = sanitizeRenderer(renderer[key]);
    else result[key] = renderer[key];
  }
  return result;
}
function sanitizeContentItem(item: any): any {
  if (!item) return null;
  if (item.type === "RichItem" && item.content?.videoRenderer) {
    return {
      type: "RichItem",
      content: {
        videoId: item.content.videoRenderer.videoId || "",
        title: extractText(item.content.videoRenderer.title),
        thumbnail: item.content.videoRenderer.thumbnail?.thumbnails?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [],
      },
    };
  } else if (item.type === "RichSection") return { type: "RichSection", content: item.content ? sanitizeRenderer(item.content) : null };
  else if (item.type === "ContinuationItem") return { type: "ContinuationItem" };
  return item;
}
function sanitizeFeedFilterChipBar(chipBar: any): any {
  return { type: chipBar.type, contents: chipBar.contents?.map((chip: any) => ({ text: extractText(chip.text), isSelected: chip.isSelected || false })) || [] };
}
function sanitizeCommentThread(thread: any): any {
  return {
    type: thread.type,
    comment:
      thread.comment?.map((c: any) => ({
        commentId: c.commentId || "",
        contentText: extractText(c.contentText),
        authorText: extractText(c.authorText),
        authorThumbnail: c.authorThumbnail?.thumbnails?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [],
      })) || [],
    commentRepliesData: thread.comment_replies_data ? { replies: thread.comment_replies_data.replies?.map(sanitizeCommentThread) || [] } : null,
    isModeratedElqComment: thread.is_moderated_elq_comment || false,
    hasReplies: thread.has_replies || false,
  };
}
function sanitizeCustomEmoji(emoji: any): any {
  return { emojiId: emoji.emojiId || "", shortcuts: emoji.shortcuts || [], image: { thumbnails: emoji.image?.thumbnails?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [] } };
}
async function fetchUnseenNotifications(client: TubeType): Promise<ApiResponse<{ count: number }>> {
  try {
    const count = await client.getUnseenNotificationsCount();
    return { status: "success", data: { count: Number(count) || 0 } };
  } catch (error) {
    return { status: "error", message: `Failed to fetch notifications: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
async function fetchSubscriptionsFeed(client: TubeType): Promise<ApiResponse<{ contents: any[] }>> {
  try {
    const feed = await client.getSubscriptionsFeed();
    const contents = (feed as any).contents?.map(sanitizeContentItem) || [];
    return { status: "success", data: { contents } };
  } catch (error) {
    return { status: "error", message: `Failed to fetch subscriptions feed: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
async function fetchHomeFeed(client: TubeType): Promise<ApiResponse<{ header: any; contents: any }>> {
  try {
    const homeFeed = await client.getHomeFeed();
    return {
      status: "success",
      data: {
        header: { type: homeFeed.header?.type || "", title: extractText(homeFeed.header?.title) },
        contents: {
          type: homeFeed.contents?.type || "",
          targetId: (homeFeed.contents as any)?.target_id || "",
          header: sanitizeFeedFilterChipBar((homeFeed.contents as any)?.header),
          contents: (homeFeed.contents as any)?.contents?.map(sanitizeContentItem) || [],
        },
      },
    };
  } catch (error) {
    return { status: "error", message: `Failed to fetch home feed: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
async function fetchComments(client: TubeType, videoId: string): Promise<ApiResponse<{ header: any; contents: any[] }>> {
  try {
    const comments = await client.getComments(videoId);
    return {
      status: "success",
      data: {
        header: {
          type: comments.header?.type || "",
          title: extractText(comments.header?.title),
          count: extractText(comments.header?.count),
          commentsCount: extractText(comments.header?.comments_count),
          createRenderer: {
            type: comments.header?.create_renderer?.type || "",
            avatarSize: (comments.header?.create_renderer as any)?.avatar_size || "",
            placeholder: extractText((comments.header?.create_renderer as any)?.placeholder),
            submitButton: sanitizeRenderer((comments.header?.create_renderer as any)?.submit_button?.[0]),
            cancelButton: sanitizeRenderer((comments.header?.create_renderer as any)?.cancel_button?.[0]),
            authorThumbnail: (comments.header?.create_renderer as any)?.author_thumbnail?.map((t: any) => ({ url: t.url, width: t.width, height: t.height })) || [],
          },
          sortMenu: {
            type: comments.header?.sort_menu?.type || "",
            label: comments.header?.sort_menu?.label || "",
            title: comments.header?.sort_menu?.title || "",
            tooltip: comments.header?.sort_menu?.tooltip || "",
            iconType: comments.header?.sort_menu?.icon_type || "",
            subMenuItems: comments.header?.sort_menu?.sub_menu_items?.map((item: any) => ({ title: item.title, selected: item.selected })) || [],
          },
          customEmojis: comments.header?.custom_emojis?.map(sanitizeCustomEmoji) || [],
        },
        contents: comments.contents?.map(sanitizeCommentThread) || [],
      },
    };
  } catch (error) {
    return { status: "error", message: `Failed to fetch comments: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
async function fetchHistory(client: TubeType): Promise<ApiResponse<{ sections: any[]; feedActions: any }>> {
  try {
    const history = await client.getHistory();
    return {
      status: "success",
      data: {
        sections: history.sections?.map((section: any) => ({ type: section.type, header: sanitizeRenderer(section.header?.[0]), contents: section.contents?.map(sanitizeContentItem) || [] })) || [],
        feedActions: { type: history.feed_actions?.type || "", contents: history.feed_actions?.contents?.map((action: any) => sanitizeRenderer(action)) || [] },
      },
    };
  } catch (error) {
    return { status: "error", message: `Failed to fetch history: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
async function fetchLibrary(client: TubeType): Promise<ApiResponse<{ header: any; sections: any[] }>> {
  try {
    const library = await client.getLibrary();
    return {
      status: "success",
      data: {
        header: {
          type: library.header?.type || "",
          pageTitle: library.header?.page_title || "",
          content: {
            type: library.header?.content?.type || "",
            banner: library.header?.content?.banner || null,
            title: extractText(library.header?.content?.title),
            heroImage: library.header?.content?.hero_image || null,
            image: sanitizeRenderer(library.header?.content?.image),
            description: library.header?.content?.description || null,
            actions: sanitizeRenderer(library.header?.content?.actions),
            attributation: library.header?.content?.attributation || null,
            metadata: sanitizeRenderer(library.header?.content?.metadata),
            animatedImage: library.header?.content?.animated_image || null,
          },
        },
        sections: library.sections?.map((section: any) => ({ type: section.type, header: sanitizeRenderer(section.header?.[0]), contents: section.contents?.map(sanitizeContentItem) || [] })) || [],
      },
    };
  } catch (error) {
    return { status: "error", message: `Failed to fetch library: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
async function main(): Promise<void> {
  try {
    console.log(colors.green("@info:"), "Connecting to YouTube...");
    const Tubed = await TubeLogin(path.resolve(process.cwd(), "cookies.txt"));
    console.log(colors.green("@info:"), "Connected to YouTube.");
    const results = await Promise.all([
      fetchComments(Tubed, "kJi_cNVStMo"),
      fetchUnseenNotifications(Tubed),
      fetchSubscriptionsFeed(Tubed),
      fetchHomeFeed(Tubed),
      fetchHistory(Tubed),
      fetchLibrary(Tubed),
    ]);
    results.forEach((result, index) => {
      const labels = ["Unseen Notifications", "Subscriptions Feed", "Home Feed", "Comments", "History", "Library"];
      console.log(colors.green(`@info: ${labels[index]}`));
      console.log(JSON.stringify(result, null, 2));
      console.log(colors.green("@info:"), "❣️ Thank you for using yt-dlx. Consider ⭐starring the GitHub repo https://github.com/yt-dlx.");
    });
  } catch (error) {
    console.error(colors.red("@error:"), `Main execution failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
main();
