export interface ServerToClientEvents {
    hi: () => void
    sync: () => void
}

export interface ClientToServerEvents {
    only: (hostname: string) => void
}

export interface InterServerEvents {
    ping: () => void
}

export interface SocketData {}
