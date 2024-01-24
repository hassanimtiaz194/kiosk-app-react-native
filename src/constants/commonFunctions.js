import dayjs from 'dayjs';
import moment from 'moment-timezone';

export const getDurationUnit = (duration, minimize) => {
    const minutesText = minimize ? 'min' : 'minutes';
    const hoursText = minimize ? 'hr' : 'hour';
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) return `${minutes} ${minutesText}`;
    if (minutes === 0) return `${hours} ${hoursText}`;
    return `${hours} ${hoursText} ${minutes} ${minutesText}`;
};

export const getCostRange = uniqueService => {
    if (uniqueService.providerServices.length === 1) {
        return `$${uniqueService.cost}`;
    }
    const minPrice = Math.min(
        ...uniqueService.providerServices.map(providerService => providerService.serviceDetails?.cost)
    );
    const maxPrice = Math.max(
        ...uniqueService.providerServices.map(providerService => providerService.serviceDetails?.cost)
    );
    if (isNaN(minPrice) || isNaN(maxPrice)) {
        return `$${uniqueService.cost}`;
    }
    if (minPrice === maxPrice) {
        return `$${minPrice}`;
    }
    return `$${minPrice} - $${maxPrice}`;
};

export function groupingScheduleSlots(objectsArray) {
    const dateSet = [];
    objectsArray.forEach(obj => {
        const date = dayjs(obj.start).format('YYYY-MM-DD'); // Assuming each object has a "date" property
        dateSet.push(date);
    });
    const filteredDates = dateSet.filter((value, index) => dateSet.indexOf(value) === index);
    const result = [];
    filteredDates.map(date => {
        const slots = objectsArray.filter(obj => dayjs(obj.start).format('YYYY-MM-DD') === date);
        result.push({ date: date, slots: slots });
    });
    return result;
};

export function calendarMarkedDays(data) {
    const result = {};
    data.forEach(item => {
        console.l
        const dateKey = dayjs(item.date).format('YYYY-MM-DD'); // Extracting the date part
        result[dateKey] = {
            selected: true,
            selectedColor: item.availableForInsurance ? '#E8F4FF' : '#EBFDE8',
            selectedTextColor: item.availableForInsurance ? '#005DB4' : '#0D753B',
        };
    });

    return result;
};

export const getDateLabel = (date, format) => {
    const today = dayjs();
    const isToday = dayjs(date).isSame(today, 'day')
    const tomorrow = dayjs().add(1, 'day');
    const isTomorrow = dayjs(date).isSame(tomorrow, 'day');
    return isToday
        ? 'Today'
        : isTomorrow
            ? 'Tomorrow'
            : dayjs(date).format(format ?? 'dddd, MMMM DD');
};

export const getNameIntials = (name) => {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
};

export const getUserTimeZone = ()=> {
    return moment.tz.guess();
  };
