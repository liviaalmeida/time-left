<template>
    <div class="time">
        <input type="time"
        @input="onTime($event.target.value)">
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeSlot from '@/domain/TimeSlot'

export default Vue.extend({
    props: {
        time: {
            type: Object as () => TimeSlot,
            required: false,
        }
    },
    methods: {
        onTime(time: string) {
            const [ hour, minute ] = time.split(':').map(num => Number(num))
            this.$emit('time', new TimeSlot(hour, minute))
        },
    },
})
</script>

<style lang="scss">
.time {
    display: inline-block;
}
</style>
