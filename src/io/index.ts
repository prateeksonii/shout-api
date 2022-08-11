import { Server } from "socket.io";
import server from "../server";

const io = new Server(server);

io.on("connect", (socket) => {
  console.log(socket);
});

export default io;
