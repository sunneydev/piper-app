import { Outlet } from "react-router-dom";
import Center from "./Center";

const CenterLayout = () => (
  <Center>
    <Outlet />
  </Center>
);

export default CenterLayout;
