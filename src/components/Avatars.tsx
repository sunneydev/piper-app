import { Avatar } from "@nextui-org/react";
import { User } from "../typings";

const Avatars: React.FC<{
  users: User[];
}> = ({ users }) => (
  <Avatar.Group>
    {users.map((user) => (
      <Avatar
        key={user.id}
        src={user.avatar}
        size="lg"
        color={"gradient"}
        bordered
      />
    ))}
  </Avatar.Group>
);

export default Avatars;
