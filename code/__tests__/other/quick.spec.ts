console.clear();
import AudioCustom from "../../routes/Audio/single/AudioCustom";

(async () => {
  var core = await AudioCustom({
    query: "21 savage - redrum",
    resolution: "medium",
    metadata: false,
    verbose: true,
    stream: false,
    useTor: true,
  });
  console.log("@AudioCustom:", core);
})();
