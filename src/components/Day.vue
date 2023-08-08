<template>
  <div class="full-day">
    <template
      v-for="(hour, index) in day.hours"
      :key="index"
    >
      <div class="full-day-hour">{{hour.label}}</div>
      <div class="full-day-time-line-item">
        <div class="full-day-time-line-circle"></div>
      </div>
    </template>

    <div class="full-day-events">
      <div
        v-for="(event, index) in day.events"
        :key="index"
        :style="{gridRow:new Date(event.startDate).getHours() + 1 +'/span ' +(new Date(event.endDate).getHours() - new Date(event.startDate).getHours() + 1),}"
        class="full-day-event"
      >
        <div class="full-day-event-time">
          <div>{{event.startTime}}</div>
          <div>{{event.endTime}}</div>
        </div>
        <div class="full-day-event-title">{{event.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DayCal",
  props: ["day"]
};
</script>