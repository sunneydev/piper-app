import React from "react";
import { Dropdown } from "@nextui-org/react";
import { Season } from "../typings";

const SeasonDropdown: React.FC<{
  onSelect: (season: number) => void;
  seasons: Season[];
}> = ({ onSelect, seasons }) => (
  <Dropdown>
    <Dropdown.Button>Seasons</Dropdown.Button>
    <Dropdown.Menu
      className="w-fit"
      disallowEmptySelection
      selectionMode="single"
      onSelectionChange={(keys) => onSelect(Number([...keys][0]) || 0)}
    >
      {seasons.map((season) => (
        <Dropdown.Item key={season.season}>
          Season {season.season}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default React.memo(SeasonDropdown);
