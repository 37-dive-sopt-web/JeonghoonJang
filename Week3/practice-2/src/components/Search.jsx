import { css } from "@emotion/react";

const searchContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const buttonStyle = css`
  width: 5rem;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const inputStyle = css`
  width: 40rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;

const Search = ({ search, handleSearchChange, handleSearch }) => {
  return (
    <div css={searchContainerStyle}>
      <input css={inputStyle} value={search} onChange={handleSearchChange} />
      <button css={buttonStyle} onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default Search;
