const parseBoolean = (value) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true')  return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite } = query;
  const parsedIsFavourite = parseBoolean(isFavourite);

  /* ── возвращаем фильтр только если значение определено ── */
  const filter = {};
  if (parsedIsFavourite !== undefined) {
    filter.isFavourite = parsedIsFavourite;
  }

  return filter;
};
