import { sync } from 'glob';
import { union } from 'lodash';

import { INextFunction, IRequest, IResponse } from '../interfaces/express';

export const globFiles = (location: string): string[] => {
  return union([], sync(location));
}

export const asyncHandler = (fn: (req: IRequest, res: IResponse, next: INextFunction) => Promise<any>) =>
(req: IRequest, res: IResponse, next: INextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const convertToArray = (value: string | Array<string | number>, splitter: string = ','): Array<number | string> => {
  let result: Array<string | number> = [];
  let isJSON: boolean = true;

  if (!value || !value.length) return null;

  try {

    result = Array.isArray(value) ? value : JSON.parse(value);

  } catch (ex) {
    isJSON = false;
  }

  if (typeof value === 'string' && !result.length) {
    if (value.includes(splitter))
      result = value.split(splitter);
    else
      result = [value];
  }

  return result;
}
