import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

import { numberWithCommas } from './../utils/utils';

interface Props {
  title: string;
  today: number;
  yesterday: number;
  rounded?: 't' | 'b';
}

export const Stat = ({ title, today, yesterday, rounded }: Props) => {
  const difference = today - yesterday;
  const differenceText = `${numberWithCommas(Math.abs(difference))} ${
    difference >= 0 ? 'más' : 'menos'
  } que ayer`;
  const differencePercentage =
    difference === 0 && yesterday === 0
      ? 0
      : Math.round(100 * 100 * (difference / yesterday)) / 100;

  const showPercentage = () => {
    let color = 'red';
    let icon = faArrowDown;

    if (difference === 0) {
      color = 'orange';
      icon = faArrowsAltH;
    } else {
      switch (title) {
        case 'Casos negativos':
        case 'Personas estudiadas':
        case 'Casos no graves':
          color = difference > 0 ? 'green' : 'red';
          icon = difference > 0 ? faArrowUp : faArrowDown;
          break;
        case 'Casos confirmados':
        case 'Casos activos':
        case 'Casos sospechosos':
        case 'Defunciones':
        case 'Casos hospitalizados':
          color = difference > 0 ? 'red' : 'green';
          icon = difference > 0 ? faArrowUp : faArrowDown;
          break;
        default:
          break;
      }
    }

    return (
      <p
        className={`min-w-1/4 text-xs text-center sm:text-sm font-light bg-${color}-200 rounded-full py-1 px-1`}
      >
        <FontAwesomeIcon icon={icon} size='sm' className={`text-${color}-700`} />
        <span className={`text-xs text-${color}-700 font-medium`}>
          {` ${Math.abs(differencePercentage)}`}%
        </span>
      </p>
    );
  };

  return (
    <div
      className={`bg-white flex flex-col justify-center items-center border-b-2 py-3 px-3 ${rounded &&
        `rounded-${rounded}-lg`}`}
    >
      <p className='text-xs sm:text-sm w-full tracking-wide text-left text-gray-900 font-medium'>
        {title}
      </p>

      <div className='w-full flex items-baseline justify-between'>
        <div className='flex items-baseline'>
          <p className='text-xl sm:text-2xl text-blue-600 font-bold mr-1'>
            {numberWithCommas(today)}
          </p>
          <p className='text-xs sm:text-sm font-light text-gray-600'>{differenceText}</p>
        </div>
        {showPercentage()}
      </div>
    </div>
  );
};
