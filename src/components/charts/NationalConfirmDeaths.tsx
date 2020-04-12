import moment from 'moment-timezone';
import React from 'react';
import Chart from 'react-apexcharts';
import 'moment/locale/es';

import dataByState from './../../data/total.json';

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
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
        },
      },
    },
    colors: ['#3182ce', '#545454'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    title: {
      text: 'Confirmados y defunciones',
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
      colors: ['#3182ce', '#545454'],
      shape: 'circle',
      size: 2,
      strokeColors: ['#3182ce', '#545454'],
    },
    xaxis: {
      categories: dataByState['Dates'].dates,
      title: {
        text: 'Día',
      },
    },
    yaxis: {
      title: {
        text: 'Casos',
      },
      min: 0,
      max: dataByState['Total'].confirmed[dataByState['Total'].confirmed.length - 1],
      tickAmount: 4,
    },
    tooltip: {
      x: {
        formatter: (elementPosition: number) => {
          const [day, month] = dataByState['Dates'].dates[elementPosition - 1].split('/');
          return `${moment(`2020-${month}-${day}`).format('DD [de] MMMM')}`;
        },
      },
    },
  },
};

export const NationalConfirmDeaths = () => {
  return (
    <div className='bg-white rounded-t-lg rounded-b-lg border-b-2 py-2'>
      <Chart options={data.options} series={data.series} height={300} />
    </div>
  );
};
