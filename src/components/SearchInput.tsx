interface SearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

const SearchInput = ({ query, setQuery, onSearch }: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
