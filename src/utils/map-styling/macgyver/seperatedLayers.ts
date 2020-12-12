import initLayers from '../../rendering-data/layers/init';

const seperatedLayers: any = {};

function isNumber(value: string | number): boolean {
  return !Number.isNaN(Number(value));
}

/** feature / subFeature / element / subElement / value */
initLayers.layers.forEach((layer) => {
  const layerId = layer.id;
  const layerInfo = { id: layerId, type: layer.type };
  const [feature, subFeature, element, subElement] = layerInfo.id.split('-');
  if (feature && !seperatedLayers[feature]) {
    seperatedLayers[feature] = { all: {} };
  }
  if (subFeature && !seperatedLayers[feature][subFeature]) {
    seperatedLayers[feature][subFeature] = {};
  }
  if (element && seperatedLayers[feature][subFeature][element] === undefined) {
    if (subElement && !isNumber(subElement) && subElement !== undefined) {
      seperatedLayers[feature][subFeature][element] = {};
      seperatedLayers[feature].all[element] = {};
    } else {
      seperatedLayers[feature][subFeature][element] = [];
      seperatedLayers[feature].all[element] = [].concat(
        seperatedLayers[feature].all[element] || []
      );
    }
  }
  if (
    !isNumber(subElement) &&
    subElement !== undefined &&
    seperatedLayers[feature][subFeature][element][subElement] === undefined
  ) {
    seperatedLayers[feature][subFeature][element][subElement] = [];
    seperatedLayers[feature].all[element][subElement] = [].concat(
      seperatedLayers[feature].all[element][subElement] || []
    );
  }
  if (!isNumber(subElement) && subElement !== undefined) {
    seperatedLayers[feature][subFeature][element][subElement].push(layerInfo);
    seperatedLayers[feature].all[element][subElement].push(layerInfo);
  } else {
    seperatedLayers[feature][subFeature][element].push(layerInfo);
    seperatedLayers[feature].all[element].push(layerInfo);
  }
});

console.log(seperatedLayers);

export default seperatedLayers;
