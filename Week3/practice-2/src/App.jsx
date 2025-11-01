import Card from "./components/Card";
import Header from "./components/Header";
import Search from "./components/Search";
import useSearch from "./hooks/useSearch";

import { members } from "./constants/member";

function App() {
  const { search, filteredMembers, handleSearchChange, handleSearch } =
    useSearch(members);

  return (
    <>
      <Header />

      <Search
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredMembers.map(({ id, name, github, englishName }) => (
          <Card
            key={id}
            name={name}
            github={github}
            englishName={englishName}
          />
        ))}
      </div>
    </>
  );
}

export default App;
