import { upperCase, upperFirst } from 'lodash-es';
import { TranslateService } from '@ngx-translate/core';
import { CardCollection } from '@models/card-collection';
import { format, isMatch, parse, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { SortedData } from '@models/statistics-response';

export type UndefinedTypes = null | undefined;
export type DefinedTypesOf<T> = T extends UndefinedTypes ? never : T;

export function isDefined<T>(value: T): value is DefinedTypesOf<T> {
  return value !== undefined && value !== null;
}

export const isNullOrUndefined = <T>(value: T | UndefinedTypes): value is UndefinedTypes => !isDefined(value);

export const isNonNullable = <T>(value: T | UndefinedTypes): value is NonNullable<typeof value> => value !== null && value !== undefined;

export const isCardCollection = (value: unknown): value is CardCollection => {
  const collection = value as CardCollection;
  return !isNullOrUndefined(collection.name) && !isNullOrUndefined(collection.icon) && !isNullOrUndefined(collection.id);
};

export const titleCaseWord = (word: string): string => {
  if (!word) return word;
  return upperFirst(word);
};

export const titleUpperWord = (word: string): string => {
  if (!word) return word;
  return upperCase(word);
};

export const initTranslateService = (translate: TranslateService): void => {
  const language = localStorage.getItem('language');
  if (!isNullOrUndefined(language)) {
    translate.setDefaultLang(language.toString());
    translate.use(language.toString());
  } else {
    const lang = navigator.language && navigator.language.includes('pl') ? 'pl' : 'en';
    translate.setDefaultLang(lang);
    translate.use(lang);
    localStorage.setItem('language', lang);
  }
};

export const getCurrentLang = (): string | null => {
  const language = localStorage.getItem('language');
  return !isNullOrUndefined(language) ? language : 'pl';
};

export function getProperty<Type, Key extends keyof Type>(object: Type, key: Key) {
  return object[key];
}

export function isAssignable<Type>(object: Type, property: string): object is Type {
  return property in object;
}

export const isDateAfter = (a: Date, b: Date): boolean => {
  const dateA = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const dateB = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return dateA >= dateB;
};

export const isValidAdapterDate = (date: string, dateFormat: string, regex?: RegExp): boolean =>
  isMatch(date, dateFormat) && (date?.length === dateFormat.length) && (regex ? regex.test(date) : true);

export const commonDateFormat = 'dd.MM.yyyy';
export const backendDateFormat = 'yyyy-MM-dd';
export const commonDateTimeFormat = 'dd.MM.yyyy HH:mm';

export const formatDate = (date: Date): string => format(date, commonDateFormat);
export const formatDateTime = (date: Date): string => format(date, commonDateTimeFormat);
export const formatDateCustom = (date: Date, dateFormat: string): string => format(date, dateFormat, {locale: pl});
export const parseDate = (dateString: string, dateFormat: string): Date => parse(dateString, dateFormat, new Date());
export const formatDateFromBackend = (dateString: string): string => formatDate(parseDate(dateString, backendDateFormat));
export const formatDateForBackend = (date: Date): string => format(date, backendDateFormat);

export const getSortedData = (response: { [date: string]: number }): SortedData => {
  const sortedData = Object.entries(response).sort((a, b) => a[0].localeCompare(b[0]));

  const labels = sortedData.map((entry) => formatDateFromBackend(entry[0]));
  const data = sortedData.map((entry) => entry[1]);

  return { labels, data };
};
