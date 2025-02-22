const BASE_GREEN = '#116D6E';
const BASE_RED = '#731106';
const RED_LIGHTEN20 = '#b51c0b';
const BASE_BROWN = '#4E3636';

const GRAY = '#DDD';
const GRAY_LIGHTEN20 = '#EEE';
const GRAY_LIGHTEN50 = '#FFF';
const GRAY_DARKEN20 = '#AAA';
const GRAY_DARKEN50 = '#888';

const BLACK = '#222';
const BLACK_LIGHTEN20 = '#333';
const BLACK_LIGHTEN50 = '#444';
const BLACK_DARKEN20 = '#111';
const BLACK_DARKEN50 = '#000';

const Colors = {
  TEXT: {
    ERROR: RED_LIGHTEN20,
    GREEN: BASE_GREEN,
    BASE: GRAY,
    DARKEN20: GRAY_DARKEN20,
    DARKEN50: GRAY_DARKEN50,
    LINK: BASE_GREEN
  },
  BORDER: {
    LIGHTEN: GRAY_LIGHTEN20,
    DARKEN: GRAY_DARKEN20,
    DARKEN50: GRAY_DARKEN50,
    BASE: GRAY,
    GREEN: BASE_GREEN
  },
  BUTTON: {
    PRIMARY: BASE_GREEN,
    SECONDARY: BASE_BROWN,
    DESTROY: BASE_RED
  },
  CHECKBOX: {
    CHECKED: BLACK
  },
  BACKGROUND: {
    BLACK: BLACK,
    BASE: BLACK_LIGHTEN20,
    LIGHTEN: BLACK_LIGHTEN50,
    GRAY: GRAY,
    GRAY_DARKEN: GRAY_DARKEN20,
    BROWN: BASE_BROWN,
    GREEN: BASE_GREEN
  },
  TABS: {
    ACTIVE: GRAY,
    BASE: BLACK_LIGHTEN20
  }
};

export default Colors;
