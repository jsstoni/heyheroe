import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from 'nuqs/server';

export const filtersParams = {
  category: parseAsArrayOf(parseAsString),
};

export const filterParamsCache = createSearchParamsCache(filtersParams);
