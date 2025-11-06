import { MOCK_MEMBERS_DATA } from "../data/member-data.js";
import { memberStorageService } from "../service/member-storage-service.js";
import {
  clearFilterForm,
  extractFilterValues,
  applyFilters,
} from "../service/filter.js";

const tbody = document.getElementById("listBody");
const checkAll = document.getElementById("checkAllList");
const filterForm = document.querySelector(".filterSection");

const resetButton = filterForm.querySelector('button[type="reset"]');

const deleteListItemButton = document.querySelector(
  '.listButtons button[type="delete"]'
);

if (!memberStorageService.hasMembers()) {
  memberStorageService.saveMembers(MOCK_MEMBERS_DATA);
}

const genderToKorean = (gender) => {
  return (gender = gender === "male" ? "남자" : "여자");
};

/**
 * 멤버 리스트를 렌더링해요.
 * - 필터링된 리스트가 있으면 해당 데이터로 렌더링하고,
 * - 없으면 로컬 스토리지의 전체 멤버 데이터를 표시해요.
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
 * }>=} filteredList - 필터링된 멤버 리스트 (선택값)
 * @returns {void}
 */
const render = (filteredList) => {
  const members = filteredList ?? memberStorageService.getMembers();

  tbody.innerHTML = members
    .map(
      ({
        id,
        name,
        englishName,
        github,
        gender,
        role,
        codeReviewGroup,
        age,
      }) => `
        <tr data-id="${id}" class="listBodyItem">
          <td><input type="checkbox" class="checkListItem" /></td>
          <td>${name}</td>
          <td>${englishName}</td>
          <td><a href="https://github.com/${github}" target="_blank" rel="noreferrer">${github}</a></td>
          <td>${genderToKorean(gender)}</td>
          <td>${role}</td>
          <td>${codeReviewGroup}</td>
          <td>${age}</td>
        </tr>
      `
    )
    .join("");

  checkAll.checked = false;
};

/**
 * 필터 폼 제출 시 실행돼요.
 * - 입력된 조건을 추출하여 리스트를 필터링하고 렌더링합니다.
 */
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const memberList = memberStorageService.getMembers();
  const filters = extractFilterValues(filterForm);
  const filteredList = applyFilters(memberList, filters);
  render(filteredList);
});

/**
 * 필터 폼 초기화 버튼 클릭 시
 * - 입력된 필터를 초기화하고 전체 리스트를 다시 렌더링해요.
 */
resetButton.addEventListener("click", () => {
  clearFilterForm(filterForm);
  render();
});

/**
 * 전체 선택 체크박스 상태 변경 시,
 * 리스트 내 개별 항목 체크박스의 상태를 일괄 변경해요.
 */
checkAll.addEventListener("change", (e) => {
  const checked = e.target.checked;
  tbody
    .querySelectorAll(".checkListItem")
    .forEach((check) => (check.checked = checked));
});

/**
 * 선택된 멤버들을 삭제하고 로컬스토리지를 갱신해요.
 */
deleteListItemButton.addEventListener("click", (e) => {
  e.preventDefault();

  const checkedIds = [...tbody.querySelectorAll(".checkListItem")]
    .filter((input) => input.checked)
    .map((input) => Number(input.closest("tr").dataset.id));

  if (checkedIds.length === 0) return;

  let members = memberStorageService.getMembers();
  members = members.filter(({ id }) => !checkedIds.includes(id));

  memberStorageService.saveMembers(members);

  render();
});

document.addEventListener("member:added", () => render());

render();
