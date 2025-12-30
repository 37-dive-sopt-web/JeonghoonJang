export const END_POINT = {
  SIGNUP: "/api/v1/users",
  LOGIN: "/api/v1/auth/login",
  USER_INFO: "/api/v1/users/:id",
  USER_DELETE: "/api/v1/users/:id",
  USER_INFO_UPDATE: "/api/v1/users/:id",
} as const;
