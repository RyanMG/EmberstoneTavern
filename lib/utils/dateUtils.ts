import dayjs from 'dayjs';

export function formatDateForDisplay(date: Date | dayjs.Dayjs): string {
  return dayjs(date).format('dddd, MMM D, YYYY');
}
