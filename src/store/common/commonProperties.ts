export interface StyleType {
  isChanged: boolean;
  visibility: string;
  color: string;
  weight: number;
  saturation: number;
  lightness: number;
}

export interface CommonType {
  fill: StyleType;
  stroke: StyleType;
}

export interface LabelType {
  text: CommonType;
  icon: StyleType;
}

const style: StyleType = {
  isChanged: true,
  visibility: 'inherit',
  color: '#000000',
  weight: 50,
  saturation: 0,
  lightness: 0,
};

const getStyle = (): StyleType => {
  return JSON.parse(JSON.stringify(style));
};

const label = {
  text: {
    fill: getStyle(),
    stroke: getStyle(),
  },
  icon: getStyle(),
};

const section = {
  fill: getStyle(),
  stroke: getStyle(),
};

export const getLabel = (): LabelType => {
  return JSON.parse(JSON.stringify(label));
};

export const getSection = (): CommonType => {
  return JSON.parse(JSON.stringify(section));
};
