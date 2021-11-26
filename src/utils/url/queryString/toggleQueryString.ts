import { stringify } from '@/utils/url/queryString/stringify';

export const toggleQueryString = (
  path: string,
  key: string,
  value: string,
): string => {
  const queryString = path.split('?')[1] ?? '';
  const targetQueryString = stringify({ [key]: value });
  const existsQueryString = queryString !== '';

  if (queryString.includes(targetQueryString)) {
    const existsInLast = queryString.endsWith(targetQueryString);
    const targetRegexp = new RegExp(
      `${existsInLast ? '(\\?|&)' : ''}${targetQueryString}&?`,
    );

    return path.replace(targetRegexp, '');
  } else {
    return `${path}${existsQueryString ? '&' : '?'}${targetQueryString}`;
  }
};
