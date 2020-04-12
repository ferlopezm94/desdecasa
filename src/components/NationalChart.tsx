import React from 'react';
import Chart from 'react-apexcharts';

import dataByState from './../data/total.json';

const data = {
  series: [
    {
      name: 'Confirmados',
      data: dataByState['Total'].confirmed,
    },
    {
      name: 'Defunciones',
      data: dataByState['Total'].deaths,
    },
  ],
  options: {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
      },
    },
    colors: ['#3182ce', '#545454'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    title: {
      text: 'Casos confirmados y defunciones en México',
      align: 'left',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: dataByState['Dates'].dates,
      title: {
        text: 'Día',
      },
    },
    yaxis: {
      title: {
        text: 'Personas',
      },
      min: 0,
      max: dataByState['Total'].confirmed[dataByState['Total'].confirmed.length - 1],
    },
  },
};

export const NationalChart = () => {
  return (
    <div className='bg-white rounded-t-lg rounded-b-lg border-b-2 py-2'>
      <Chart options={data.options} series={data.series} height={300} />
    </div>
  );
};
