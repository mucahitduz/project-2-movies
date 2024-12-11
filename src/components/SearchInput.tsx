interface SearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ query, setQuery }: SearchInputProps) => {
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
