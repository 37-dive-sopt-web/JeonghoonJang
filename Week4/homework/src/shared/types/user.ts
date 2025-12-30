/**
 * 사용자 정보 타입
 */
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

/**
 * API 공통 응답 구조
 */
export interface ApiResponse<T = Record<string, never>> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

