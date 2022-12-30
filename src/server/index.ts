import { Namespace, Server } from "socket.io"
import {
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "./types/socket"

const server = (client: Server) => {
    const io: Namespace<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    > = client.of("/server")
    return io
}

export default server
