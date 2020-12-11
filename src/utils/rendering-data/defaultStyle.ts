import { DefaultWholeStyle } from '../../store/common/type';

const defaultStyle: DefaultWholeStyle = {
  poi: {
    all: {
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    landmark: {
      labelText: {
        fill: { color: 'hsl(26, 25%, 32%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    business: {
      labelText: {
        fill: { color: 'hsl(22, 55%, 55%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    government: {
      labelText: {
        fill: { color: 'hsl(26, 25%, 32%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    medical: {
      labelText: {
        fill: { color: 'hsl(340, 39%, 42%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    park: {
      labelText: {
        fill: { color: 'hsl(100, 45%, 37%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    worship: {
      labelText: {
        fill: { color: 'hsl(26, 25%, 32%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    school: {
      labelText: {
        fill: { color: 'hsl(51, 40%, 40%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    sports: {
      labelText: {
        fill: { color: 'hsl(26, 25%, 32%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    etc: {
      labelText: {
        fill: { color: 'hsl(26, 25%, 32%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
  },
  road: {
    all: {
      section: {
        fill: { color: 'transparent', weight: 2 },
        stroke: { color: 'transparent', weight: 1 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 1 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    highway: {
      section: {
        fill: { color: 'hsl(26, 87%, 62%)', weight: 1 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
      labelText: {
        fill: { color: 'hsl(0, 0%, 0%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 1 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    arterial: {
      section: {
        fill: { color: 'hsl(0, 0%, 100%)', weight: 1 },
        stroke: { color: 'hsl(230, 24%, 87%)', weight: 0.5 },
      },
      labelText: {
        fill: { color: 'hsl(0, 0%, 0%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 1 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    local: {
      section: {
        fill: { color: 'hsl(0, 0%, 100%)', weight: 0.75 },
        stroke: { color: 'hsl(230, 24%, 87%)', weight: 1 },
      },
      labelText: {
        fill: { color: 'hsl(0, 0%, 0%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 1 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
    sidewalk: {
      section: {
        fill: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
        stroke: { color: 'hsl(230, 24%, 87%)', weight: 2 },
      },
      labelText: {
        fill: { color: 'hsl(0, 0%, 0%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 1 },
      },
      labelIcon: { color: 'transparent', weight: 0 },
    },
  },
  administrative: {
    all: {
      section: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0.5 },
      },
    },
    country: {
      section: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'hsl(230, 8%, 51%)', weight: 0 },
      },
      labelText: {
        fill: { color: 'hsl(0, 0%, 0%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
    },
    state: {
      section: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'hsl(230, 14%, 77%)', weight: 0 },
      },
      labelText: {
        fill: { color: 'hsl(0, 0%, 0%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
    },
    locality: {
      labelText: {
        fill: { color: 'hsl(0, 0%, 0%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
    },
  },
  landscape: {
    all: {
      section: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
    },
    humanmade: {
      section: {
        fill: { color: 'hsl(35, 11%, 86%)', weight: 0 },
        stroke: { color: 'hsl(75, 57%, 84%)', weight: 0 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
    },
    building: {
      section: {
        fill: { color: 'hsl(35, 11%, 86%)', weight: 0 },
        stroke: { color: 'hsl(35, 6%, 79%)', weight: 1 },
      },
      labelText: {
        fill: { color: 'hsl(35, 2%, 69%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
    },
    natural: {
      section: {
        fill: { color: 'hsl(100, 58%, 76%)', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelText: {
        fill: { color: 'hsl(26, 25%, 32%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
    },
    landcover: {
      section: {
        fill: { color: 'hsl(35, 32%, 91%)', weight: 0 },
        stroke: { color: 'hsl(35, 12%, 89%)', weight: 1 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
    },
    mountain: {
      section: {
        fill: { color: 'hsl(56, 59%, 22%)', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
    },
  },
  transit: {
    all: {
      section: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0.5 },
      },
    },
    airport: {
      section: {
        fill: { color: 'hsl(230, 23%, 82%)', weight: 0 },
        stroke: { color: 'hsl(230, 23%, 82%)', weight: 1 },
      },
      labelText: {
        fill: { color: 'hsl(230, 48%, 44%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
    },
    bus: {
      section: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelText: {
        fill: { color: 'hsl(234, 20%, 30%)', weight: 0 },
        stroke: { color: 'hsl(0, 0%, 100%)', weight: 0.5 },
      },
    },
    rail: {
      section: {
        fill: { color: 'hsl(234, 20%, 30%)', weight: 0 },
        stroke: { color: 'transparent', weight: 1 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0.5 },
      },
    },
    subway: {
      section: {
        fill: { color: 'hsl(192, 70%, 43%)', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelText: {
        fill: { color: 'transparent', weight: 0 },
        stroke: { color: 'transparent', weight: 0.5 },
      },
    },
  },
  water: {
    all: {
      section: {
        fill: { color: 'hsl(196, 80%, 70%)', weight: 0 },
        stroke: { color: 'transparent', weight: 0 },
      },
      labelText: {
        fill: { color: 'hsl(230, 48%, 44%)', weight: 0 },
        stroke: { color: 'transparent', weight: 0.5 },
      },
    },
  },
};

export default defaultStyle;
