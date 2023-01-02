import { StatusData } from "./status"

export interface ClientData {
    [key: string]: StatusData
}

export interface ToastData {
    message: String
    color: String
    toastTime: Number
}
