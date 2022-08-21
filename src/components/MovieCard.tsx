import { Card, Row, Text } from "@nextui-org/react";
import { SearchResult } from "../typings";
import React from "react";

const MovieCard: React.FC<
  SearchResult & {
    onPress?: () => void;
  }
> = ({ poster, name, year, onPress }) => (
  <Card
    onPress={onPress}
    isHoverable
    isPressable
    css={{ w: "100%", h: "290px" }}
  >
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={poster}
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
          {name} ({year})
        </Text>
      </Row>
    </Card.Footer>
  </Card>
);

export default React.memo(MovieCard);
