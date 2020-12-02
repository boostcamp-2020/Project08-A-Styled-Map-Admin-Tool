import {
  SubElementNameType,
  ElementNameType,
  FeatureNameType,
  PropertyType,
} from '../../store/common/type';

export default {
  [FeatureNameType.poi]: {
    all: {},
    landmark: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(26, 25%, 32%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
    business: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(22, 55%, 55%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
    government: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(26, 25%, 32%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
    medical: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(340, 39%, 42%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
    park: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(100, 45%, 37%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
    worship: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(26, 25%, 32%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
    school: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(51, 40%, 40%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
    sports: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(26, 25%, 32%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
    etc: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(26, 25%, 32%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
      [ElementNameType.labelIcon]: 'transparent',
    },
  },
  [FeatureNameType.road]: {
    all: {
      [ElementNameType.section]: {
        [SubElementNameType.fill]: 'transparent',
        [SubElementNameType.stroke]: 'transparent',
      },
    },
  },
  [FeatureNameType.administrative]: {
    all: {},
    country: {
      [ElementNameType.section]: {
        [SubElementNameType.fill]: 'transparent',
        [SubElementNameType.stroke]: 'hsl(230, 8%, 51%)',
      },
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(0, 0%, 0%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
    },
    state: {
      [ElementNameType.section]: {
        [SubElementNameType.fill]: 'transparent',
        [SubElementNameType.stroke]: 'hsl(230, 14%, 77%)',
      },
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(0, 0%, 0%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
    },
    locality: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(0, 0%, 0%)',
        [SubElementNameType.stroke]: 'hsl(0, 0%, 100%)',
      },
    },
  },
  [FeatureNameType.landscape]: {
    all: {
      [ElementNameType.section]: {
        [SubElementNameType.fill]: 'transparent',
        [SubElementNameType.stroke]: 'transparent',
      },
    },
  },
  [FeatureNameType.transit]: {
    all: {
      [ElementNameType.section]: {
        [SubElementNameType.fill]: 'transparent',
        [SubElementNameType.stroke]: 'transparent',
      },
    },
  },
  [FeatureNameType.water]: {
    all: {
      [ElementNameType.section]: {
        [SubElementNameType.fill]: 'hsl(205, 87%, 76%)',
        [SubElementNameType.stroke]: 'transparent',
      },
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'hsl(230, 48%, 44%)',
        [SubElementNameType.stroke]: 'transparent',
      },
    },
  },
  [FeatureNameType.marker]: {
    all: {
      [ElementNameType.labelText]: {
        [SubElementNameType.fill]: 'transparent',
        [SubElementNameType.stroke]: 'transparent',
      },
    },
  },
};
