import christmas from './theme/christmas.json';
import blueprint from './theme/blueprint.json';
import dark from './theme/dark.json';
import sketch from './theme/sketch.json';

const data = [
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '표준',
  },
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '실버',
  },
  {
    src:
      'https://user-images.githubusercontent.com/57997672/102054738-2b8c5680-3e2d-11eb-901b-a9347502e16b.png',
    name: '스케치',
    theme: sketch,
  },
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '밤',
    theme: dark,
  },
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '크리스마스',
    theme: christmas,
  },
  {
    src:
      'https://user-images.githubusercontent.com/26402298/102014565-f551c700-3d99-11eb-9817-f71e2dde1772.png',
    name: '청사진',
    theme: blueprint,
  },
];

export default data;
