import { reactive, onMounted } from "vue";
import moment from 'moment';

const useCalendar = (events) => {
  onMounted(() => {
    calendar.weekdays = moment.weekdays();
		calendar.weekdaysShort = moment.weekdaysShort();

    moment.locale('en');
		changeView('day');
	});

  const calendar = reactive({
		selectedDate: { type: 'year', value: new Date().getFullYear(), default: true },

		weekdays: [],
		weekdaysShort: [],
	});

  const setSelectedDate = value => {
		calendar.selectedDate = value;
	};

  const generateMonths = _year => {
		return moment.months().map((label, i) => {
			let index = i + 1;

			return getMonth(_year, index, label);
		});
	};

  const generateMonth = _date => {
		let index = _date.month() + 1;
		let label = moment.months()[_date.month()];
		let _year = _date.year();

		return getMonth(_year, index, label);
	};

  const generateWeek = _date => {
		window._date = _date;

		let _week = {
			weekdays: calendar.weekdays.map((dw, i) => {
				let date = _date.subtract(_date.weekday() - i, 'day').date();
				let _month = _date.month() + 1;
				let _year = _date.year();
				let _day = {
					index: date,
					label: `${_year}-${_month}-${date}`,
				};

				return {
					label: dw,
					labelShort: calendar.weekdaysShort[i],
					date,
					month: _month,
					year: _year,
					statOfWeek: _date.subtract(_date.weekday(), 'day'),
					events:getEvents(_day)
				};
			}),
			hours: getHours(),
		};

		return _week;
	};

  const getMonth = (_year, index, label) => {
		let fullLabel = `${_year}-${index}`;
		let date = moment(fullLabel, 'YYYY-M');

		let month = {
			label,
			fullLabel,
			index,
			weekday: date.weekday(),
			weekdaysShort: calendar.weekdaysShort,
			weekdays: calendar.weekdays,
		};

		month.days = [...Array(date.daysInMonth())].map((_, dayIndex) => {
			return getDay({
				index: dayIndex + 1,
				label: `${_year}-${index}-${dayIndex + 1}`,
			});
		});

		return month;
	};

  const getDay = day => {
		day.localeFormat = moment(day.label, 'YYYY-M-D').format('LL');
		day.hours = getHours();
		day.events = getEvents(day);
		day.isToday = moment().isSame(moment(day.label, 'YYYY-M-D'), 'day');
		return day;
	};

  const getHours = () => [...Array(24)].map((x, k) => {
    return {
      index: k,
      label: `${k < 10 ? '0' + k : k}:00`,
    };
  });

  const getEvents = day => {
		let evts = events.filter(event => {
			return moment(event.startDate, 'YYYY-MM-DD HH:mm').isSame(moment(day.label, 'YYYY-MM-DD HH:mm'), 'day');
		});

		return evts.map(event => {
			event.startTime = moment(event.startDate, 'YYYY-MM-DD HH:mm').format('hh:mm A');
			event.endTime = moment(event.endDate, 'YYYY-MM-DD HH:mm').format('hh:mm A');
			return event;
		});
	};

  const changeView = (type, value, isDefault = true, toggle = false) => {
    let date = isDefault ? moment() : moment(value, 'MMMM D, YYYY');
    date = toggle && !isDefault && !moment().isSame(moment(value, 'MMMM D, YYYY'), type) ? moment() : date;

    switch (type) {
			case 'day':
				setSelectedDate({
					...calendar.selectedDate,
					type: 'day',
					value: date.format('LL'),
					hours: getHours(),
					events: getEvents({ label: date }),
				});
				break;
			case 'week':
				setSelectedDate({
					...calendar.selectedDate,
					type: 'week',
					value: (date => {
						let _date = date.subtract(date.weekday(), 'day');
						return _date.format('LL');
					})(date),
					week: generateWeek(date),
				});
				break;
			case 'month':
				setSelectedDate({
					...calendar.selectedDate,
					type: 'month',
					value: date.format('MMMM YYYY'),
					month: generateMonth(date),
				});
				break;
			case 'year':
				setSelectedDate({
					...calendar.selectedDate,
					type: 'year',
					value: date.year().toString(),
					months: generateMonths(date.year()),
				});
				break;
			default:
				break;
		}
  };

  const gotoNext = () => {
		let next = moment(calendar.selectedDate.value, 'MMMM D, YYYY').add(1, calendar.selectedDate.type + 's');
		changeView(calendar.selectedDate.type, next, false);
	};

	const gotoPrev = () => {
		let prev = moment(calendar.selectedDate.value, 'MMMM D, YYYY').subtract(1, calendar.selectedDate.type + 's');
		changeView(calendar.selectedDate.type, prev, false);
	};

  return { calendar, changeView, gotoNext, gotoPrev };
};

export default useCalendar;