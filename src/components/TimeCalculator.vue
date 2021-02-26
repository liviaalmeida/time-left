<template>
    <div class="calculator">
        <div class="calculator-times">
            <div v-for="(time, index) in times"
            :key="index"
            class="calculator-times-time">
                {{ label(index) }}
                <Time @time="onTime($event, index)" />
            </div>
        </div>

        <div v-show="valid">
            O final do seu expediente é às {{ final.toString() }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeSlot from '@/domain/TimeSlot'

export default Vue.extend({
    data() {
        return {
            final: new TimeSlot(0, 0),
            times: [] as TimeSlot[],
            valid: false,
        }
    },
    methods: {
        calculate() {
            const total = new TimeSlot(8, 0)
            const t1 = this.times[1].subtract(this.times[0])
            const left = total.subtract(t1)
            this.final = this.times[2].add(left)
        },
        label(index: number) {
            const action = index % 2 ? 'saída' : 'entrada'
            const order = Math.floor(index / 2) + 1
            return `${order}ª ${action}`
        },
        onTime({ hour, minute }: TimeSlot, index: number) {
            this.times[index] = new TimeSlot(hour, minute)
            this.times.sort(TimeSlot.compare)
            this.valid = this.times.every(t => t.hour > -1 && t.minute > -1)
            if (this.valid) {
                this.calculate()
            }
        },
    },
    created() {
        this.times = Array.from({ length: 3 }, () => new TimeSlot())
    },
})
</script>

<style lang="scss">
.calculator {
    &-times {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 15px;
        font-size: 13px;
        width: fit-content;
        margin: 0 auto;
    }
}
</style>
