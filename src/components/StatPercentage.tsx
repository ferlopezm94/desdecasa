import React from 'react';

interface Props {
  title: string;
  today: number;
  yesterday: number;
  rounded?: 'l' | 'r';
}

export const StatPercentage = ({ title, today, yesterday, rounded }: Props) => {
  const todayNormalized = Math.round(100 * today);
  const yesterdayNormalized = Math.round(100 * yesterday);
  const differenceText = `${yesterdayNormalized}% ayer`;

  return (
    <div
      className={`bg-white w-1/2 text-center flex flex-col justify-center items-center border-b-2 py-2 px-3 ${rounded &&
        `rounded-${rounded}-lg`}`}
    >
      <p className='w-full tracking-wide text-xs sm:text-sm text-gray-900 font-medium'>{title}</p>

      <div className='w-full flex items-baseline justify-between'>
        <div className='w-full'>
          <p
            className={`text-xl sm:text-3xl text-${
              title === 'Casos no graves' ? 'green' : 'red'
            }-600 font-bold mr-1`}
          >
            {todayNormalized}%
          </p>
          <p className='text-xs sm:text-sm font-light text-gray-600'>{differenceText}</p>
        </div>
      </div>
    </div>
  );
};
