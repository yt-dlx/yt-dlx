import http from "http";
import app from "./app";

const port = 3000 || process.env.PORT;
const server: http.Server = http.createServer(app);
server.listen(port, () => console.log("@server: listening on port", port));
