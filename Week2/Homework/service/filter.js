/**
 * 필터 폼 데이터를 추출하고 정규화된 형태로 반환해요.
 * - 문자열은 소문자 변환 및 trim 처리하고
 * - 숫자 입력은 Number()로 변환해요. (입력값 없을 경우 0 반환)
 *
 * @param {HTMLFormElement} filterformData - 검색 필터 폼 요소
 * @returns {{
 *   name: string,
 *   englishName: string,
 *   github: string,
 *   gender: string,
 *   role: string,
 *   codeReviewGroup: number,
 *   age: number
 * }} 정규화된 필터 객체
 */
export const extractFilterValues = (filterformData) => {
  const formData = new FormData(filterformData);
  return {
    name: (formData.get("name") || "").toString().trim().toLowerCase(),
    englishName: (formData.get("englishName") || "")
      .toString()
      .trim()
      .toLowerCase(),
    github: (formData.get("githubId") || "").toString().trim().toLowerCase(),
    gender: (formData.get("gender") || "").toString(),
    role: (formData.get("role") || "").toString(),
    codeReviewGroup: Number(formData.get("groupId") || ""),
    age: Number(formData.get("age") || ""),
  };
};

/**
 * 필터 조건을 기반으로 멤버 리스트를 필터링해요.
 * - 문자열 필터는 부분 일치 (includes)
 * - 숫자 필터는 정확히 일치
 * - 입력되지 않은 필터 값은 조건에서 무시되요.
 *
 * @param {Array<{
 *   id: number,
 *   name: string,
 *   englishName: string,
 *   github: string,
 *   gender: string,
 *   role: string,
 *   codeReviewGroup: number,
 *   age: number
 * }>} memberList - 전체 멤버 리스트
 *
 * @param {{
 *   name: string,
 *   englishName: string,
 *   github: string,
 *   gender: string,
 *   role: string,
 *   codeReviewGroup: number,
 *   age: number
 * }} filter - 필터 객체 (getFilters()의 반환값)
 * @returns {Array<Object>} 필터링된 멤버 리스트
 */
export const applyFilters = (memberList, filter) => {
  const { name, englishName, github, gender, role, codeReviewGroup, age } =
    filter;

  return memberList.filter(
    ({
      name: memberName,
      englishName: memberEng,
      github: memberGithub,
      gender: memberGender,
      role: memberRole,
      codeReviewGroup: memberGroup,
      age: memberAge,
    }) => {
      const matchesName = !name || memberName.toLowerCase().includes(name);

      const matchesEnglishName =
        !englishName || memberEng.toLowerCase().includes(englishName);

      const matchesGithub =
        !github || memberGithub.toLowerCase().includes(github);

      const matchesGender = !gender || memberGender === gender;

      const matchesRole = !role || memberRole === role;

      const matchesGroup = !codeReviewGroup || memberGroup === codeReviewGroup;

      const matchesAge = !age || memberAge === age;

      return (
        matchesName &&
        matchesEnglishName &&
        matchesGithub &&
        matchesGender &&
        matchesRole &&
        matchesGroup &&
        matchesAge
      );
    }
  );
};

/**
 * 필터 폼을 초기화해요.
 * @param {HTMLFormElement} form - 검색 필터 폼 요소
 */
export const clearFilterForm = (form) => form.reset();
