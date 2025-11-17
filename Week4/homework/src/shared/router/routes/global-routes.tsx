import {
  HomePage,
  LoginPage,
  MembersPage,
  MyPagePage,
  SignupPage,
} from "@shared/router/lazy";
import { ROUTE_PATH } from "@shared/router/path";

export const globalRoutes = [
  {
    path: ROUTE_PATH.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATH.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTE_PATH.MYPAGE,
    element: <MyPagePage />,
  },
  {
    path: ROUTE_PATH.MEMBERS,
    element: <MembersPage />,
  },
];
