// "use client";
// import react from "react";
// import Link from "next/link";
// import Image from "next/image";
// import io from "socket.io-client";
// import * as socketIO from "socket.io-client";
// import { useQueryClient, useMutation } from "@tanstack/react-query";

// export default function PlayGround() {
// var QueryClient = useQueryClient();
// var [Query, setQuery] = react.useState<string>("");
// var [similar, setSimilar] = react.useState<string[]>([]);
// var [socket, setSocket] = react.useState<socketIO.Socket>();
// var [TubeSearch, setTubeSearch] = react.useState<any>(null);

// var ApiSearch = useMutation({
// mutationFn: async () => {
// var resp = await fetch("/api/search", {
// method: "POST",
// headers: {
// "Content-Type": "application/json",
// },
// body: JSON.stringify({
// query: Query,
// }),
// });
// if (resp.status === 200) setTubeSearch(await resp.json());
// else setTubeSearch(null);
// },
// onMutate: () => console.log("ApiSearch started!"),
// });
// react.useEffect(() => {
// fetch("/api/ioSocket").finally(() => {
// var ioSocket = io();
// var getSimilar = (data: string[]) => setSimilar(data.slice(0, 10));
// ioSocket.on("similar", getSimilar);
// setSocket(ioSocket);
// return () => {
// ioSocket.off("similar", getSimilar);
// ioSocket.disconnect();
// };
// });
// }, []);

// return (
// <section
// id="Playground"
// className="flex flex-col items-center justify-center"
// >
// <div className="max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
// <div className="max-w-screen-2xl">
// <h2 className="text-3xl font-bold sm:text-4xl text-red-600">
// Yt-Dlx PlayGround
// </h2>
// <p className="mt-4 text-white/80">
// YT-DLX accommodates various node.js coding flavours!{" "}
// <span className="text-red-600">
// (typescript), (commonjs) and (esm)
// </span>
// , ensuring 100% compatibility and comprehensive type safety
// coverage.
// </p>
// </div>
// <section className="mt-8 grid grid-cols-1 gap-8 md:mt-16 bg-red-950/10 border-4 border-red-600 border-double rounded-3xl shadow-red-600 duration-500 shadow-2xl">
// <div className="overflow-x-auto">
// <section className="grid grid-cols-1 gap-0 lg:grid-cols-12">
// <div className="w-full col-span-1 p-4 mx-auto mt-6 lg:col-span-8 xl:p-12 md:w-2/4">
// <h1 className="mt-6 mb-4 text-3xl font-black text-left text-red-600">
// Effortless Audio Video Downloader And Streamer!
// </h1>
// <form
// onSubmit={(event) => {
// event.preventDefault();
// setTubeSearch(null);
// setSimilar([]);
// ApiSearch.mutate();
// }}
// className="pb-1 space-y-4"
// >
// <label className="form-control w-full max-w-xs">
// <div className="label">
// <span className="label-text text-xs text-red-600 font-bold">
// Provide Video Link!
// </span>
// <span className="label-text-alt text-red-600 font-bold">
// Provide Video ID!
// </span>
// </div>
// <input
// required
// type="text"
// value={Query}
// placeholder="required"
// disabled={ApiSearch.isPending}
// onChange={(e) => {
// setQuery(e.target.value);
// socket?.emit("similar", {
// query: e.target.value,
// user: socket.id,
// });
// }}
// className="input input-bordered w-full max-w-xs"
// />
// <div className="label">
// <span className="label-text-alt text-red-600 font-bold">
// Provide Video Name!
// </span>
// <span className="label-text-alt text-red-600 font-bold">
// Copyright © 2024
// </span>
// </div>
// </label>
// <button
// type="submit"
// disabled={ApiSearch.isPending}
// className="btn btn-wide bg-red-800 hover:bg-red-600 duration-500 text-white font-bold ml-4"
// >
// Search YouTube
// </button>
// </form>
// </div>
// <div className="col-span-1 lg:col-span-4 p-2 m-2">
// {similar.length > 0 ? (
// similar.map((data: any, index: number) => (
// <ul key={index} className="text-sm list-disc">
// <li>{data.title}</li>
// </ul>
// ))
// ) : (
// <img
// alt="logo"
// loading="lazy"
// src="/logo.png"
// className="object-cover w-full h-64 min-h-full"
// />
// )}
// </div>
// </section>
// {TubeSearch && (
// <react.Fragment>
// <section className="px-4 py-24 mx-auto max-w-7xl">
// <h2 className="pb-8 mb-12 text-2xl font-extrabold leading-tight text-red-600 border-b-4 border-double border-red-600 md:text-6xl">
// YouTube Results
// </h2>
// <div className="w-full xl:w-4/6">
// <div className="flex flex-col space-y-16">
// {TubeSearch &&
// TubeSearch.map((item: any, index: number) => (
// <div
// key={index}
// className="grid grid-cols-1 gap-6 md:grid-cols-4"
// >
// <Image
// width={200}
// height={200}
// loading="lazy"
// alt="thumbnail"
// src={item.thumbnails[0].url}
// className="object-cover w-full h-40 col-span-1 bg-center rounded-3xl duration-300 shadow-black shadow-2xl border border-red-600"
// />
// <div className="col-span-1 md:col-span-3">
// <h2 className="mb-2 text-2xl font-extrabold leading-snug text-red-600">
// {item.title}
// </h2>
// <ul className="mb-3 list-disc ml-4">
// <li>
// <span className="text-red-600 font-bold">
// @description:
// </span>{" "}
// {item.description}
// </li>
// <li>
// <span className="text-red-600 font-bold">
// @videoId:
// </span>{" "}
// {item.id}
// </li>
// <li>
// <span className="text-red-600 font-bold">
// @channelid:
// </span>{" "}
// {item.channelid}
// </li>
// <li>
// <span className="text-red-600 font-bold">
// @channelname:
// </span>{" "}
// {item.channelname}
// </li>
// <li>
// <span className="text-red-600 font-bold">
// @duration:
// </span>{" "}
// {item.duration}
// </li>
// <li>
// <span className="text-red-600 font-bold">
// @uploadDate:
// </span>{" "}
// {item.uploadDate}
// </li>
// <li>
// <span className="text-red-600 font-bold">
// @viewCount:
// </span>{" "}
// {item.viewCount}
// </li>
// </ul>
// <div className="md:flex items-left justify-left gap-2">
// <Link
// href={`/${item.id}`}
// className="btn bg-red-800 hover:bg-red-600 rounded-2xl shadow-black shadow-2xl text-white font-bold btn-wide"
// >
// watch video or download file!
// </Link>
// </div>
// </div>
// </div>
// ))}
// </div>
// </div>
// </section>
// </react.Fragment>
// )}
// </div>
// </section>
// </div>
// </section>
// );
// }

