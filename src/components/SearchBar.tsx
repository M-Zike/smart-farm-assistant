import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="mx-5 mb-4 flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search crops, tasks, insights..."
          value={query}
          onChange={handleChange}
          className="w-full h-10 pl-10 pr-4 rounded-xl glass-card border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <button className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-primary/10 transition-colors">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
};

export default SearchBar;
