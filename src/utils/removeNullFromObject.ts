import { objType } from '../store/common/type';

function removeNullFromObject(object: objType): objType | undefined {
  if (typeof object !== 'object') return;

  Object.keys(object).forEach((key) => {
    if (object[key] === null) {
      // eslint-disable-next-line no-param-reassign
      delete object[key];
      return;
    }
    removeNullFromObject(object[key]);
  });

  // eslint-disable-next-line consistent-return
  return object;
}

export default removeNullFromObject;
