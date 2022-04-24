import { Input, Spacer, Button, StyledButtonGroup } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../lib/useUser";
import { IRoom } from "../typings";

const Create = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleRoomCreation = async () =>
    axios
      .post<IRoom>("/room", {
        ownerId: user.id,
        name: roomName,
      })
      .then((res) => navigate(`/room/${res.data.id}`))
      .catch((err) => console.error(err));

  const [roomName, setRoomName] = useState("");

  return (
    <div>
      <Input
        placeholder="Room name"
        size="xl"
        onChange={(e) => setRoomName(e.currentTarget.value)}
      />
      <Spacer x={1} />
      <div className="flex justify-between">
        <Link to={"/"}>
          <Button auto color={"error"}>
            Cancel
          </Button>
        </Link>
        <Button auto onClick={handleRoomCreation} disabled={!roomName}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default Create;
