import { Server } from "socket.io"
import {
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "./types/socket"

const PORT = Number(process.env.PORT) || 3000

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(PORT, {
    cors: {
        origin: "*",
    },
})

export default io
