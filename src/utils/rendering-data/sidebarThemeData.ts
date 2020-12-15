import christmas from './theme/christmas.json';
import blueprint from './theme/blueprint.json';
import dark from './theme/dark.json';
import sketch from './theme/sketch.json';
import monochrome from './theme/monochrome.json';
import defaultPng from '../../public/image/default.png';
import monochromePng from '../../public/image/monochrome.png';
import sketchPng from '../../public/image/sketch.png';
import darkPng from '../../public/image/dark.png';
import christamasPng from '../../public/image/christamas.png';
import blueprintPng from '../../public/image/blueprint.png';

const data = [
  {
    src: defaultPng,
    name: '표준',
  },
  {
    src: monochromePng,
    name: '모노크롬',
    theme: monochrome,
  },
  {
    src: sketchPng,
    name: '스케치',
    theme: sketch,
  },
  {
    src: darkPng,
    name: '밤',
    theme: dark,
  },
  {
    src: christamasPng,
    name: '크리스마스',
    theme: christmas,
  },
  {
    src: blueprintPng,
    name: '청사진',
    theme: blueprint,
  },
];

export default data;
