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
          <td>${gender}</td>
          <td>${role}</td>
          <td>${codeReviewGroup}</td>
          <td>${age}</td>
        </tr>
      `
    )
    .join("");

  checkAll.checked = false;
};

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const memberList = memberStorageService.getMembers();
  const filters = extractFilterValues(filterForm);
  const filteredList = applyFilters(memberList, filters);
  render(filteredList);
});

resetButton.addEventListener("click", () => {
  clearFilterForm(filterForm);
  render();
});

checkAll.addEventListener("change", (e) => {
  const checked = e.target.checked;
  tbody
    .querySelectorAll(".checkListItem")
    .forEach((check) => (check.checked = checked));
});

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
