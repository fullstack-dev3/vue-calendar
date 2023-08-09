<template>
  <div class="week-wrapper">
    <div class="weekdays">
      <div v-for="(weekday, j) in week.weekdays" class="weekday" :key="'fwd'+j">
        <div class="weekday-label" :data-full="weekday.label" :data-short="weekday.labelShort"></div>
        <div class="weekday-date">{{weekday.date}}</div>
      </div>
    </div>
    <div class="week-hours-wrap">
      <div class="week-hours">
        <template v-for="(hour, index) in week.hours" :key="'wh'+index">
          <div class="week-hour">{{hour.label}}</div>
        </template>
      </div>
    </div>
    <div class="week-events-wrap">
      <div
        v-for="(event, index) in mappedEvents"
        :key="'we'+index"
        style="border-left:thin solid #fff"
        class="week-events"
      >
        <div
          v-for="(item, i) in event"
          :key="'evdd'+i+index"
          :style="{...item.style}"
          class="week-event"
          :class="{'week-event-focused':item.title==focusedEvent.title}"
          @click="focusOnEvent(item)"
        >
          <div v-if="item.title==focusedEvent.title" class="week-event-time">
            <div>{{item.startTime}}</div>
            <div>{{item.endTime}}</div>
          </div>
          <div class="week-event-title">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeekCal",
  inheritAttrs: false,
  props: ["week"],
  data() {
    return {
      focusedEvent: {}
    };
  },
  computed: {
    events() {
      let _events = this.week.weekdays
        .map(wd => wd.events)
        .flat()
        .sort((a, b) => {
          return (
            new Date(a.startDate).getHours() - new Date(b.startDate).getHours()
          );
        })
        .map((event) => {
          let startHour = new Date(event.startDate).getHours();
          let endHour = new Date(event.endDate).getHours();
          let endMinutes = new Date(event.endDate).getMinutes();

          event.style = {
            "grid-row": startHour + 1 + "/span " + (endHour - startHour + 1),
            "grid-column": event.weekday + 1,
            background: event.color,
            height: (endHour - startHour) * 32 + (32 * endMinutes) / 60 + "px"
          };

          return event;
        });

      return _events;
    },
    mappedEvents (){
      let _mappedEvents = [];

      for (let h = 0; h < 24; h++) {
        for (let j = 0; j < 7; j++) {
          _mappedEvents.push(this.getEventsByHour(h, j));
        }
      }

      return _mappedEvents;
    }
  },
  methods: {
    getEventsByHour(hour, day) {
      let _events = this.events.filter(e => {
        let startHour = new Date(e.startDate).getHours();
        return startHour === hour && day === e.weekday;
      });

      return _events.map((e, i) => {
        e.style.left = (i / _events.length) * 90 + "%";
        e.style.top = "0px";
        return e;
      });
    },
    focusOnEvent (event ) {
      this.focusedEvent = event;
    }
  },
};
</script>

<style lang="scss">
@mixin forSmallScreens($media) {
  @media (max-width: $media) {
    @content;
  }
}
.week-wrapper {
  -webkit-box-shadow: 1px 1px 5px #aaa;
  background-color: transparent;
  background-image: linear-gradient(
    0deg,
    transparent 24%,
    #efefef 25%,
    #efefef 26%,
    transparent 27%,
    transparent 74%,
    #efefef 75%,
    #efefef 76%,
    transparent 77%,
    transparent
  );
  background-size: 64px 64px;
  border-radius: 4px;
  box-shadow: 1px 1px 5px #aaa;
  display: grid;
  grid-template-columns: 64px auto;
  grid-template-rows: 48px auto;
  height: 100%;
  position: relative;
  .weekdays {
    background: var(--primary);
    color: white;
    display: grid;
    grid-column-end: 3;
    grid-column-start: 2;
    grid-template-columns: repeat(7, 1fr);
    .weekday {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      width: 100%;
      &:not(:last-child) {
        border-right: thin solid #7f7d82;
      }
      &-label {
        &:before {
          content: attr(data-full);
        }
        @include forSmallScreens(640) {
          &:before {
            content: attr(data-short);
          }
        }
      }
      &-date {
        opacity: 0.7;
        font-size: 10pt;
      }
    }
  }
  .week-hours-wrap {
    display: inherit;
    grid-column: 1/2;
    grid-row: 2/3;
    grid-template-columns: 64px;
    grid-template-rows: repeat(24, 32px);
  }
  .week-hours {
    background: var(--primary);
    color: aliceblue;
    grid-row: 1/25;
    .week-hour {
      align-items: center;
      border-bottom: thin solid #7f7d82;
      display: flex;
      grid-column-start: 1;
      grid-column-end: 2;
      height: 32px;
      justify-content: center;
      position: relative;
    }
  }
  .week-events-wrap {
    display: grid;
    grid-column-end: 3;
    grid-column-start: 2;
    grid-row-start: 2;
    grid-template-rows: repeat(24, 32px);
    grid-template-columns: repeat(7, 1fr);
    position: relative;
    .week-events {
      display: flex;
      max-width: 100%;
      position: relative;
      .week-event {
        color: white;
        position: absolute;
        width: 72px;
        z-index: 4;
        cursor: pointer;
        &-time {
          color: white;
          font-size: 9pt;
          padding: 4px;
        }
        &-title {
          align-items: center;
          display: flex;
          font-size: 9pt;
          padding: 4px;
        }
        &-focused,
        &:hover {
          border: thin dashed #fff;
          min-height: max-content;
          z-index: 10;
        }
      }
    }
  }
}
</style>