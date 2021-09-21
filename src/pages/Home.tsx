import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Auth";
import Button from "../components/Button";
import { RoomData } from "../types";

const Home = () => {
  const auth = useAuth();
  const history = useHistory();

  const { name } = auth.user;

  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "4rem" }}>Hey, {name}</h1>

      <div
        style={{
          display: "grid",
          marginTop: "5rem",
          width: "40%",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "1rem",
        }}
      >
        <Button
          onClick={() => {
            axios
              .post<RoomData>("/room", {
                ownerId: auth.user.id,
              })
              .then((res) => history.push(`/room/${res.data.id}`));
          }}
        >
          Create room
        </Button>
        <Button>Join room</Button>
        <Link to="/register">
          <Button style={{ width: "100%", height: "100%" }}>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
