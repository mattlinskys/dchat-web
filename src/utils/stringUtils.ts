export const sumChars = (str: string) =>
  Array.from(str).reduce((val, char) => val + char.charCodeAt(0), 0);
