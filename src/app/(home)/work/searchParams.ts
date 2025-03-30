import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsIndex,
  parseAsString,
} from 'nuqs/server';

export const filtersParams = {
  category: parseAsArrayOf(parseAsString),
  commune: parseAsIndex.withDefault(0),
};

export const filterParamsCache = createSearchParamsCache(filtersParams);
