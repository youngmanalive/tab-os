import { useState } from 'react';
import useInterval from 'hooks/useInterval';

const EN_US = 'en-US';
const FORMAT_OPTIONS = {
  weekday: 'short',
  day: 'numeric',
  year: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
} as const;

const parseDate = (date: Date = new Date()) => {
  const dateString = date.toLocaleString(EN_US, FORMAT_OPTIONS);
  const split = dateString.lastIndexOf(',');

  return {
    date: dateString.substring(0, split),
    time: dateString.substring(split + 1).trim(),
  };
};

const Clock = () => {
  const [{ date, time }, setDatetime] = useState(() => parseDate());

  useInterval(() => setDatetime(parseDate()), 1000);

  return (
    <div>
      <div className='date'>{date}</div>
      <div className='time'>{time}</div>
    </div>
  );
};

export default Clock;
