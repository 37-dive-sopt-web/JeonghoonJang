import { api } from "@shared/apis/config/instance";
import { END_POINT } from "@shared/apis/config/end-point";
import type { ApiResponse, User } from "@shared/types/user";

/**
 * 사용자 정보 수정 요청 타입
 */
export interface UpdateUserRequest {
  name: string;
  email: string;
  age: number;
}

export type UserInfoApiResponse = ApiResponse<User>;
export type UpdateUserApiResponse = ApiResponse<User>;

/**
 * 사용자 정보 조회 API
 */
export const getUserInfoApi = async (
  userId: number
): Promise<UserInfoApiResponse> => {
  const endpoint = END_POINT.USER_INFO.replace(":id", String(userId));
  const response = await api.get<UserInfoApiResponse>(endpoint);
  return response.data;
};

/**
 * 사용자 정보 수정 API
 */
export const updateUserInfoApi = async (
  userId: number,
  data: UpdateUserRequest
): Promise<UpdateUserApiResponse> => {
  const endpoint = END_POINT.USER_INFO_UPDATE.replace(":id", String(userId));
  const response = await api.patch<UpdateUserApiResponse>(endpoint, data);
  return response.data;
};

export type DeleteUserApiResponse = ApiResponse<Record<string, never>>;

/**
 * 회원탈퇴 API
 */
export const deleteUserApi = async (
  userId: number
): Promise<DeleteUserApiResponse> => {
  const endpoint = END_POINT.USER_DELETE.replace(":id", String(userId));
  const response = await api.delete<DeleteUserApiResponse>(endpoint);
  return response.data;
};
