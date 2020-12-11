import Compare from 'mapbox-gl-compare';

const getCompareMap = (beforeMap, afterMap, comparisonMapRef) => {
  return new Compare(beforeMap, afterMap, comparisonMapRef, {
    // mousemove: true,
    orientation: 'vertical',
  });
};

export default getCompareMap;
