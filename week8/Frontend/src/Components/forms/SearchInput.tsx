import { SearchIcon } from "../../assets/svg";
import { useState } from "react";

interface SearchInputProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
}

const SearchInput = ({ 
    placeholder = "검색어를 입력하세요", 
    onSearch,
    className = ""
}: SearchInputProps) => {
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        console.log("Input changed to:", e.target.value);

        if (onSearch) {
            onSearch(searchValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(searchValue);
        }
    };

    return (
        <div className={`relative flex items-center ${className}`}>
            <div className="relative w-full">
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full bg-zinc-900 text-white placeholder-zinc-400 rounded-lg pl-10 pr-4 py-2 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
                <div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                >
                    <SearchIcon className="h-4 w-4" />
                </div>
            </div>
        </div>
    )
}

export default SearchInput;