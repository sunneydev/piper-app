import { useNavigate } from "react-router-dom";
import { useUser } from "../lib/useUser";
import { Button } from "@nextui-org/react";
import Center from "../components/Center";
import axios from "axios";
import { IRoom } from "../typings";

const Home = () => {
  const user = useUser();
  const navigate = useNavigate();

  const handleRoomCreation = async () =>
    axios
      .post<IRoom>("/room", {
        ownerId: user.id,
      })
      .then((res) => navigate(`/room/${res.data.id}`))
      .catch((err) => console.error(err));

  return (
    <div className="h-screen">
      <Center>
        <div className="flex gap-4">
          <Button>Create a room</Button>
          <Button onClick={handleRoomCreation}>Join a room</Button>
        </div>
      </Center>
    </div>
  );
};

export default Home;
