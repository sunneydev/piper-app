import { useContext } from "react";
import { UserContext } from "./contexts/User.context";

export const useUser = () => useContext(UserContext);
