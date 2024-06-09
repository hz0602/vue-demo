import request from "@/utils/request"

export function getMovieInfo() {
    return request({
        url: "/movie/info",
        method: "get"
    })
}