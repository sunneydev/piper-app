import { Card, Loading } from "@nextui-org/react";
import axios from "axios";
import Center from "../components/Center";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../lib/useUser";
import { IRoom } from "../typings";

const Create = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const user = useUser();

  const handleRoomCreation = async () =>
    user.id &&
    axios
      .post<IRoom>("/room", {
        ownerId: user.id,
      })
      .then((res) => navigate(`/room/${res.data.id}`))
      .catch((err) => setError(err.message || err.response.data.error));

  useEffect(() => {
    handleRoomCreation();
  }, [user.id]);

  if (error)
    return (
      <Center>
        <Card className="p-4">{error}</Card>
      </Center>
    );

  return (
    <Center>
      <Loading size="xl" />
    </Center>
  );
};

export default Create;
