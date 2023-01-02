import http from "http"
import express from "express"
import { Server } from "socket.io"
import {
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData,
} from "./types/socket"

const PORT = Number(process.env.PORT) || 3000

const app = express()
const httpServer = new http.Server(app)

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

httpServer.listen(PORT)

export default io
