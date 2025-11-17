/**
 * 애플리케이션 전체 설정을 관리하는 Config 파일
 */
const DEFAULT_CONFIG = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },
};

export const appConfig = {
  ...DEFAULT_CONFIG,
};
