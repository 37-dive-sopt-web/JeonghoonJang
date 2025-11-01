import { memberStorageService } from "../service/member-storage-service.js";

const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modalForm = modal.querySelector("form.modalSection");

/**
 * 모달 창을 열어요.
 * - `dialog.showModal()`을 호출하여 화면 중앙에 표시해요.
 * @returns {void}
 */
const openModal = () => modal.showModal();

/**
 * 모달 폼을 초기화하고 닫아요.
 * - 입력값을 모두 리셋하고 `dialog.close()`를 호출해요.
 * @returns {void}
 */
const closeAndResetModal = () => {
  modalForm.reset();
  modal.close();
};

/**
 * 주어진 폼 요소에서 입력값을 추출하고 정규화해요.
 * - 문자열 필드는 trim 처리하고
 * - 숫자 필드는 Number()로 변환해요.
 *
 * @param {HTMLFormElement} formElements - 멤버 추가 모달 폼 요소
 * @returns {{
 *   name: string,
 *   englishName: string,
 *   githubId: string,
 *   gender: string,
 *   role: string,
 *   groupId: number,
 *   age: number
 * }} 정규화된 폼 입력값 객체
 */
const getFormValues = (formElements) => {
  const formData = new FormData(formElements);
  const value = (key) => (formData.get(key) ?? "").toString().trim();
  const number = (key) => Number(formData.get(key));
  return {
    name: value("name"),
    englishName: value("englishName"),
    githubId: value("githubId"),
    gender: value("gender"),
    role: value("role"),
    groupId: number("groupId"),
    age: number("age"),
  };
};

/**
 * 다음 멤버의 고유 ID를 계산해요.
 * - 현재 멤버 목록 중 가장 큰 ID 값 + 1을 반환하고
 * - 멤버가 없으면 1을 반환해요.
 *
 * @param {Array<{ id: number }>} members - 현재 저장된 멤버 배열
 * @returns {number} 다음 멤버 ID
 */
const nextMemberId = (members) =>
  members.length === 0 ? 1 : Math.max(...members.map((m) => m.id)) + 1;

openModalBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeAndResetModal);

/**
 * 모달 외부 클릭 시 닫기 처리
 * @param {MouseEvent} e - 클릭 이벤트 객체
 */
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeAndResetModal();
});

/**
 * 모달 제출 이벤트 처리
 * - 폼 데이터를 읽고 새 멤버를 추가해요.
 * - 로컬스토리지에 저장 후, 모달 닫기 + 커스텀 이벤트 발행해요.
 *
 * @param {SubmitEvent} e - 폼 제출 이벤트
 * @returns {void}
 */
modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { name, englishName, githubId, gender, role, groupId, age } =
    getFormValues(modalForm);

  const members = memberStorageService.getMembers() || [];
  const newMember = {
    id: nextMemberId(members),
    name,
    englishName,
    github: githubId,
    gender,
    role,
    codeReviewGroup: groupId,
    age,
  };

  members.push(newMember);
  memberStorageService.saveMembers(members);

  closeAndResetModal();
  document.dispatchEvent(
    new CustomEvent("member:added", { detail: newMember })
  );
});
