"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Language {
  title: string;
  value: string;
}

const languages: Language[] = [
  { title: "All Languages", value: "" },
  { title: "JavaScript", value: "JavaScript" },
  { title: "TypeScript", value: "TypeScript" },
  { title: "Python", value: "Python" },
  { title: "Java", value: "Java" },
  { title: "C++", value: "C++" },
  { title: "C#", value: "C#" },
  { title: "Go", value: "Go" },
  { title: "Rust", value: "Rust" },
  { title: "Swift", value: "Swift" },
  { title: "Kotlin", value: "Kotlin" },
  { title: "PHP", value: "PHP" },
  { title: "Ruby", value: "Ruby" },
  { title: "Lua", value: "Lua" },
  { title: "Shell", value: "Shell" },
  { title: "SQL", value: "SQL" },
  { title: "Dart", value: "Dart" },
  { title: "Objective-C", value: "Objective-C" },
  { title: "Elixir", value: "Elixir" },
  { title: "Clojure", value: "Clojure" },
  { title: "Haskell", value: "Haskell" },
];

interface Props {
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ onChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<Language[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const filteredLanguages = useMemo(() => {
    return query === ""
      ? languages
      : languages.filter((lang) =>
          lang.title.toLowerCase().includes(query.toLowerCase())
        );
  }, [query]);

  const handleSelect = (value: Language) => {
    if (value) {
      setSelectedLanguage(value);
      onChange(value.value);
      setIsOpen(false);

      const updatedSearches = [value, ...recentSearches.filter((item) => item.value !== value.value)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <Combobox value={selectedLanguage} onChange={handleSelect}>
        <div className="relative">
          <ComboboxInput
            className="w-full p-3 pr-12 border border-gray-600 bg-gray-800 text-white rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 transition-all"
            displayValue={(lang: Language) => lang.title}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onClick={() => setIsOpen(true)}
            placeholder="Search language..."
            aria-label="Search programming language"
          />
          {/* ✅ Iconos de flecha y limpiar */}
          <div className="absolute right-3 top-4 flex space-x-2 items-center">
            {query && (
              <XMarkIcon
                className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-400 transition-all"
                onClick={clearSearch}
              />
            )}
            <ChevronDownIcon
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>

        {isOpen && recentSearches.length > 0 && query === "" && (
          <div className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto p-2">
            <div className="flex justify-between items-center px-2 text-gray-400 text-sm">
              <span>Recent Searches ({recentSearches.length})</span>
              <button onClick={clearRecentSearches} className="text-red-400 hover:text-red-600 transition-all">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
            {recentSearches.map((lang) => (
              <div
                key={lang.value}
                onClick={() => handleSelect(lang)}
                className="cursor-pointer p-2 hover:bg-blue-600 hover:text-white rounded-md transition-all"
              >
                {lang.title}
              </div>
            ))}
          </div>
        )}

        {isOpen && (
          <ComboboxOptions className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredLanguages.length === 0 ? (
              <div className="p-3 text-gray-400 text-center">No results found</div>
            ) : (
              filteredLanguages.map((lang) => (
                <ComboboxOption
                  key={lang.value}
                  value={lang}
                  className={({ active }: { active: boolean }) =>
                    `cursor-pointer select-none p-3 ${
                      active ? "bg-blue-600 text-white" : "text-gray-300"
                    } transition-all`
                  }
                >
                  {lang.title}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
};

export default LanguageSelector;
