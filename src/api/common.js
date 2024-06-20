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
export function getMovieDetails(data) {
    return request({
        url: "/movie/details" + "?id=" + data,
        method: "get"
    })
}

export function addComment(data) {
    return request({
        url: "/movie/details/comment",
        method: "put",
        data
    })
}
export function getComplaints() {
    return request({
        url: "/complaints",
        method: "get"
    })
}
export function getComplaintText(data) {
    return request({
        url: "/complaint/text" + "?id=" + data,
        method: "get"
    })
}
export function getMyComplaints(data) {
    return request({
        url: "/mycomplaints" + "?u_id=" + data,
        method: "get"
    })
}
export function submitComplaintReply(data) {
    return request({
        url: "/feedback",
        method: "put",
        data
    })
}
export function getFeedbacks(data) {
    return request({
        url: "/myfeedbacks" + "?c_id=" + data,
        method: "get"
    })
}
export function get_m_id_byname(data) {
    return request({
        url: "/getmid" + "?m_name=" + data,
        method: "get"
    })
}
export function submitComplaint(data) {
    return request({
        url: "/submitcomplaint",
        method: "put",
        data
    })
}

export function get_m_name_byname(data) {
    return request({
        url: "/getmname" + "?m_name=" + data,
        method: "get"
    })
}
export function collectMovie(data) {
    return request({
        url: "/movie/collect",
        method: "put",
        data
    })
}
export function initc_status(data) {
    return request({
        url: "/movie/is_collect",
        method: "post",
        data
    })
}

export function getCollectionInfo(data) {
    return request({
        url: "/movie/collection" + "?u_id=" + data,
        method: "get"
    })
}
export function updateHistory(data) {
    return request({
        url: "/writehistory",
        method: "put",
        data
    })
}
export function getHistoryInfo(data) {
    return request({
        url: "/historyinfo" + "?u_id=" + data,
        method: "get"
    })
}



