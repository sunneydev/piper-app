import React from "react";
import { Dropdown } from "@nextui-org/react";
import { Episode } from "../typings";

const EpisodeDropdown: React.FC<{
  onSelect: (episode: Episode) => void;
  episodes: Episode[];
}> = ({ onSelect, episodes }) => (
  <Dropdown>
    <Dropdown.Button>Episodes</Dropdown.Button>
    <Dropdown.Menu
      className="w-fit"
      disallowEmptySelection
      selectionMode="single"
      onSelectionChange={(keys) =>
        onSelect(episodes[Number([...keys][0]) || 0])
      }
    >
      {episodes.map((season) => (
        <Dropdown.Item key={season.episode}>{season.name}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default React.memo(EpisodeDropdown);
