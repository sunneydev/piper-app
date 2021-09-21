import { Link } from "react-router-dom";
import { useAuth } from "../Auth";
import Checkmark from "../img/checkmark.svg";
import Center from "../components/Center";

const Register = () => {
  let username: string;
  const auth = useAuth();

  return (
    <div
      style={{
        fontSize: "1.5em",
        display: "flex",
      }}
    >
      <Center
        style={{ width: "80%", display: "flex", justifyContent: "center" }}
      >
        <input
          onChange={(e) => (username = e.target.value)}
          type="text"
          placeholder="Username"
          style={{
            borderRadius: "50px",
            fontSize: "1em",
            padding: "15px",
            paddingLeft: "30px",
            outline: "none",
            border: "none",
          }}
        />
        <Link to="/">
          <button
            onClick={() => auth.signup(username)}
            style={{
              marginLeft: "25px",
              borderRadius: "50px",
              width: "9em",
              height: "7em",
              border: "none",
              backgroundColor: "#41F900",
              cursor: "pointer",
            }}
          >
            <img src={Checkmark} alt="Checkmark" />
          </button>
        </Link>
      </Center>
    </div>
  );
};

export default Register;
