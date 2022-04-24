import { useState } from "react";
import { Button, Spacer } from "@nextui-org/react";
import Center from "../components/Center";
import { Link } from "react-router-dom";

const Home = () => {
  const [create, setCreate] = useState(true);
  const [roomName, setRoomName] = useState("");

  return (
    <Center>
      <div>
        <Link to={"/room/new"}>
          <Button size={"xl"} color="gradient">
            Create a room
          </Button>
        </Link>
        <Spacer x={1} />
        <Link to={"/room/join"}>
          <Button size={"xl"} color="gradient">
            Join a room
          </Button>
        </Link>
      </div>
    </Center>
  );
};

export default Home;
