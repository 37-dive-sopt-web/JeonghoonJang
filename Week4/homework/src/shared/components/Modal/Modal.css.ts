import { style } from "@vanilla-extract/css";

import { themeVars } from "@shared/styles/theme.css";

export const modalOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: themeVars.color.grayscale9,
  borderRadius: "1.2rem",
  padding: "3rem",
  maxWidth: "40rem",
  width: "90%",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
});

export const modalTitle = style({
  fontSize: "2rem",
  fontWeight: 700,
  color: themeVars.color.grayscale1,
  margin: 0,
  textAlign: "center",
});

export const modalMessage = style({
  fontSize: "1.6rem",
  fontWeight: 400,
  color: themeVars.color.grayscale1,
  margin: 0,
  textAlign: "center",
});

export const modalButtons = style({
  display: "flex",
  gap: "1.2rem",
});

export const modalCancelButton = style({
  flex: 1,
  height: "5rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  color: themeVars.color.grayscale1,
  backgroundColor: themeVars.color.grayscale9,
  border: `1px solid ${themeVars.color.grayscale5}`,
  borderRadius: "0.8rem",
  cursor: "pointer",
});

export const modalDeleteButton = style({
  flex: 1,
  height: "5rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  color: themeVars.color.grayscale9,
  backgroundColor: themeVars.color.semantic,
  border: "none",
  borderRadius: "0.8rem",
  cursor: "pointer",
});
