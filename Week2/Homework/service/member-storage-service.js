const STORAGE_KEY = "members";

export const memberStorageService = {
  /**
   * 로컬스토리지에서 멤버들을 가져옵니다.
   */
  getMembers() {
    const data = localStorage.getItem(STORAGE_KEY);
    try {
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("JSON 파싱 에러:", error);
      return [];
    }
  },

  /**
   * 로컬 스토리지에 멤버를 저장합니다.
   */
  saveMembers(member) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(member));
  },

  /**
   * 멤버가 존재하는지 확인합니다.
   */
  hasMembers() {
    return localStorage.getItem(STORAGE_KEY) !== null;
  },
};
