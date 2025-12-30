import { createTheme } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { color } from "./token/color.css";
import { zIndex } from "./token/z-index.css";
import { width } from "./token/width.css";
import { typography } from "./token/typography.css";
import { fontStyles } from "./token/font-style.css";

const tokens = {
  color: color,
  fontStyles: fontStyles,
  width: width,
  zIndex: zIndex,
  ...typography,
};

const properties = defineProperties({
  properties: tokens,
});
const sprinkles = createSprinkles(properties);

const [themeClass, themeVars] = createTheme(tokens);

export { sprinkles, themeClass, themeVars, tokens };
