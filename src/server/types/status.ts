interface CPUData {
    cpu: Number
}
interface CPU {
    model: String
    cpus: CPUData[]
    percent: Number
}

interface RAM {
    free: Number
    total: Number
    percent: Number
}

interface Storage {
    free: Number
    total: Number
    percent: Number
}

interface GPUMemory {
    free: Number
    total: Number
    percent: Number
}
interface GPU {
    name: String
    usage: Number
    memory: GPUMemory
}

export interface StatusData {
    _os: String
    hostname: String
    version: String
    cpu: CPU
    ram: RAM
    storage: Storage
    uptime: Number
    loadavg: Number[]
    gpu: GPU
}
