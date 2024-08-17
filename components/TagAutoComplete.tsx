import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function App() {
  const animals = ["action", "adventure", "sport"];

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete label="Select an animal" className="max-w-xs" multiple>
        {animals.map((animal) => (
          <AutocompleteItem key={animal} value={animal}>
            {animal}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
