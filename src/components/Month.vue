<template>
  <div :class="{'month-wrapper-extended':extended}" class="month-wrapper">
    <div class="month centered-content" @click="selectMonth(month)">{{month.label}}</div>

    <div
      v-for="(weekday, j) in month.weekdaysShort"
      class="weekday centered-content"
      :key="'wd'+j"
    >{{weekday}}</div>

    <Days :month="{...month, extended}"/>
  </div>
</template>

<script>
import Days from "./Days";
import { useContext } from "./useContext";

export default {
  name: "MonthCal",
  props: ["extended", "month"],
  setup() {
    const { selectMonth } = useContext();

    return {
      selectMonth
    };
  },
  components: {
    Days
  }
};
</script>