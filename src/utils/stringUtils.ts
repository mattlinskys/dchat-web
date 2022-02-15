export const sumChars = (str: string) =>
  Array.from(str).reduce((val, char) => val + char.charCodeAt(0), 0);

export const capitalize = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1);
