import React from 'react';
import Chart from 'react-apexcharts';

import dataByState from './../data/total.json';

const data = {
  series: [
    {
      name: 'Personas',
      data: dataByState['Total'].confirmed,
    },
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: true,
      },
    },
    colors: ['#3182ce'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Casos confirmados en México',
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
      max: 5000,
    },
  },
};

export const NationalChart = () => {
  return <Chart options={data.options} series={data.series} />;
};
