import moment from 'moment-timezone';
import React from 'react';
import Chart from 'react-apexcharts';
import 'moment/locale/es';

import dataByState from './../../data/total.json';

interface Props {
  stateName: string;
}

export const ConfirmedVsDeaths = ({ stateName }: Props) => {
  const data = {
    series: [
      {
        name: 'Confirmados',
        // @ts-ignore
        data: dataByState[stateName].confirmed,
      },
      {
        name: 'Defunciones',
        // @ts-ignore
        data: dataByState[stateName].deaths,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        stackType: '100%',
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
      colors: ['#38a169', '#545454'],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '6px',
          fontWeight: 'normal',
        },
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      title: {
        text: 'Confirmados vs defunciones',
        align: 'left',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },

      xaxis: {
        categories: dataByState['Dates'].dates,
      },
      yaxis: {
        min: 0,
        max: 100,
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
    <div className='bg-white rounded-t-lg rounded-b-lg border-b-2 py-2'>
      <Chart options={data.options} series={data.series} height={300} type='bar' />
    </div>
  );
};
