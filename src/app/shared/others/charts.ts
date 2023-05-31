import { ChartOptions } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartsConfig } from '@models/charts-config';
import { formatDuration } from 'date-fns';
import { pl } from 'date-fns/locale';

const chartPlugins = [
  DataLabelsPlugin
];

const chartOptions: ChartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          if (typeof value === 'number' && value % 1 === 0) {
            return value;
          } else return undefined;
        }
      }
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      anchor: 'end',
      align: 'end'
    }
  },
  layout: {
    padding: {
      left: 30,
      right: 30,
      top: 50,
      bottom: 20
    }
  }
};

const pieChartOptions: ChartOptions = {
  ...chartOptions,
  scales: undefined,
  layout: {
    padding: {
      top: 20,
      bottom: 120
    }
  },
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const index = context.dataIndex;
          const dataset = context.dataset;
          const currentValue = Number(dataset.data[index]);

          const hours = Math.floor(currentValue / 3600);
          const minutes = Math.floor(currentValue % 3600 / 60);
          const seconds = Math.floor(currentValue % 3600 % 60);

          return formatDuration({
            hours: hours,
            minutes: minutes,
            seconds: seconds
          }, {delimiter: ', ', locale: pl});
        }
      }
    }
  },
  maintainAspectRatio: false,
};

export const lineChartColors = {
  backgroundColor: [
    'rgba(255, 159, 64, 0.2)'
  ],
  borderColor: [
    'rgba(255, 159, 64, 1)'
  ],
  pointBackgroundColor: 'rgb(248,138,29)',
  borderWidth: 1
};

export const chartColors = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ],
  borderColor: [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ],
  borderWidth: 1
};

export const chartsConfig: ChartsConfig = {
  bar: {
    options: chartOptions,
    plugins: chartPlugins,
    type: 'bar',
    title: 'viewedCards'
  },
  line: {
    options: chartOptions,
    plugins: chartPlugins,
    type: 'line',
    title: 'reviewedCards'
  },
  pie: {
    options: pieChartOptions,
    plugins: [],
    type: 'pie',
    title: 'reviewTime'
  },
};
