<template>
    <div class="time">
        <input type="time" :required="required"
        v-model="model" @input="onTime"
        class="time-input"
        min="00:00" max="23:59">
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeSlot from '@/domain/TimeSlot'

export default Vue.extend({
    props: {
        required: {
            type: Boolean,
            required: false,
        },
        time: {
            type: Object as () => TimeSlot,
            required: false,
        },
    },
    data() {
        return {
            model: this.time?.toString() || '',
        }
    },
    methods: {
        onTime() {
            const [ hour, minute ] = this.model.split(':').map(num => Number(num))
            this.$emit('time', new TimeSlot(hour, minute))
        },
    },
    watch: {
        time() {
            if (!this.time.valid) this.model = ''
            else this.model = this.time.toString()
        },
    },
})
</script>

<style lang="scss">
.time {
    display: inline-block;

    &-input {
        padding: 5px 10px;
        border-radius: 5px;
    }
}
</style>
