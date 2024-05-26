console.clear();
import AudioHighest from "../../routes/Audio/single/AudioHighest";

(async () => {
  const data = await AudioHighest({
    query: "21 savage - redrum",
    verbose: true,
    extract: true,
    stream: true,
    useTor: true,
  });
  console.log("@AudioHighest:", data);
})();
