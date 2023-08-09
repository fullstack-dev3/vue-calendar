<template>
  <div class="month-wrapper__days">
    <div
      v-if="month.weekday"
      class="day day-in-month"
      :style="{'grid-column-start':'span '+month.weekday}"
    ></div>
  
    <div
      v-for="(day, index) in month.days"
      :key="'day'+index"
      @click="chooseDay($event,day,index)"
      :class="{'today':day.isToday}"
      class="day day-in-month"
    >
      <div>{{day.index}}</div>
      <sup v-if="day.events.length">
        <div class="day-events-count">{{day.events.length}}</div>
      </sup>
      <template v-if="month.extended && day.events.length > 0">
        <div class="day-events">
          <span
            v-for="(e, index) in sliceEvents(day.events)"
            :key="'de'+index"
            class="event"
          >{{e.title}}</span>
          <span class="event-more-indicator">+{{day.events.length - 3}}</span>
          <transition name="slide-fade" >
            <template v-if="indexDayToShowEvents == index && day.events.length > 0 ">
              <div class="more-events-wrp" :style="{left:day.weekday>3?'-150%':'50%'}">
                <div class="more-events">
                  <div class="events-detail">
                    <div class="events-detail-day">{{day.localeFormat}}</div>

                    <div v-for="(e, i) in day.events" :key="'d'+i" class="event-detail">
                      <div class="event-detail-time">
                        <div>{{e.startTime}}</div>
                        <div>{{e.endTime}}</div>
                      </div>
                      <div class="event-detail-title">{{e.title}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </transition>
        </div>
      </template>
    </div>
  </div>
</template>
  
<script>
import { ref } from "vue";
import { Fragment } from "./Fragment";
import { useContext } from "./useContext";
export default {
  name: "DaysCal",
  props: ["month"],
  setup(props) {
    const { selectDay } = useContext();
    const indexDayToShowEvents = ref(-1);

    function setIndexDayToShowEvents(v) {
      indexDayToShowEvents.value = v;
    }
    function sliceEvents(events) {
      return events.slice(0, 3);
    }

    function chooseDay(event, day, dayIndex) {
      if (props.month.extended) {
        dayIndex === indexDayToShowEvents.value
          ? setIndexDayToShowEvents(-1)
          : setIndexDayToShowEvents(dayIndex);
      } else {
        selectDay(day);
      }
    }

    return {
      selectDay,
      sliceEvents,
      chooseDay,indexDayToShowEvents
    };
  },
  directives: {
    Fragment
  }
};
</script>

<style lang="scss">
.month-wrapper__days {
  display: grid;
  grid-column-end: 8;
  grid-column-start: 1;
  grid-template-columns: repeat(7, 1fr);
  height: 100%
}

.month-wrapper-extended .month-wrapper__days {
  grid-template-rows: repeat(6, 128px);
}
</style>