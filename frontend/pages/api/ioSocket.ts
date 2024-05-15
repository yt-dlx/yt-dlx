import chalk from "chalk";
import ytdlx from "yt-dlx";
import { Server } from "socket.io";
export var config = {
  api: {
    bodyParser: false,
  },
};

export default function ioSocket(req: any, res: any) {
  if (!res.socket.server.io) {
    var io = new Server(res.socket.server);
    io.on("connection", (socket) => {
      socket.on("similar", async (param) => {
        console.log(chalk.green("📢 User:"), chalk.italic(param.user));
        var TubeBody = await ytdlx.ytSearch.Video.Multiple({
          query: param.query,
        });
        if (TubeBody) io.to(param.user).emit("similar", TubeBody);
        else io.to(param.user).emit("similar", []);
      });
    });
    res.socket.server.io = io;
  }
  res.end();
}
