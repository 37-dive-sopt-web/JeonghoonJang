import { style } from "@vanilla-extract/css";

import { themeVars } from "@shared/styles/theme.css";

export const container = style({
  width: "100%",
  minHeight: "100dvh",
  backgroundColor: themeVars.color.grayscale9,
});

export const content = style({
  padding: "3rem",
  maxWidth: "80rem",
  margin: "0 auto",
});

export const sectionTitle = style({
  fontSize: "2.4rem",
  fontWeight: 700,
  color: themeVars.color.grayscale1,
  marginBottom: "3rem",
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
});

export const formRow = style({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
});

export const label = style({
  fontSize: "1.6rem",
  fontWeight: 500,
  color: themeVars.color.grayscale1,
  minWidth: "10rem",
});

export const input = style({
  flex: 1,
  height: "5rem",
  padding: "0 1.6rem",
  fontSize: "1.6rem",
  border: `1px solid ${themeVars.color.grayscale5}`,
  borderRadius: "0.8rem",
  backgroundColor: themeVars.color.grayscale9,
  outline: "none",
});

export const readOnlyInput = style({
  flex: 1,
  height: "5rem",
  padding: "0 1.6rem",
  fontSize: "1.6rem",
  border: `1px solid ${themeVars.color.grayscale5}`,
  borderRadius: "0.8rem",
  backgroundColor: themeVars.color.grayscale7,
  outline: "none",
  color: themeVars.color.grayscale3,
});

export const saveButton = style({
  width: "100%",
  height: "5rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  color: themeVars.color.grayscale9,
  backgroundColor: themeVars.color.yellow,
  border: "none",
  borderRadius: "0.8rem",
  cursor: "pointer",
  marginTop: "2rem",
});
