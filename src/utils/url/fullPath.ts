export const fullPath = (path: string, queryString: string) =>
  `${path}${queryString ? '?' : ''}${queryString}`;
