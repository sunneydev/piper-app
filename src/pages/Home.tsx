import { Button, Spacer } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Center from "../components/Center";

const Home = () => {
  return (
    <Center>
      <Link to={"/room/new"}>
        <Button size={"lg"} color="gradient">
          Create a room
        </Button>
      </Link>
    </Center>
  );
};

export default Home;
