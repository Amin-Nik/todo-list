import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function SearchBar({
  setSearchParams,
  className,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}) {
  const [searchParameter, setSearchParameter] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      searchHandler();
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchParameter]);

  const searchHandler = () => {
    if (searchParameter) {
      setSearchParams(["Search", searchParameter]);
    } else setSearchParams([" All Task ", ""]);
  };

  return (
    <section className={`relative w-full max-w-sm ${className}`}>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
      <Input
        onChange={(e) => setSearchParameter(e.target.value.trim())}
        type="search"
        placeholder="Search..."
        className="pl-10 h-10"
      />
    </section>
  );
}

export default SearchBar;
