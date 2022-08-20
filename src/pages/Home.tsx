import { useState } from "react";
import { Button, Spacer } from "@nextui-org/react";
import Center from "../components/Center";
import { Link } from "react-router-dom";
import Search from "../components/Search";

const Home = () => {
  return (
    <Center>
      <Search />
      <Link to={"/room/new"}>
        <Button size={"lg"} color="gradient">
          Create a room
        </Button>
      </Link>
      <Spacer x={1} />
    </Center>
  );
};

export default Home;
