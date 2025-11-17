export const ROUTE_PATH = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  MYPAGE: "/mypage",
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
