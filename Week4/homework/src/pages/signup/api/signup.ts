import { api } from "@shared/apis/config/instance";
import { END_POINT } from "@shared/apis/config/end-point";

/**
 * 회원가입 요청 타입
 */
export interface SignupRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

/**
 * 회원가입 응답 타입
 */
export interface SignupResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

/**
 * 회원가입 API 호출
 */
export const signupApi = async ({
  username,
  password,
  name,
  email,
  age,
}: SignupRequest): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>(END_POINT.SIGNUP, {
    username,
    password,
    name,
    email,
    age,
  });
  return response.data;
};
