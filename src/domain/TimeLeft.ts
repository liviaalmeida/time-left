import TimeSlot from './TimeSlot'

export default class TimeLeft {
    static calculate(duration: TimeSlot, ...times: TimeSlot[]) {
        const closedTimes = times.slice(0, times.length - 1)
        const enterings = closedTimes.filter((_, index) => !(index % 2))
        const leavings = closedTimes.filter((_, index) => index % 2)
        const left = leavings
            .map((leave, index) => leave.subtract(enterings[index]))
            .reduce((dif, time) => dif.subtract(time), duration)
        const final = times[times.length - 1].add(left)
        return final
    }
}
