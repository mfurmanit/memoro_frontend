export interface StatisticsResponse {
  viewedCards: { [date: string]: number };
  reviewedCards: { [date: string]: number };
  reviewTimes: { [date: string]: number };
}

export type SortedData = {
  labels: string[];
  data: number[];
};
