import { Input, Modal } from "@nextui-org/react";
import { useState } from "react";
import useImovies from "../lib/hooks/useImovies";
import MovieCard from "./MovieCard";

const SearchModal: React.FC<{
  visible: boolean;
  onClose?: () => void;
}> = ({ visible, onClose }) => {
  const [searchInput, setSearchInput] = useState<string>();
  const results = useImovies(searchInput);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={onClose}
      width={"fit-content"}
    >
      <Modal.Header className="flex flex-col">
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-4 gap-4">
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
