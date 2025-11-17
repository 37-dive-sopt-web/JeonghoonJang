import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

import { themeVars } from "@shared/styles/theme.css";

export const button = recipe({
  base: {
    width: "100%",
    height: "5rem",
    fontSize: "1.6rem",
    fontWeight: 600,
    color: themeVars.color.grayscale9,
    backgroundColor: themeVars.color.yellow,
    border: "none",
    borderRadius: "0.8rem",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  variants: {
    disabled: {
      true: {
        opacity: 0.6,
        cursor: "not-allowed",
      },
      false: {
        opacity: 1,
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});
