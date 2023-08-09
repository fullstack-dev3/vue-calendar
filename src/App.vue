<template>
  <EventCalendar :events="events" />
</template>

<script>
import EventCalendar from "./EventCalendar.vue";

export default {
  name: 'App',
  data: () => ({
    events: [
      {
        title: "Event 1",
        startDate: "2023-08-24 08:00",
        endDate: "2023-08-24 12:00"
      },
      {
        title: "Event 2",
        startDate: "2023-08-24 09:00",
        endDate: "2023-08-24 12:00"
      },
      {
        title: "Event 3",
        startDate: "2023-08-24 12:00",
        endDate: "2023-08-24 16:00"
      },
      {
        title: "Event 4",
        startDate: "2023-08-24 09:00",
        endDate: "2023-08-24 10:00"
      },
      {
        title: "Event 5",
        startDate: "2023-08-21 09:00",
        endDate: "2023-08-21 14:00"
      },
      {
        title: "Event 6",
        startDate: "2023-08-21 08:00",
        endDate: "2023-08-21 10:00"
      },
      {
        title: "Event 7",
        startDate: "2023-08-21 06:00",
        endDate: "2023-08-21 10:00"
      },
      {
        title: "Event 8",
        startDate: "2023-08-24 18:00",
        endDate: "2023-08-24 22:00"
      },
      {
        title: "Event 9",
        startDate: "2023-08-24 18:00",
        endDate: "2023-08-24 20:00"
      },
      {
        title: "Event 10",
        startDate: "2023-08-23 09:00",
        endDate: "2023-08-23 20:50"
      },
      {
        title: "Event 11",
        startDate: "2023-08-27 09:00",
        endDate: "2023-08-27 20:30"
      },
      {
        title: "Event 12",
        startDate: "2023-08-24 09:00",
        endDate: "2023-08-24 12:30"
      }
    ]
  }),
  components: {
    EventCalendar
  }
}
</script>

<style lang="scss">

</style>
