const STORAGE_KEY = "ranking";

export const rankingStorageService = {
  /**
   * 로컬스토리지에서 기록을 가져옵니다.
   */
  getRankings() {
    const data = localStorage.getItem(STORAGE_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("JSON 파싱 에러:", error);
      return [];
    }
  },

  /**
   * 로컬 스토리지에 기록을 저장합니다.
   */
  saveRankings(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },

  /**
   * 로컬 스토리지를 삭제합니다.
   */
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
