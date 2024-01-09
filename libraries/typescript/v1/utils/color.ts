import { Color } from '../types';

export const toColorHexString = (color: Color) => {
  if (typeof color === 'string') {
    return color;
  }

  return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}`;
};
