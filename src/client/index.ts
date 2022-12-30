import { createServer } from "http"
import { Server } from "socket.io"
import {
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "./types/socket"

const PORT = process.env.PORT || 3000

const httpServer = createServer()
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer)

httpServer.listen(PORT, () => {
    console.log(`Client side Server Listen By Port: ${PORT}`)
})

export default io
