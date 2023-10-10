interface CPUData {
    cpu: number
}
interface CPU {
    model: string
    cpus: CPUData[]
    percent: number
}

interface RAM {
    free: number
    total: number
    percent: number
}

interface Storage {
    free: number
    total: number
    percent: number
}

interface GPUMemory {
    free: number
    total: number
    percent: number
}
interface GPU {
    name: string
    usage: number
    memory: GPUMemory
}

export interface StatusHistory {
    cpu: CPU
    ram: RAM
    storage: Storage
    gpu: GPU | undefined | null
    uptime: number
    timestamp?: number
}

export interface StatusData {
    _os: string
    hostname: string
    version: string
    cpu: CPU
    ram: RAM
    storage: Storage
    uptime: number
    loadavg: number[]
    gpu: GPU | undefined | null
    index: number
    histories: StatusHistory[]
}

export interface StatusData {
    pass: string | null
    _os: string
    hostname: string
    version: string
    cpu: CPU
    ram: RAM
    storage: Storage
    storages: Storage[] | null
    uptime: number
    loadavg: number[]
    gpu: GPU | undefined | null
}
