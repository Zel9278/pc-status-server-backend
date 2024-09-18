import "dotenv/config"
import Server_io from "./server"
import client from "./client"
import { Socket } from "socket.io"
import { StatusData } from "./client/types/status"
import { ClientData } from "./client/types/client"

const server = Server_io(client)

const statusDatas: StatusData = {
    pass: null,
    _os: "OS Not Set",
    hostname: "hostname not set",
    version: "version not set",
    cpu: {
        model: "cpu model not set",
        cpus: [],
    },
    ram: { free: 0, total: 0 },
    swap: { free: 0, total: 0 },
    storages: [],
    uptime: 0,
    loadavg: [0, 0, 0],
    gpu: null,
    index: 0,
    histories: [],
}

let clients: ClientData = {}

client.on("connection", (socket: Socket) => {
    socket.emit("hi", "hello")
    console.log("test client")
})

server.on("connection", (socket: Socket) => {
    socket.emit("hi", "hello")
    console.log("test server")

    socket.on("hi", (data: StatusData, pass) => {
        //console.log(data, pass)
        if ((data?.pass || pass) !== process.env.PASS)
            return socket.disconnect()

        if (
            Object.keys(clients).filter((cli) =>
                clients[cli]?.hostname.includes(data.hostname)
            ).length > 0
        ) {
            const filteredClients = Object.keys(clients)
                .filter((cli) => clients[cli]?.hostname.includes(data.hostname))
                .map((cli) => clients[cli])
            //console.log(filteredClients.length)
            data.index = filteredClients.length
            data.hostname = `${data.hostname}_${data.index}`
        }

        data.histories = []
        data.histories.push({
            cpu: data.cpu,
            ram: data.ram,
            swap: data.swap,
            storages: data.storages,
            gpu: data.gpu,
            uptime: data.uptime,
        })
        clients[socket.id] = deepMarge(statusDatas, data)
        //console.log(clients[socket.id])

        client.emit("toast", {
            message: `${data?.hostname} is connected`,
            color: "#0508",
            toastTime: 5000,
        })
    })

    socket.on("sync", (data: StatusData) => {
        if (clients[socket.id]) {
            if (clients[socket.id].index > 0) {
                const _clients = Object.keys(clients).filter((cli) =>
                    clients[cli]?.hostname.includes(data.hostname)
                )
                data.index = _clients.findIndex((cli) => cli === socket.id)
                data.hostname = `${data.hostname}_${clients[socket.id].index}`
            }

            clients[socket.id] = deepMarge(clients[socket.id], data)
            if (clients[socket.id].histories.length > 10)
                clients[socket.id].histories.shift()
            clients[socket.id].histories.push({
                cpu: data.cpu,
                ram: data.ram,
                swap: data.swap,
                storages: data.storages,
                gpu: data.gpu,
                uptime: data.uptime,
            })
        }
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
    //delete pass to send to frontend
    const _clients = JSON.parse(JSON.stringify(clients))
    Object.keys(_clients).forEach((c) => {
        delete _clients[c].pass
    })
    client.emit("status", _clients)
    Object.keys(clients).forEach((c) => server.to(c).emit("sync", "sync"))
}, 1000)

function deepMarge(target: StatusData, source: StatusData): StatusData {
    const _target = JSON.parse(JSON.stringify(target))
    Object.assign(_target, source)
    return _target
}
