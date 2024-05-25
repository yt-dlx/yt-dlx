console.clear();
import list_formats from "../../routes/command/list_formats";

(async () => {
  const data = await list_formats({
    query: "21 savage - redrum",
    verbose: true,
  });
  // =============================================
  console.log("@AudioLow:", data.AudioLow);
  console.log("@AudioLowDRC:", data.AudioLowDRC);
  console.log("@AudioHigh:", data.AudioHigh);
  console.log("@AudioHighDRC:", data.AudioHighDRC);
  // =============================================
  console.log("@VideoLow:", data.VideoLow);
  console.log("@VideoLowHDR:", data.VideoLowHDR);
  console.log("@VideoHigh:", data.VideoHigh);
  console.log("@VideoHighHDR:", data.VideoHighHDR);
  // =============================================
  console.log("@ManifestLow:", data.ManifestLow);
  console.log("@ManifestHigh:", data.ManifestHigh);
})();
