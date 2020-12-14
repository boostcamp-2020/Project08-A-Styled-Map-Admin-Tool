import christmas from './theme/christmas.json';
import blueprint from './theme/blueprint.json';
import dark from './theme/dark.json';
import sketch from './theme/sketch.json';
import monochrome from './theme/monochrome.json';

const data = [
  {
    src:
      'https://user-images.githubusercontent.com/26402298/102054588-fa138b00-3e2c-11eb-9fc9-d06b4262a669.png',
    name: '표준',
  },
  {
    src:
      'https://user-images.githubusercontent.com/40742180/102055094-a8b7cb80-3e2d-11eb-93dd-ff32799a351e.png',
    name: '모노크롬',
    theme: monochrome,
  },
  {
    src:
      'https://user-images.githubusercontent.com/57997672/102054738-2b8c5680-3e2d-11eb-901b-a9347502e16b.png',
    name: '스케치',
    theme: sketch,
  },
  {
    src:
      'https://user-images.githubusercontent.com/40742180/102055087-a6ee0800-3e2d-11eb-9442-bb64c2ba430a.png',
    name: '밤',
    theme: dark,
  },
  {
    src:
      'https://user-images.githubusercontent.com/41146374/102054872-6098a900-3e2d-11eb-9151-048012b4f74d.png',
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
