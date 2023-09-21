import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('ko');

export const formattedDate = () => {
  const setConvertTime = (time: string | undefined) => {
    return dayjs(time).fromNow();
  };

  const dayDiff = (time: string | undefined) => {
    if (dayjs().diff(time) > 8) {
      return setConvertTime(time);
    }
    return dayjs(time).format('YYYY년 M월 D일');
  };
  return dayDiff;
};
