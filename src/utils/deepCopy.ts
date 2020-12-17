import { objType } from '../store/common/type';

function deepCopy(obj: objType): objType {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const result: objType = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((key) => {
    result[key] = deepCopy(obj[key]);
  });

  return result;
}

export default deepCopy;
