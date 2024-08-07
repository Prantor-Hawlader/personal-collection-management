// components/TagAutocomplete.tsx

import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

interface TagAutocompleteProps {
  suggestions: string[];
  value: string;
  onChange: (value: string) => void;
  onSelect: (tag: string) => void;
}

const TagAutocomplete: React.FC<TagAutocompleteProps> = ({
  suggestions,
  value,
  onChange,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (value: string) => {
    setInputValue(value);
    onChange(value);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setInputValue("");
  };

  return (
    <Autocomplete
      className="max-w-xs"
      label="Select a tag"
      value={inputValue}
      onValueChange={handleChange}
    >
      {suggestions.map((suggestion) => (
        <AutocompleteItem
          key={suggestion}
          value={suggestion}
          onClick={() => handleSelect(suggestion)}
        >
          {suggestion}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default TagAutocomplete;
