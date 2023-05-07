import { ChartType } from 'chart.js';
import { ChartConfig } from '@models/chart-config';

export type ChartsConfig = {
  [key: string]: ChartConfig<ChartType>;
};
