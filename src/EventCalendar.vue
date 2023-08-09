<template>
  <div>
    <div class="wrapper">
      <div class="year-wrapper">
        <div class="year" :class="{'month-year':calendar.selectedDate.type !== 'year'}">
          <PrevButton @click="$emit('prev', gotoPrev())" />
          <h2>{{calendar.selectedDate.value}}</h2>
          <NextButton @click="$emit('next', gotoNext())"/>
        </div>
        <div class="toggle">
          <div
            class="button"
            :class="{'button-active':calendar.selectedDate.type === 'day'}"
            @click="changeContent('day')"
          >
            Day
          </div>
          <div
            class="button"
            :class="{'button-active':calendar.selectedDate.type === 'week'}"
            @click="changeContent('week');"
          >
            Week
          </div>
          <div
            class="button"
            :class="{'button-active':calendar.selectedDate.type === 'month'}"
            @click="changeContent('month')"
          >
            Month
          </div>
          <div
            class="button"
            :class="{'button-active':calendar.selectedDate.type === 'year'}"
            @click="changeContent('year')"
          >
            Year
          </div>
        </div>
      </div>
      <div class="main-content">
        <component
          :is="mainContent"
          :extended="extendedMonth"
          :months="calendar.selectedDate.months"
          :month="calendar.selectedDate.month"
          :week="calendar.selectedDate.week"
          :day="calendar.selectedDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { NextButton, PrevButton } from "./components/buttons";
import Year from "./components/Year";
import Month from "./components/Month";
import Week from "./components/Week";
import Day from "./components/Day";
import useCalendar from "./components/useCalendar";
import { provideContext } from "./components/useContext";

export default {
  props: ["events"],
  setup(props) {
    document.documentElement.style.setProperty("--primary", "#5118ac");

    const mainContent = ref("year");
    const extendedMonth = ref(false);

    const { calendar, changeView, gotoNext, gotoPrev } = useCalendar(props.events);

    watch(
      () => calendar.selectedDate,
      () => {
        setMainContent(calendar.selectedDate.type);
      }
    );

    function setMainContent(value) {
      mainContent.value = value;
    }

    function changeContent(content) {
      if (content === 'month') {
        extendedMonth.value = true;
      }
      changeView(content, calendar.selectedDate.value, false, true);
    }

    function selectMonth(month) {
      extendedMonth.value = true;
      changeView("month", month.fullLabel, false);
    }

    function selectDay(day) {
      changeView("day", day.label, false);
    }

    provideContext({ selectMonth, selectDay });

    return {
      mainContent,
      extendedMonth,
      calendar,
      gotoNext,
      gotoPrev,
      changeContent,
      changeView
    }
  },
  components: {
    NextButton,
    PrevButton,
    Year,
    Month,
    Week,
    Day
  }
}
</script>

<style lang="scss" src="./assets/style.scss">
</style>