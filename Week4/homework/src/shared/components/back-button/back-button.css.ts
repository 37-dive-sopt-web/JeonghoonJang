import { style } from "@vanilla-extract/css";

import { themeVars } from "@shared/styles/theme.css";

export const backButton = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0.4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: themeVars.color.grayscale1,
  fontSize: "2rem",
});

