import { Card, Row, Text } from "@nextui-org/react";
import { SearchResult } from "../typings";

const MovieCard: React.FC<SearchResult> = (props) => (
  <Card isHoverable isPressable css={{ w: "100%", h: "290px" }}>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={props.poster}
        width="100%"
        height="100%"
        objectFit="cover"
        alt="poster"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#0f111466",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row align="center">
        <Text className="truncate max-w-6" size={16} weight="semibold">
          {props.name} ({props.year})
        </Text>
      </Row>
    </Card.Footer>
  </Card>
);

export default MovieCard;
