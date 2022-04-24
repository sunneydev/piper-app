import { PropsWithChildren, useEffect } from "react";
import { createContext, useState } from "react";
import { User } from "../../typings";
import { generateId } from "../utils";

type IUserContext = {
  register: (username?: string) => void;
} & User;

export const UserContext = createContext<IUserContext>({
  id: "",
  name: "",
  avatar: "",
  register: () => {},
});

export const UserProvider = <T,>(props: PropsWithChildren<T>) => {
  const user = useUserProvider();

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

const useUserProvider = () => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    avatar: "",
  });

  const register = (username?: string) => {
    const userId = generateId();

    const user: User = {
      id: userId,
      name: username || "Guest",
      avatar: `https://avatars.dicebear.com/api/miniavs/${userId}.svg`,
    };

    setUser(user);

    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    user ? setUser(JSON.parse(user)) : register();
  }, []);

  return {
    ...user,
    register,
  };
};
