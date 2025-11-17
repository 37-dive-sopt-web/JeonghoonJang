import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

import { themeVars } from "@shared/styles/theme.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100dvh",
  width: "100%",
  backgroundColor: themeVars.color.grayscale9,
  padding: "2rem",
});

export const loginBox = style({
  width: "100%",
  maxWidth: "43rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
});

export const title = style({
  fontSize: "3.2rem",
  fontWeight: 700,
  color: themeVars.color.grayscale1,
  margin: 0,
});

export const form = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

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

export const passwordWrapper = style({
  position: "relative",
  width: "100%",
});

export const eyeButton = style({
  position: "absolute",
  right: "1.6rem",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  cursor: "pointer",
  padding: "0.4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: themeVars.color.grayscale3,
});

export const errorMessage = style({
  fontSize: "1.4rem",
  color: themeVars.color.semantic,
  textAlign: "center",
  padding: "0.8rem",
});

export const loginButton = recipe({
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

export const signupLink = style({
  fontSize: "1.4rem",
  color: themeVars.color.grayscale3,
  textDecoration: "none",
});
