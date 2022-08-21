import { Input, Modal } from "@nextui-org/react";
import { useState } from "react";
import useImoviesSearch from "../lib/hooks/useImoviesSearch";
import MovieCard from "./MovieCard";

const SearchModal: React.FC<{
  visible: boolean;
  onClose?: () => void;
}> = ({ visible, onClose }) => {
  const [searchInput, setSearchInput] = useState<string>();
  const results = useImoviesSearch(searchInput);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={onClose}
      width="55%"
      className="h-[40em]"
    >
      <Modal.Header className="flex flex-col">
        <Input
          clearable
          bordered
          color="primary"
          size="lg"
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Modal.Header>
      <Modal.Body className="scrollbar">
        <div className="grid grid-cols-4 gap-4 scrollbar">
          {results
            .filter((r) => r.poster)
            .map((res) => (
              <MovieCard key={res.id} {...res} />
            ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
