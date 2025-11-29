import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

type LP = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
};

export default function LpSearchPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const [results, setResults] = useState<LP[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }

    axios
      .get("http://localhost:8000/v1/lps", {
        params: {
          search: debounced,
          limit: 20,
          cursor: 1,
          order: "asc",
        },
      })
      .then((res) => setResults(res.data.data.data))
      .catch(() => setResults([]));
  }, [debounced]);

  const gotoDetail = (id: number) => navigate(`/lp/${id}`);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8">
      <h1 className="text-3xl font-extrabold mb-6 tracking-tight text-gray-800">
        LP 검색 🔍
      </h1>

      <input
        value={query}
        placeholder="LP 제목을 입력하세요..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-80 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => gotoDetail(item.id)}
            className="cursor-pointer bg-white shadow-lg hover:shadow-2xl transition rounded-xl overflow-hidden"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.content}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(item.createdAt).toLocaleDateString("ko-KR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!query && (
        <p className="text-gray-400 mt-10">검색어를 입력해보세요 😊</p>
      )}

      {query && results.length === 0 && (
        <p className="text-gray-400 mt-10">검색 결과가 없습니다 😢</p>
      )}
    </div>
  );
}
