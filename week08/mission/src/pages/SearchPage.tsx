import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return;
    }
    console.log("Debounce", debouncedQuery);
    //axios.get("http://localhost:8000/v1/lps/" + debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      placeholder="검색어 입력하세요"
      onChange={(e) => setQuery(e.target.value)}
      className="mx-5 mt-5 w-72 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default SearchPage;
