import { themeVars } from "@shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100dvh",
  width: "100%",
  backgroundColor: themeVars.color.grayscale9,
});

export const link = style({
  ...themeVars.fontStyles.body1_medium,
  color: themeVars.color.primary,
});
