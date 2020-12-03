import { PropertyType } from '../../store/common/type';

const layersColor: PropertyType = {
  poi: {
    all: {
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
      labelIcon: 'transparent',
    },
    landmark: {
      labelText: {
        fill: 'hsl(26, 25%, 32%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
    business: {
      labelText: {
        fill: 'hsl(22, 55%, 55%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
    government: {
      labelText: {
        fill: 'hsl(26, 25%, 32%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
    medical: {
      labelText: {
        fill: 'hsl(340, 39%, 42%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
    park: {
      labelText: {
        fill: 'hsl(100, 45%, 37%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
    worship: {
      labelText: {
        fill: 'hsl(26, 25%, 32%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
    school: {
      labelText: {
        fill: 'hsl(51, 40%, 40%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
    sports: {
      labelText: {
        fill: 'hsl(26, 25%, 32%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
    etc: {
      labelText: {
        fill: 'hsl(26, 25%, 32%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
      labelIcon: 'transparent',
    },
  },
  road: {
    all: {
      section: {
        fill: 'transparent',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
    arterial: {
      section: {
        fill: 'hsl(0, 0%, 100%)',
        stroke: 'hsl(230, 24%, 87%)',
      },
      labelText: {
        fill: 'hsl(230, 48%, 44%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
    local: {
      section: {
        fill: 'hsl(35, 14%, 93%)',
        stroke: 'hsl(230, 24%, 87%)',
      },
      labelText: {
        fill: 'hsl(230, 48%, 44%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
    sidewalk: {
      section: {
        fill: 'hsl(0, 0%, 100%)',
        stroke: 'hsl(230, 24%, 87%)',
      },
      labelText: {
        fill: 'hsl(230, 48%, 44%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
  },
  administrative: {
    all: {
      section: {
        fill: 'transparent',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
    country: {
      section: {
        fill: 'transparent',
        stroke: 'hsl(230, 8%, 51%)',
      },
      labelText: {
        fill: 'hsl(0, 0%, 0%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
    state: {
      section: {
        fill: 'transparent',
        stroke: 'hsl(230, 14%, 77%)',
      },
      labelText: {
        fill: 'hsl(0, 0%, 0%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
    locality: {
      labelText: {
        fill: 'hsl(0, 0%, 0%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
  },
  landscape: {
    all: {
      section: {
        fill: 'transparent',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
    'human-made': {
      section: {
        fill: 'hsl(35, 11%, 86%)',
        stroke: 'hsl(75, 57%, 84%)',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
    building: {
      section: {
        fill: 'hsl(35, 11%, 86%)',
        stroke: 'hsl(35, 6%, 79%)',
      },
      labelText: {
        fill: 'hsl(35, 2%, 69%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
    natural: {
      section: {
        fill: 'hsl(75, 62%, 81%)',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'hsl(26, 25%, 32%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
    landcover: {
      section: {
        fill: 'hsl(75, 62%, 81%)',
        stroke: 'hsl(35, 12%, 89%)',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
    mountain: {
      section: {
        fill: 'hsl(56, 59%, 22%)',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
  },
  transit: {
    all: {
      section: {
        fill: 'transparent',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
    airport: {
      section: {
        fill: 'hsl(234, 20%, 30%)',
        stroke: 'hsl(230, 23%, 82%)',
      },
      labelText: {
        fill: 'hsl(230, 48%, 44%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
    bus: {
      section: {
        fill: 'transparent',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'hsl(234, 20%, 30%)',
        stroke: 'hsl(0, 0%, 100%)',
      },
    },
    rail: {
      section: {
        fill: 'hsl(234, 20%, 30%)',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
    subway: {
      section: {
        fill: 'hsl(192, 70%, 43%)',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
  },
  water: {
    all: {
      section: {
        fill: 'hsl(205, 87%, 76%)',
        stroke: 'transparent',
      },
      labelText: {
        fill: 'hsl(230, 48%, 44%)',
        stroke: 'transparent',
      },
    },
  },
  marker: {
    all: {
      labelText: {
        fill: 'transparent',
        stroke: 'transparent',
      },
    },
  },
};

export default layersColor;
