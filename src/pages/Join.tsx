import { Button, Input, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Join = () => {
  const [roomId, setroomId] = useState("");
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div>
      <Input
        placeholder="Room ID"
        size="xl"
        onChange={(e) => setroomId(e.currentTarget.value)}
      />
      <Spacer x={1} />
      <div className="flex justify-between">
        <Link to={"/"}>
          <Button auto color={"error"}>
            Cancel
          </Button>
        </Link>
        <Button auto disabled={!roomId} onClick={handleNavigation}>
          Join
        </Button>
      </div>
    </div>
  );
};

export default Join;
