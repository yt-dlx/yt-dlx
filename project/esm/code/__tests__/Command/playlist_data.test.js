import YouTube from "../../";
import colors from "colors";
(async () => {
    try {
        console.log(colors.blue("@test:"), "ytSearch playlist single");
        const result = await YouTube.ytSearch.Playlist.Single({
            query: "https://youtube.com/playlist?list=PL06diOotXAJLAAHBY7kIUm5GQwm2ZinOz&si=raalOwdBLBtmJ9s5",
        });
        console.log(result);
    }
    catch (error) {
        console.error(colors.red(error.message));
    }
})();
//# sourceMappingURL=playlist_data.test.js.map