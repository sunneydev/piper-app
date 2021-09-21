import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { User } from "./types";
import { generateId } from "./utils";

const AuthContext = createContext<{
  user: User;
  signup: (username?: string) => void;
}>({
  user: {
    id: "",
    name: "",
    avatar: "",
  },
  signup: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const ProvideAuth = (props: { children?: ReactNode }) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

const useProvideAuth = () => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "Guest",
    avatar: ``,
  });

  const signup = (username?: string) => {
    const randomId = generateId();
    const user: User = {
      id: randomId,
      name: username || "Guest",
      avatar: `https://avatars.dicebear.com/api/avataaars/${
        username || randomId
      }.svg`,
    };

    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUser(userData);
    } else {
      signup();
    }
  }, []);

  return {
    user,
    signup,
  };
};
