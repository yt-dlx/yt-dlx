import { Innertube, UniversalCache } from "youtubei.js";

async function searchWithInnerTube(query) {
  try {
    const InnerTubeClient = await Innertube.create({
      user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      cache: new UniversalCache(true, "./cache"),
      debug: false,
    });
    const InnerTubeClientResults = await InnerTubeClient.search(query, { filters: { type: "video" } });
    if (!InnerTubeClientResults || !InnerTubeClientResults.results || !InnerTubeClientResults.results.length) {
      console.error("Innertube: No results found");
      return [];
    }
    return InnerTubeClientResults.results.map(result => ({
      type: result.type || "Unknown",
      title: {
        text: result.title?.text || "Unknown",
        runs:
          result.title?.runs?.map(r => ({
            text: r.text || "Unknown",
            navigationEndpoint: {
              url: r.navigationEndpoint?.payload?.url || null,
              videoId: r.navigationEndpoint?.payload?.videoId || null,
            },
          })) || [],
      },
      videoId: result.video_id || "Unknown",
      expandableMetadata: result.expandable_metadata || null,
      snippets:
        result.snippets?.map(s => ({
          text: s.text?.text || "Unknown",
          hoverText: s.hover_text?.text || "Unknown",
        })) || [],
      thumbnails:
        result.thumbnails?.map(t => ({
          url: t.url || "Unknown",
          width: t.width || 0,
          height: t.height || 0,
        })) || [],
      thumbnailOverlays:
        result.thumbnail_overlays?.map(o => ({
          type: o.type || "Unknown",
          text: o.text?.text || o.text || "Unknown",
          style: o.style || null,
          isToggled: o.is_toggled || false,
          iconType: o.icon_type?.icon_type || null,
          tooltip: o.tooltip?.text || null,
          toggledEndpoint: o.toggled_endpoint?.payload?.url || null,
          untoggledEndpoint: o.untoggled_endpoint?.payload?.url || null,
        })) || [],
      richThumbnail:
        result.rich_thumbnail?.map(t => ({
          url: t.url || "Unknown",
          width: t.width || 0,
          height: t.height || 0,
        })) || [],
      author: {
        id: result.author?.id || "Unknown",
        name: result.author?.name || "Unknown",
        thumbnails:
          result.author?.thumbnails?.map(t => ({
            url: t.url || "Unknown",
            width: t.width || 0,
            height: t.height || 0,
          })) || [],
        url: result.author?.url || "Unknown",
        endpoint: {
          browseId: result.author?.endpoint?.payload?.browseId || "Unknown",
          url: result.author?.endpoint?.metadata?.url || "Unknown",
        },
        badges:
          result.author?.badges?.map(b => ({
            type: b.type || "Unknown",
            style: b.style || "Unknown",
            label: b.label || "Unknown",
          })) || [],
        isModerator: result.author?.is_moderator || false,
        isVerified: result.author?.is_verified || false,
        isVerifiedArtist: result.author?.is_verified_artist || false,
      },
      badges:
        result.badges?.map(b => ({
          type: b.type || "Unknown",
          style: b.style || "Unknown",
          label: b.label || "Unknown",
        })) || [],
      endpoint: {
        videoId: result.endpoint?.payload?.videoId || "Unknown",
        url: result.endpoint?.metadata?.url || "Unknown",
        pageType: result.endpoint?.metadata?.page_type || "Unknown",
        params: result.endpoint?.payload?.params || "Unknown",
        playerParams: result.endpoint?.payload?.playerParams || "Unknown",
      },
      published: result.published?.text || "Unknown",
      viewCount: result.view_count?.text || "Unknown",
      shortViewCount: result.short_view_count?.text || "Unknown",
      showActionMenu: result.show_action_menu || false,
      isWatched: result.is_watched || false,
      menu: {
        type: result.menu?.type || "Unknown",
        label: result.menu?.label || "Unknown",
        items:
          result.menu?.items?.map(i => ({
            title: i.title || "Unknown",
            serviceEndpoint: i.service_endpoint?.payload?.queueAddEndpoint?.queueTarget?.videoId || i.service_endpoint?.payload?.signal || "Unknown",
          })) || [],
        flexibleItems: result.menu?.flexible_items?.length || 0,
        topLevelButtons: result.menu?.top_level_buttons?.length || 0,
      },
      searchVideoResultEntityKey: result.search_video_result_entity_key || "Unknown",
      lengthText: result.length_text?.text || "Unknown",
    }));
  } catch (error) {
    console.error("Innertube error:", error.message);
    return [];
  }
}

(async () => {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => !args[0]?.includes("[YOUTUBEJS][Text]") && originalConsoleWarn(...args);
  console.warn = (...args) => !args[0]?.includes("[YOUTUBEJS][Parser]") && originalConsoleWarn(...args);
  try {
    const innerTubeResults = await searchWithInnerTube("Haseen by Talwinder");
    if (!innerTubeResults.length) console.error("No valid results from Innertube");
    console.log(innerTubeResults[0]);
  } catch (error) {
    console.error("Main execution error:", error.message);
  } finally {
    console.warn = originalConsoleWarn;
  }
})();
// async function performOperations(yt) {
// try {
// const UnseenNotificationsCount = await yt.getUnseenNotificationsCount();
// const SubscriptionsFeed = await yt.getSubscriptionsFeed();
// const Comments = await yt.getComments("kJi_cNVStMo");
// const HomeFeed = await yt.getHomeFeed();
// const Library = await yt.getLibrary();
// const history = await yt.getHistory();
// history.sections.forEach((section, index) => {
// console.log(`Section ${index + 1}: ${section.header?.title || "Untitled Section"}`);
// if (section.contents && Array.isArray(section.contents)) {
// section.contents.forEach((item, itemIndex) => {
// if (item.type === "Video" || item.type === "CompactVideo") {
// console.log(`  Video ${itemIndex + 1}:`);
// console.log(`    Title: ${item.title || "N/A"}`);
// console.log(`    Video ID: ${item.video_id || "N/A"}`);
// console.log(`    Channel: ${item.author?.title || "N/A"}`);
// console.log(`    Duration: ${item.length?.text || "N/A"}`);
// console.log(`    Views: ${item.view_count?.text || "N/A"}`);
// console.log(`    Published: ${item.published?.text || "N/A"}`);
// } else console.log(`  Item ${itemIndex + 1}: Non-video content (${item.type || "Unknown"})`);
// });
// } else console.log("  No contents available in this section.");
// });
// } catch (error) {
// console.error("Error fetching history:", error.message);
// }
// }
