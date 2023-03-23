export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}

export const emptyPage = <T>(): Page<T> => ({
  content: [],
  totalElements: 0,
  size: 0,
  number: 0,
});
