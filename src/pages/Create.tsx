import { Loading } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Center from "../components/Center";
import { useUser } from "../lib/useUser";
import { IRoom } from "../typings";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const user = useUser();

  const handleRoomCreation = async () =>
    axios
      .post<IRoom>("/room", {
        ownerId: user.id,
      })
      .then((res) => navigate(`/room/${res.data.id}`))
      .catch((err) => setError(err.message || err.response.data.error));

  useEffect(() => {
    handleRoomCreation();
  }, []);

  return (
    <Center>
      <Loading size="xl" />
    </Center>
  );
};

export default Create;
