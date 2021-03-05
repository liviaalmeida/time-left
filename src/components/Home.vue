<template>
    <div class="home">
        <TimeCalculator @result="onResult" @valid="valid = $event" />
        <div class="home-result">
            O final do seu expediente é às
            <div v-if="valid"
            class="home-result-time">
                {{ result.toString() }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TimeCalculator from '@/components/TimeCalculator.vue'
import TimeSlot from '@/domain/TimeSlot'

export default Vue.extend({
    components: {
        TimeCalculator,
    },
    data() {
        return {
            result: new TimeSlot(-1, -1),
            valid: false,
        }
    },
    methods: {
        onResult(result: TimeSlot) {
            this.result = result
        },
    },
})
</script>

<style lang="scss">
.home {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 20px 60px;
    flex-wrap: wrap;
    margin-top: 60px;

    &-result {
        height: 50px;
        margin-bottom: 30px;

        &-time {
            font-size: 24px;
            font-weight: bold;
            margin-top: 10px;
        }
    }
}
</style>
