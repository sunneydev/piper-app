import Box from "../components/Box";
import "../styles/borealis.min.css";
import panelArrowRight from "../assets/icons/panel-arrow-right.svg";
import add from "../assets/icons/add.svg";
import axios from "axios";
import { RoomData } from "../types";
import { useHistory } from "react-router";
import { useAuth } from "../Auth";

const _Home = () => {
  const history = useHistory();
  const auth = useAuth();

  return (
    <div>
      <div className="content is-center">
        <div className="home">
          <h1 className="title">Welcome Home</h1>
          <p className="subtitle">
            It's never been easier to join or start a room with your friends.
            <br />
            Select an option below to get started:
          </p>
          <div className="options">
            <Box
              icon={panelArrowRight}
              header={"Join a Room"}
              description={
                "Received an invite link or an invite code for a room? Enter it here!"
              }
            />
            <Box
              icon={add}
              header="Create a Room"
              description={
                "Need a room where you can watch anything with your friends? This is the place to go"
              }
              onClick={() => {
                axios
                  .post<RoomData>("/room", {
                    ownerId: auth.user.id,
                  })
                  .then((res) => history.push(`/room/${res.data.id}`));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default _Home;
