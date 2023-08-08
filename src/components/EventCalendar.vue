<template>
  <div>
    <div class="wrapper">
      <div class="year-wrapper">
        <div class="year" :class="{'month-year':calendar.selectedDate.type !== 'year'}">
          <PrevButton @click="$emit('prev', gotoPrev())" />
          <h2>{{calendar.selectedDate.value}}</h2>
          <NextButton @click="$emit('next', gotoNext())"/>
        </div>
      </div>
    </div>
    <div class="main-content">
      <component
        :is="mainContent"
        :extended="extendedMonth"
        :months="calendar.selectedDate.months"
        :month="calendar.selectedDate.month"
        :day="calendar.selectedDate"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { NextButton, PrevButton } from "./buttons";
import useCalendar from "./useCalendar";

export default {
  props: ["events"],
  setup(props) {
    document.documentElement.style.setProperty("--primary", "#5118ac");

    const mainContent = ref("year");
    const extendedMonth = ref(false);

    const { calendar, gotoNext, gotoPrev } = useCalendar(props.events);

    watch(
      () => calendar.selectedDate,
      () => {
        setMainContent(calendar.selectedDate.type);
      }
    );

    function setMainContent(value) {
      mainContent.value = value;
    }

    return {
      mainContent,
      extendedMonth,
      calendar,
      gotoNext,
      gotoPrev
    }
  },
  components: {
    NextButton,
    PrevButton
  }
}
</script>

<style lang="scss" src="../assets/style.scss">
</style>