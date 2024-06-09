import request from "@/utils/request"

export function getMovieInfo() {
    return request({
        url: "/movie/info",
        method: "get"
    })
}

export function getAdministratorInfo() {
    return request({
        url: "/administrator/info",
        method: "get"
    })
}