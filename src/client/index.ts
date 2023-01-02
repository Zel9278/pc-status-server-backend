import http from "http"
import { Server } from "socket.io"
import {
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "./types/socket"

const PORT = process.env.PORT || 3000

const httpServer = new http.Server()
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {
    cors: {
        origin: "*",
    },
})

httpServer.listen(PORT, () => {
    console.log(`Server Listen By Port: ${PORT}`)
})

export default io
