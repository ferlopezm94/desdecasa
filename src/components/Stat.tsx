import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
  title: string;
  today: number;
  yesterday: number;
  rounded?: 't' | 'b';
}
export const Stat = ({ title, today, yesterday, rounded }: Props) => {
  const difference = today - yesterday;
  const differenceText = `${Math.abs(difference)} ${difference >= 0 ? 'más' : 'menos'} que ayer`;
  const differencePercentage = Math.round(100 * 100 * (difference / yesterday)) / 100;

  return (
    <div
      className={`bg-white h-1/4 flex flex-col justify-center items-center border-b-2 p-3 ${rounded &&
        `rounded-${rounded}-lg`}`}
    >
      <p className='w-full tracking-wide text-xs sm:text-sm text-left text-gray-900 font-medium'>
        {title}
      </p>

      <div className='w-full flex items-baseline justify-between'>
        <div className='flex items-baseline'>
          <p className='text-xl sm:text-3xl text-blue-600 font-bold mr-1'>{today}</p>
          <p className='text-xs sm:text-sm font-light text-gray-600'>{differenceText}</p>
        </div>
        {differencePercentage >= 0 ? (
          <p className='min-w-1/4 text-xs text-center sm:text-sm font-light bg-red-200 rounded-full py-1 px-1'>
            <FontAwesomeIcon icon={faArrowUp} size='sm' className='text-red-700' />
            <span className='text-xs text-red-700 font-medium'>{` ${differencePercentage}`}%</span>
          </p>
        ) : (
          <p className='min-w-1/4 text-xs text-center sm:text-sm font-light bg-green-200 rounded-full py-1 px-1'>
            <FontAwesomeIcon icon={faArrowDown} size='sm' className='text-green-700' />
            <span className='text-xs text-green-700 font-medium'>
              {` ${differencePercentage}`}%
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
