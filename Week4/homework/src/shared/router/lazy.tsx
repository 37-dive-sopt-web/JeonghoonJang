import { lazy } from "react";

export const HomePage = lazy(() => import("@pages/home/home"));
export const LoginPage = lazy(() => import("@pages/login/login"));
export const SignupPage = lazy(() => import("@pages/signup/signup"));
export const MyPagePage = lazy(() => import("@pages/mypage/mypage"));
