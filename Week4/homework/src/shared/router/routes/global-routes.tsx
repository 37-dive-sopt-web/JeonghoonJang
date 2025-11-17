import { HomePage } from "@shared/router/lazy";
import { ROUTE_PATH } from "@shared/router/path";

export const globalRoutes = [
  {
    path: ROUTE_PATH.HOME,
    element: <HomePage />,
  },
];
