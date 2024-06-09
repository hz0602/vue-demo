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
export function addAdministrator(data) {
    return request({
        url: "/administrator/add",
        method: "post",
        data
    })
}
export function deleteAdministrator(data) {
    return request({
        url: "/administrator/delete",
        method: "delete",
        data
    })
}
export function updateAdministrator(data) {
    return request({
        url: "/administrator/update",
        method: "put",
        data
    })
}


