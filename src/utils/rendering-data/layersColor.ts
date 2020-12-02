// 어차피 레이어 하나 바꾸면 다 바뀔 건데 체크박스로 해둘 필요가 있을까??
export default {
  poi: {
    landmark: {
      'poi-attraction': 'hsl(26, 25%, 32%)',
      'poi-arts-label': 'hsl(26, 25%, 32%)',
      'poi-landmark-label': 'hsl(26, 25%, 32%)',
    },
    business: {
      'poi-business': 'hsl(22, 55%, 55%)',
      'poi-food-label': 'hsl(22, 55%, 55%)',
      'poi-store-label': 'hsl(22, 55%, 55%)',
    },
    government: {
      'poi-government': 'hsl(26, 25%, 32%)',
      'poi-public-label': 'hsl(26, 25%, 32%)',
      'poi-general-label': 'hsl(26, 25%, 32%)',
    },
    medical: {
      'poi-medical': 'hsl(340, 39%, 42%)',
      'poi-medical-label': 'hsl(340, 39%, 42%)',
    },
    park: {
      'poi-park': 'hsl(100, 45%, 37%)',
      'poi-park-label': 'hsl(100, 45%, 37%)',
    },
    worship: {
      'poi-worship': 'hsl(26, 25%, 32%)',
      'poi-religion-label': 'hsl(26, 25%, 32%)',
    },
    school: {
      'poi-school': 'hsl(51, 40%, 40%)',
      'poi-education-label': 'hsl(51, 40%, 40%)',
    },
    sports: {
      'poi-sport-label': 'hsl(26, 25%, 32%)',
    },
    etc: {
      'poi-etc': 'hsl(26, 25%, 32%)',
      'poi-industrial-label': 'hsl(26, 25%, 32%)',
      'poi-historic-label': 'hsl(26, 25%, 32%)',
      'poi-building-label': 'hsl(26, 25%, 32%)',
    },
  },
  road: {
    highway: {},
    arterial: {},
    local: {},
    sidewalk: {},
    'bicycle-road': {},
  },
  administrative: {
    country: {
      'admin-0-boundary': 'hsl(230, 8%, 51%)',
      'admin-0-boundary-bg': 'hsl(35, 12%, 89%)',
      'admin-0-boundary-disputed': 'hsl(230, 8%, 51%)',
      'country-label': 'hsl(0, 0%, 0%)',
    },
    state: {
      'admin-1-boundary-bg': 'hsl(35, 12%, 89%)',
      'admin-1-boundary': 'hsl(230, 14%, 77%)',
      'state-label': 'hsl(0, 0%, 0%)',
    },
    locality: {
      'settlement-label': 'hsl(0, 0%, 0%)',
      'settlement-subdivision-label': 'hsl(230, 29%, 35%)',
    },
  },
  landscape: {
    'human-made': {},
    building: {},
    natural: {},
    landcover: {},
    mountain: {},
  },
  transit: {
    airport: {
      'mapbox-airport-aeroway-polygon': 'hsl(40, 97%, 64%)',
      'mapbox-airport-polygon': 'hsl(234, 20%, 30%)',
      'mapbox-airport-aeroway-line': 'hsl(230, 23%, 82%)',
      'mapbox-airport-label': 'hsl(0, 69%, 50%)',
    },
    bus: {
      'transit-bus-label': 'hsl(13, 68%, 63%)',
    },
    rail: {
      'mapbox-rail-road-line': 'hsl(234, 20%, 30%)',
      'transit-rail-line': 'hsl(234, 20%, 30%)',
    },
    subway: {
      'transit-subway-line': 'hsl(192, 70%, 43%)',
    },
  },
  water: {
    water: 'hsl(205, 87%, 76%)',
    'water-polygon': 'hsl(205, 87%, 76%)',
    'water-line-label': 'hsl(230, 48%, 44%)',
    'water-point-label': 'hsl(230, 48%, 44%)',
    'waterway-label': 'hsl(230, 48%, 44%)',
  },
};
