import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
  title: string;
  stat: number;
  statText: string;
  differenceStatPercentage: number;
  rounded?: 't' | 'b';
}
export const Stat = ({ title, stat, statText, differenceStatPercentage, rounded }: Props) => (
  <div
    className={`bg-white h-1/4 flex flex-col justify-center items-center border-b-2 p-3 ${rounded &&
      `rounded-${rounded}-lg`}`}
  >
    <p className='w-full tracking-wide text-xs sm:text-sm text-left text-gray-900 font-medium'>
      {title}
    </p>

    <div className='w-full flex items-baseline'>
      <p className='w-1/4 text-xl sm:text-3xl text-blue-600 font-bold'>{stat}</p>
      <p className='w-1/2 text-xs sm:text-sm font-light text-gray-600'>{statText}</p>
      {differenceStatPercentage >= 0 ? (
        <p className='w-1/4 text-xs text-center sm:text-sm font-light bg-red-200 rounded-full py-1 px-1'>
          <FontAwesomeIcon icon={faArrowUp} size='sm' className='text-red-700' />
          <span className='text-xs text-red-700 font-medium'>
            {` ${differenceStatPercentage}`}%
          </span>
        </p>
      ) : (
        <p className='w-1/4 text-xs text-center sm:text-sm font-light bg-green-200 rounded-full py-1 px-1'>
          <FontAwesomeIcon icon={faArrowDown} size='sm' className='text-green-700' />
          <span className='text-xs text-green-700 font-medium'>
            {` ${differenceStatPercentage}`}%
          </span>
        </p>
      )}
    </div>
  </div>
);
