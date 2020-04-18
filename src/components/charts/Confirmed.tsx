import moment from 'moment-timezone';
import React from 'react';
import Chart from 'react-apexcharts';
import 'moment/locale/es';

import dataByState from './../../data/total.json';

interface Props {
  stateName: string;
}

export const Confirmed = ({ stateName }: Props) => {
  const data = {
    series: [
      {
        name: 'Confirmados',
        // @ts-ignore
        data: dataByState[stateName].confirmed,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        parentHeightOffset: 0,
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
      colors: ['#3182ce'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      title: {
        text: 'Casos confirmados',
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
        colors: ['#3182ce'],
        shape: 'circle',
        size: 2,
        strokeColors: ['#3182ce'],
      },
      xaxis: {
        categories: dataByState['Dates'].dates,
      },
      yaxis: {
        min: 0,
        // @ts-ignore
        max: dataByState[stateName].confirmed[dataByState[stateName].confirmed.length - 1],
        tickAmount: 4,
      },
      tooltip: {
        x: {
          formatter: (elementPosition: string) => {
            const [day, month] = elementPosition.split('/');
            return `${moment(`2020-${month}-${day}`).format('DD [de] MMMM')}`;
          },
        },
      },
    },
  };

  return (
    <div className='bg-white rounded-t-lg rounded-b-lg border-b-2 pt-2'>
      <Chart options={data.options} series={data.series} height={300} type='bar' />
    </div>
  );
};
