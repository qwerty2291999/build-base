export function expiredHrs(hrs) {
    const EXPIRES_TIME = 1000 * 60 * 60 * hrs
    return new Date(Date.now() + EXPIRES_TIME)
}
export function expiredMins(mins) {
    const EXPIRES_TIME = 1000 * 60 * mins
    return new Date(Date.now() + EXPIRES_TIME)
}
