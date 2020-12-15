import christmas from './theme/christmas.json';
import blueprint from './theme/blueprint.json';
import dark from './theme/dark.json';
import sketch from './theme/sketch.json';
import monochrome from './theme/monochrome.json';

const data = [
  {
    src: '/images/default.png',
    name: '표준',
  },
  {
    src: '/images/monochrome.png',
    name: '모노크롬',
    theme: monochrome,
  },
  {
    src: '/images/sketch.png',
    name: '스케치',
    theme: sketch,
  },
  {
    src: '/images/dark.png',
    name: '밤',
    theme: dark,
  },
  {
    src: '/images/christamas.png',
    name: '크리스마스',
    theme: christmas,
  },
  {
    src: '/images/blueprint.png',
    name: '청사진',
    theme: blueprint,
  },
];

export default data;
