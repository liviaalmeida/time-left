export default class TimeSlot {
    hour: number
    minute: number

    constructor(hour = -1, minute = -1) {
        this.hour = hour
        this.minute = minute
    }

    static compare(a: TimeSlot, b: TimeSlot) {
        if (a.hour < b.hour) return -1
        if (a.hour > b.hour) return 1

        if (a.minute < b.minute) return -1
        return 1
    }

    add(time: TimeSlot): TimeSlot {
        const mm = this.minute + time.minute
        const hh = this.hour + time.hour + Math.floor(mm / 60)

        const minute = mm % 60
        const hour = hh % 24

        return new TimeSlot(hour, minute)
    }

    subtract(time: TimeSlot): TimeSlot {
        const mm = this.minute - time.minute
        const hh = this.hour - time.hour - (mm < 0 ? 1 : 0)

        const minute = mm >= 0 ? mm : 60 + mm
        const hour = hh >= 0 ? hh : 24 + hh

        return new TimeSlot(hour, minute)
    }

    toString(): string {
				const timeFormatter = (n: number) => n < 10 ? `0${n.toString()}` : n.toString()
        return `${timeFormatter(this.hour)}:${timeFormatter(this.minute)}`
    }

		get valid(): boolean {
			return this.hour >= 0 && this.minute >= 0
		}
}
