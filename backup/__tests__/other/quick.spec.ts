console.clear();
import AudioHighest from "../../routes/Audio/single/AudioHighest";
(async () => {
  var core = await AudioHighest({
    query: "21 savage - redrum",
    metadata: false,
    verbose: true,
    stream: false,
    useTor: false,
  });
  console.log("@AudioCustom:", core);
})();
