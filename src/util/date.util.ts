import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getUTC = () => dayjs().utc().toISOString();

export const getUnix = (date?: dayjs.ConfigType) => {
  return dayjs(date).unix();
};

export const formatDate = (date: dayjs.ConfigType, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(pattern);
};
