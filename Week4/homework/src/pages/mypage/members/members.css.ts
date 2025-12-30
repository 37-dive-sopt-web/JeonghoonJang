import { recipe } from "@vanilla-extract/recipes";
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

export const title = style({
  fontSize: "2.4rem",
  fontWeight: 700,
  color: themeVars.color.grayscale1,
  marginBottom: "3rem",
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  marginBottom: "3rem",
});

export const inputGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
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
});

export const errorMessage = style({
  fontSize: "1.4rem",
  color: themeVars.color.semantic,
  textAlign: "center",
  padding: "0.8rem",
});

export const confirmButton = recipe({
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

export const memberInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
  padding: "2.4rem",
  backgroundColor: themeVars.color.grayscale9,
  borderRadius: "0.8rem",
  border: `1px solid ${themeVars.color.grayscale5}`,
});

export const infoRow = style({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
});

export const infoLabel = style({
  fontSize: "1.6rem",
  fontWeight: 500,
  color: themeVars.color.grayscale3,
  minWidth: "10rem",
});

export const infoValue = style({
  fontSize: "1.6rem",
  fontWeight: 400,
  color: themeVars.color.grayscale1,
});
