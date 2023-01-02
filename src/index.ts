import "dotenv/config"
import Server_io from "./server"
import client from "./client"
import { Socket } from "socket.io"
import { StatusData } from "./client/types/status"
import { ClientData } from "./client/types/client"

const server = Server_io(client)

let clients: ClientData = {}

client.on("connection", (socket: Socket) => {
    socket.emit("hi")
    console.log("test client")
})

server.on("connection", (socket: Socket) => {
    socket.emit("hi")
    console.log("test server")

    socket.on("hi", (data: StatusData, pass) => {
        if (pass !== process.env.PASS) return socket.disconnect()
        client.emit("toast", {
            message: `${data?.hostname} is connected`,
            color: "#0508",
            toastTime: 5000,
        })
        clients[socket.id] = data
    })

    socket.on("sync", (data: StatusData) => {
        if (clients[socket.id]) clients[socket.id] = data
    })

    socket.on("disconnect", () => {
        const _client: StatusData | undefined = clients[socket.id]
        if (_client) {
            delete clients[socket.id]
            client.emit("toast", {
                message: `${_client?.hostname} is disconnected`,
                color: "#0508",
                toastTime: 5000,
            })
        }
    })
})

setInterval(() => {
    client.emit("status", clients)
    Object.keys(clients).forEach((c) => server.to(c).emit("sync"))
}, 1000)
