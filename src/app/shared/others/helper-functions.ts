import { upperCase, upperFirst } from 'lodash-es';
import { TranslateService } from '@ngx-translate/core';
import { CardCollection } from '@models/card-collection';

export type UndefinedTypes = null | undefined;
export type DefinedTypesOf<T> = T extends UndefinedTypes ? never : T;

export function isDefined<T>(value: T): value is DefinedTypesOf<T> {
  return value !== undefined && value !== null;
}

export const isNullOrUndefined = <T>(value: T | UndefinedTypes): value is UndefinedTypes => !isDefined(value);

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
