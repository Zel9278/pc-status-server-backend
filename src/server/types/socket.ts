export interface ServerToClientEvents {
    hi: (text: string) => void
    sync: (text: string) => void
}

export interface ClientToServerEvents {
    only: (hostname: string) => void
}

export interface InterServerEvents {
    ping: () => void
}

export interface SocketData {}
