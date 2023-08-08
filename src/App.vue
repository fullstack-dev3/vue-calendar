<template>
  <EventCalendar :events="events" />
</template>

<script>
import EventCalendar from "./EventCalendar.vue";

export default {
  name: 'App',
  data: () => ({
    events:[
      {
        title:'Event 1',
        startDate:'2023-07-09 08:00',
        endDate:'2023-07-09 12:00',
      },
      {
        title:'Event 2',
        startDate:'2023-07-09 09:00',
        endDate:'2023-07-09 12:00',
      },
      {
        title:'Event 3',
        startDate:'2023-07-09 12:00',
        endDate:'2023-07-09 16:00',
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