"use client";
import react from "react";
import Link from "next/link";
import Image from "next/image";
import io from "socket.io-client";
import { GoNumber } from "react-icons/go";
import { TiAnchor } from "react-icons/ti";
import * as socketIO from "socket.io-client";
import { MdDataSaverOff } from "react-icons/md";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function PlayGround() {
  var QueryClient = useQueryClient();
  var [Query, setQuery] = react.useState<string>("");
  var [similar, setSimilar] = react.useState<string[]>([]);
  var [socket, setSocket] = react.useState<socketIO.Socket>();
  var [TubeSearch, setTubeSearch] = react.useState<any>(null);
  var [currentDate, setCurrentDate] = react.useState(new Date());

  var ApiSearch = useMutation({
    mutationFn: async () => {
      var resp = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: Query,
        }),
      });
      if (resp.status === 200) setTubeSearch(await resp.json());
      else setTubeSearch(null);
    },
    onMutate: () => console.log("ApiSearch started!"),
  });
  react.useEffect(() => {
    fetch("/api/ioSocket").finally(() => {
      var ioSocket = io();
      var getSimilar = (data: string[]) => setSimilar(data.slice(0, 10));
      ioSocket.on("similar", getSimilar);
      setSocket(ioSocket);
      return () => {
        ioSocket.off("similar", getSimilar);
        ioSocket.disconnect();
      };
    });
  }, []);

  react.useEffect(() => {
    var interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  var fdate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "short" }
  )} ${currentDate.getFullYear()}`;

  return (
    <section
      id="Playground"
      className="flex flex-col items-center justify-center"
    >
      <div className="max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="max-w-screen-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl text-red-600">
            Yt-Dlx PlayGround
          </h2>
          <p className="mt-4 text-white/80">
            YT-DLX accommodates various node.js coding flavours!{" "}
            <span className="text-red-600">
              (typescript), (commonjs) and (esm)
            </span>
            , ensuring 100% compatibility and comprehensive type safety
            coverage.
          </p>
        </div>
        <section className="mt-8 grid grid-cols-1 gap-8 md:mt-16 bg-red-950/10 border-4 border-red-600 border-double rounded-3xl shadow-red-600 duration-500 shadow-2xl">
          <div className="overflow-x-auto">
            <section className="grid grid-cols-1 gap-0 lg:grid-cols-12">
              <div className="w-full col-span-1 p-4 mx-auto mt-6 lg:col-span-8 xl:p-12 md:w-2/4">
                <h1 className="mt-6 mb-4 text-3xl font-black text-left text-red-600">
                  Effortless Audio Video Downloader And Streamer!
                </h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setTubeSearch(null);
                    setSimilar([]);
                    ApiSearch.mutate();
                  }}
                  className="pb-1 space-y-4"
                >
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-xs text-red-600 font-bold">
                        Provide Video Link!
                      </span>
                      <span className="label-text-alt text-red-600 font-bold">
                        Provide Video ID!
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      value={Query}
                      placeholder="required"
                      disabled={ApiSearch.isPending}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        socket?.emit("similar", {
                          query: e.target.value,
                          user: socket.id,
                        });
                      }}
                      className="input input-bordered w-full max-w-xs"
                    />
                    <div className="label">
                      <span className="label-text-alt text-red-600 font-bold">
                        Provide Video Name!
                      </span>
                      <span className="label-text-alt text-red-600 font-bold">
                        Copyright © 2024
                      </span>
                    </div>
                  </label>
                  <button
                    type="submit"
                    disabled={ApiSearch.isPending}
                    className="btn btn-wide bg-red-800 hover:bg-red-600 duration-500 text-white font-bold ml-4"
                  >
                    Search YouTube
                  </button>
                </form>
              </div>
              <div className="col-span-1 lg:col-span-4 p-2 m-2">
                {similar.length > 0 ? (
                  similar.map((data: any, index: number) => (
                    <ul key={index} className="text-sm list-disc">
                      <li>{data.title}</li>
                    </ul>
                  ))
                ) : (
                  <img
                    alt="logo"
                    loading="lazy"
                    src="/logo.png"
                    className="object-cover w-full h-64 min-h-full"
                  />
                )}
              </div>
            </section>
            {TubeSearch && (
              <react.Fragment>
                <section className="px-4 py-24 mx-auto max-w-7xl">
                  <h2 className="pb-8 mb-12 text-2xl font-extrabold leading-tight text-red-600 border-b-4 border-double border-red-600 md:text-6xl">
                    YouTube Results
                  </h2>
                  <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="grid gap-10 row-gap-8 lg:grid-cols-5">
                      <div className="lg:col-span-2">
                        <p className="mb-2 text-xs font-semibold tracking-wide text-red-600 uppercase">
                          {fdate}
                        </p>
                        <div className="mb-3">
                          <a
                            aria-label="Article"
                            className="inline-block text-red-600 transition-colors duration-200"
                          >
                            <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-4xl xl:text-5xl">
                              You've Searched For
                              <span className="text-red-600 text-4xl">
                                {" "}
                                " {Query} "{" "}
                              </span>
                            </p>
                          </a>
                        </div>
                        <p className="mb-4 text-base text-white/80 md:text-lg">
                          <GoNumber className="text-red-600" size={50} /> Found
                          Total
                          <span className="text-red-600 text-4xl"> " n " </span>
                          Videos For Your Query !!
                        </p>
                        <div className="flex items-center">
                          <a aria-label="Author" className="mr-3">
                            <img
                              alt="avatar"
                              src="/logo.png"
                              className="object-cover w-10 h-10 rounded-full shadow-sm"
                            />
                          </a>
                          <div>
                            <a
                              aria-label="Author"
                              className="font-semibold text-red-800 transition-colors duration-200"
                            >
                              Petru Vîrtos
                            </a>
                            <p className="text-sm font-medium leading-4 text-red-600">
                              Author
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-8 lg:col-span-3">
                        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                          <div className="grid gap-5 row-gap-10 lg:grid-cols-2">
                            <div className="flex flex-col justify-center">
                              <div className="max-w-xl mb-6">
                                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-red-600 sm:text-4xl sm:leading-none">
                                  The quick, brown fox
                                  <br className="hidden md:block" />
                                  jumps over{" "}
                                  <span className="relative px-1">
                                    <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-teal-accent-400" />
                                    <span className="relative inline-block text-deep-purple-accent-400">
                                      a lazy dog
                                    </span>
                                  </span>
                                </h2>
                                <p className="text-xs text-white/80 md:text-lg lowercase">
                                  Sed ut perspiciatis unde omnis iste natus
                                  error sit voluptatem accusantium doloremque
                                  laudantium, totam rem aperiam, eaque ipsa
                                  quae. explicabo.
                                </p>
                              </div>
                              <p className="mb-4 text-sm font-bold text-red-600 tracking-widest uppercase flex flex-row gap-1">
                                <MdDataSaverOff
                                  className="text-red-600"
                                  size={20}
                                />
                                meta-data
                              </p>

                              {TubeSearch &&
                                TubeSearch.map((item: any, index: number) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-1 gap-6 md:grid-cols-4"
                                  >
                                    <Image
                                      width={200}
                                      height={200}
                                      loading="lazy"
                                      alt="thumbnail"
                                      src={item.thumbnails[0].url}
                                      className="object-cover w-full h-40 col-span-1 bg-center rounded-3xl duration-300 shadow-black shadow-2xl border border-red-600"
                                    />
                                    <div className="col-span-1 md:col-span-3">
                                      <h2 className="mb-2 text-2xl font-extrabold leading-snug text-red-600">
                                        {item.title}
                                      </h2>
                                      <ul className="mb-3 list-disc ml-4">
                                        <li>
                                          <span className="text-red-600 font-bold">
                                            @description:
                                          </span>{" "}
                                          {item.description}
                                        </li>
                                        <li>
                                          <span className="text-red-600 font-bold">
                                            @videoId:
                                          </span>{" "}
                                          {item.id}
                                        </li>
                                        <li>
                                          <span className="text-red-600 font-bold">
                                            @channelid:
                                          </span>{" "}
                                          {item.channelid}
                                        </li>
                                        <li>
                                          <span className="text-red-600 font-bold">
                                            @channelname:
                                          </span>{" "}
                                          {item.channelname}
                                        </li>
                                        <li>
                                          <span className="text-red-600 font-bold">
                                            @duration:
                                          </span>{" "}
                                          {item.duration}
                                        </li>
                                        <li>
                                          <span className="text-red-600 font-bold">
                                            @uploadDate:
                                          </span>{" "}
                                          {item.uploadDate}
                                        </li>
                                        <li>
                                          <span className="text-red-600 font-bold">
                                            @viewCount:
                                          </span>{" "}
                                          {item.viewCount}
                                        </li>
                                      </ul>
                                      <div className="md:flex items-left justify-left gap-2">
                                        <Link
                                          href={`/${item.id}`}
                                          className="btn bg-red-800 hover:bg-red-600 rounded-2xl shadow-black shadow-2xl text-white font-bold btn-wide"
                                        >
                                          watch video or download file!
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                              {TubeSearch &&
                                TubeSearch.map((item: any, index: number) => (
                                  <div
                                    key={index}
                                    className="grid space-y-3 sm:gap-2 sm:grid-cols-2 sm:space-y-0"
                                  >
                                    <ul className="space-y-3">
                                      <li className="flex">
                                        <span className="mr-1">
                                          <TiAnchor
                                            className="text-red-600"
                                            size={20}
                                          />
                                        </span>
                                        <span className="text-red-600 font-bold">
                                          @videoId:
                                        </span>{" "}
                                        {item.id}
                                      </li>
                                      <li className="flex">
                                        <span className="mr-1">
                                          <TiAnchor
                                            className="text-red-600"
                                            size={20}
                                          />
                                        </span>
                                        <span className="text-red-600 font-bold">
                                          @channelid:
                                        </span>{" "}
                                        {item.channelid}
                                      </li>
                                      <li className="flex">
                                        <span className="mr-1">
                                          <TiAnchor
                                            className="text-red-600"
                                            size={20}
                                          />
                                        </span>
                                        <span className="text-red-600 font-bold">
                                          @channelname:
                                        </span>{" "}
                                        {item.channelname}
                                      </li>
                                    </ul>
                                    <ul className="space-y-3">
                                      <li className="flex">
                                        <span className="mr-1">
                                          <TiAnchor
                                            className="text-red-600"
                                            size={20}
                                          />
                                        </span>
                                        <span className="text-red-600 font-bold">
                                          @duration:
                                        </span>{" "}
                                        {item.duration}
                                      </li>
                                      <li className="flex">
                                        <span className="mr-1">
                                          <TiAnchor
                                            className="text-red-600"
                                            size={20}
                                          />
                                        </span>
                                        <span className="text-red-600 font-bold">
                                          @uploadDate:
                                        </span>{" "}
                                        {item.uploadDate}
                                      </li>
                                      <li className="flex">
                                        <span className="mr-1">
                                          <TiAnchor
                                            className="text-red-600"
                                            size={20}
                                          />
                                        </span>
                                        <span className="text-red-600 font-bold">
                                          @viewCount:
                                        </span>{" "}
                                        {item.viewCount}
                                      </li>
                                      <li className="flex">
                                        <span className="mr-1">
                                          <TiAnchor
                                            className="text-red-600"
                                            size={20}
                                          />
                                        </span>
                                        un-known
                                      </li>
                                    </ul>
                                  </div>
                                ))}
                            </div>
                            <div>
                              <img
                                className="object-cover w-full h-56 rounded-2xl border-2 border-red-600/40 hover:border-red-600 shadow-2xl shadow-red-600 sm:h-96"
                                src="/logo.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </react.Fragment>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
