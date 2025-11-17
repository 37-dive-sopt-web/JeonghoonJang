import { END_POINT } from "@shared/apis/config/end-point";
import { api } from "@shared/apis/config/instance";

/**
 * 로그인 요청 타입
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 로그인 응답 타입
 */
export interface LoginResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    userId: number;
    message: string;
  };
}

/**
 * 로그인 API 호출
 */
export const loginApi = async ({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(END_POINT.LOGIN, {
    username,
    password,
  });
  return response.data;
};
