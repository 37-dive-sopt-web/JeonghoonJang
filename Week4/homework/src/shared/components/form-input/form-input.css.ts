import { style } from "@vanilla-extract/css";

import { themeVars } from "@shared/styles/theme.css";

export const inputGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  width: "100%",
});

export const label = style({
  fontSize: "1.6rem",
  fontWeight: 500,
  color: themeVars.color.grayscale1,
});

export const input = style({
  width: "100%",
  height: "5rem",
  padding: "0 1.6rem",
  fontSize: "1.6rem",
  border: `1px solid ${themeVars.color.grayscale5}`,
  borderRadius: "0.8rem",
  backgroundColor: themeVars.color.grayscale9,
  outline: "none",
  "::placeholder": {
    color: themeVars.color.grayscale4,
  },
});

export const readOnlyInput = style({
  width: "100%",
  height: "5rem",
  padding: "0 1.6rem",
  fontSize: "1.6rem",
  border: `1px solid ${themeVars.color.grayscale5}`,
  borderRadius: "0.8rem",
  backgroundColor: themeVars.color.grayscale7,
  outline: "none",
  color: themeVars.color.grayscale3,
  cursor: "not-allowed",
});

export const errorMessage = style({
  fontSize: "1.4rem",
  color: themeVars.color.semantic,
  textAlign: "center",
  padding: "0.8rem",
});

