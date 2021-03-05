<template>
    <div class="calculator">        
        <div class="calculator-times calculator-duration">
            <div class="calculator-times-time">
                <div>Duração da jornada</div>
                <Time @time="onDuration" :time="duration" />
            </div>
        </div>

        <div class="calculator-times">
            <div v-for="(time, index) in times"
            :key="index"
            class="calculator-times-time">
                <div>{{ label(index) }}</div>
                <Time @time="onTime($event, index)"
                :time="time" />
            </div>
        </div>

        <div class="calculator-buttons">
            <button @click="onRemove"
            :disabled="times.length < 4"
            class="calculator-buttons-button">
                -
            </button>
            <button @click="onAdd"
            class="calculator-buttons-button">
                +
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeLeft from '@/domain/TimeLeft'
import TimeSlot from '@/domain/TimeSlot'

export default Vue.extend({
    data() {
        return {
            duration: new TimeSlot(8, 0),
            times: [] as TimeSlot[],
            valid: false,
        }
    },
    methods: {
        calculate() {
            this.valid = this.times.every(t => t.hour > -1 && t.minute > -1)
            this.$emit('valid', this.valid)
            if (!this.valid) return

            this.times.sort(TimeSlot.compare)
            const final = TimeLeft.calculate(this.duration, ...this.times)
            this.$emit('result', final)
        },
        label(index: number) {
            const action = index % 2 ? 'saída' : 'entrada'
            const order = Math.floor(index / 2) + 1
            return `${order}ª ${action}`
        },
        onAdd() {
            this.times.push(new TimeSlot(), new TimeSlot())
            this.valid = false
            this.$emit('valid', false)
        },
        onRemove() {
            this.times.splice(this.times.length - 2, 2)
            this.calculate()
        },
        onDuration(duration: TimeSlot) {
            this.duration = duration
            this.calculate()
        },
        onTime({ hour, minute }: TimeSlot, index: number) {
            this.times[index] = new TimeSlot(hour, minute)
            this.calculate()
        },
    },
    created() {
        this.times = Array.from({ length: 3 }, () => new TimeSlot())
    },
})
</script>

<style lang="scss">
.calculator {
    height: fit-content;

    &-duration {
        margin-bottom: 30px;
        font-weight: bold;
    }

    &-times {
        display: flex;
        flex-direction: column;
        gap: 15px;
        font-size: 13px;

        &-time {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
        }
    }

    &-buttons {
        display: flex;
        justify-content: space-around;
        margin: 25px 0 15px;

        &-button {
            border-radius: 50%;
            height: 30px;
            width: 30px;
            background-color: cornflowerblue;
            border-color: cornflowerblue;
            outline: transparent;
            font-size: 18px;

            &:disabled {
                background-color: lightgray;
                border-color: lightgray;
            }
        }
    }
}
</style>
