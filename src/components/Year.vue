<template>
  <div class="year-months">
    <div v-for="(month, index) in months" :key="index">
      <Month :month="month" :key="'m'+index"/>
    </div>
  </div>
</template>

<script>
import Month from "./Month";

export default {
  name: "YearCal",
  props: ["months"],
  components: {
    Month
  }
};
</script>