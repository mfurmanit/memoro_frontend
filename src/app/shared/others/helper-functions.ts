import { upperCase, upperFirst } from 'lodash-es';

export type UndefinedTypes = null | undefined;
export type DefinedTypesOf<T> = T extends UndefinedTypes ? never : T;

export function isDefined<T>(value: T): value is DefinedTypesOf<T> {
  return value !== undefined && value !== null;
}

export const isNullOrUndefined = <T>(value: T | UndefinedTypes): value is UndefinedTypes => !isDefined(value);

export const titleCaseWord = (word: string): string => {
  if (!word) return word;
  return upperFirst(word);
};

export const titleUpperWord = (word: string): string => {
  if (!word) return word;
  return upperCase(word);
};
