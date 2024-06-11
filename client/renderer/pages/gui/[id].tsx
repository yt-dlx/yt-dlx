import react from "react";
import { useRouter } from "next/router";
import NavPackage from "../components/nav";
import FootPackage from "../components/foot";
import Introduction from "../home/Introduction";

export default function VideoId(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [TubeSearch, setTubeSearch] = react.useState<any>(null);

  react.useEffect(() => {
    if (typeof id === "string" && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
      window.ipc.send("search", { videoId: id });
    } else {
      try {
        window.history.back();
      } catch {
        router.push("/home");
      }
    }
  }, [id]);

  react.useEffect(() => {
    if (typeof id === "string") {
      window.ipc.on("search", (response: string) => setTubeSearch(response));
    }
  }, [id]);

  return (
    <main className="overflow-x-hidden max-h-screen scrollbar-thin bg-neutral-950 scrollbar-track-neutral-950 scrollbar-thumb-red-600">
      <NavPackage />
      <Introduction />
      <react.Fragment>
        {TubeSearch ? (
          <section className="flex flex-col items-center justify-center">
            <div className="max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
              <section className="flex flex-col items-center justify-center">
                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 bg-neutral-900 border-4 border-[#cd322d6e] rounded-3xl shadow-red-600 shadow-[0_0_80px_rgba(255,0,0,0.5)]">
                  <div className="overflow-x-auto">
                    <section className="max-w-screen-2xl px-6 mx-auto p-1">
                      <iframe
                        allowFullScreen
                        title="yt-dlx player"
                        src={`https://www.youtube.com/embed/${id}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        className="w-full h-64 mt-4 rounded-t-3xl md:h-80 border-b-4 border-[#cd322d6e] shadow-red-600 shadow-2xl"
                      />
                      <h2 className="mt-6 text-6xl font-black text-red-600">
                        {TubeSearch.title}
                      </h2>
                      <p className="mt-8 leading-loose text-white font-semibold lowercase text-sm">
                        <span className="text-red-600 font-black text-lg">
                          @description:{" "}
                        </span>
                        {TubeSearch.description}
                      </p>
                      <ul className="text-white font-semibold p-1 mb-4 text-sm">
                        <li>
                          <span className="text-red-600 font-black text-lg">
                            @videoId:
                          </span>{" "}
                          {TubeSearch.id}
                        </li>
                        <li>
                          <span className="text-red-600 font-black text-lg">
                            @channelid:
                          </span>{" "}
                          {TubeSearch.channelid}
                        </li>
                        <li>
                          <span className="text-red-600 font-black text-lg">
                            @channelname:
                          </span>{" "}
                          {TubeSearch.channelname}
                        </li>
                        <li>
                          <span className="text-red-600 font-black text-lg">
                            @duration:
                          </span>{" "}
                          {TubeSearch.duration}
                        </li>
                        <li>
                          <span className="text-red-600 font-black text-lg">
                            @uploadDate:
                          </span>{" "}
                          {TubeSearch.uploadDate}
                        </li>
                        <li>
                          <span className="text-red-600 font-black text-lg">
                            @viewCount:
                          </span>{" "}
                          {TubeSearch.viewCount}
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </section>
        ) : (
          <section className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-4 w-96">
              <div className="skeleton bg-red-600 border-4 border-neutral-800/60 h-40 w-full shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
              <div className="skeleton bg-red-600 border-4 border-neutral-800/60 h-10 w-28 shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
              <div className="skeleton bg-red-600 border-4 border-neutral-800/60 h-10 w-full shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
              <div className="skeleton bg-red-600 border-4 border-neutral-800/60 h-10 w-full shadow-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]"></div>
            </div>
          </section>
        )}
      </react.Fragment>
      <FootPackage />
    </main>
  );
}
