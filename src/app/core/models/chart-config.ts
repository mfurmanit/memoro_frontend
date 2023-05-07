import { ChartData, ChartOptions, ChartType, Plugin } from 'chart.js';

export type ChartConfig<T extends ChartType> = {
  data?: ChartData<T>;
  options: ChartOptions<T>;
  plugins: Plugin<T>[];
  type: T;
  title: string;
};
