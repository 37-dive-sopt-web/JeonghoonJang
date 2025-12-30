/**
 * localStorage 관련 유틸 함수
 */
const USER_ID_KEY = "userId";

export const getUserId = (): number | null => {
  const userId = localStorage.getItem(USER_ID_KEY);
  return userId ? Number(userId) : null;
};

export const setUserId = (userId: number): void => {
  localStorage.setItem(USER_ID_KEY, String(userId));
};

export const removeUserId = (): void => {
  localStorage.removeItem(USER_ID_KEY);
};

