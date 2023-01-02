import { ClientData, ToastData } from "./client"

export interface ServerToClientEvents {
    hi: () => void
    status: (clients: ClientData) => void
    toast: (data: ToastData) => void
}

export interface ClientToServerEvents {
    only: (hostname: string) => void
}

export interface InterServerEvents {
    status: () => void
}

export interface SocketData {
    sync: () => void
}
