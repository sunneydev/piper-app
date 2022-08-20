import { Button, Modal, Text, Input, Row } from "@nextui-org/react";
import { useCallback, useState } from "react";
import Center from "../components/Center";
import IMovies from "../components/iMovies";
import Search from "../components/Search";

const Home = () => {
  const [visible, setVisible] = useState(true);

  const closeHandler = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Center>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header className="flex flex-col">
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Search"
          />
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* <Link to={"/room/new"}>
        <Button size={"lg"} color="gradient">
          Create a room
        </Button>
      </Link>
      <Spacer x={1} /> */}
    </Center>
  );
};

export default Home;
