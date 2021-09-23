import crypto from "crypto";

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const encrypt = (str: string) =>
  crypto.createHash("sha1").update(str).digest("hex");

export const groupByProperty = <T extends { [key: string]: any }>(
  array: T[],
  key: keyof T
): T[][] => {
  const elements: T[][] = [];
  let li = 0;

  for (let i = 0; i < array.length; i++) {
    if (!i) {
      elements[li] = [];
    } else if (array[i - 1][key] !== array[i][key]) {
      li++;
      elements[li] = [];
    }

    elements[li].push(array[i]);
  }

  return elements;
};
