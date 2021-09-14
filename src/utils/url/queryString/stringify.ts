export const stringify = (obj: { [key: string]: string }) =>
  Object.keys(obj).reduce(
    (acc, key, idx) => `${acc}${idx === 0 ? "" : "&"}${key}=${obj[key]}`,
    "",
  );
