import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function Player({ firstName, lastName, gender, country, _id, deletePlayer }) {
  return (
    <Flex
      border={`1px solid`}
      borderRadius="24px"
      p="24px"
      mb="32px"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Text>
        {firstName} {lastName}
      </Text>
      <Flex alignItems={"center"} gap="8px">
        <Button onClick={() => deletePlayer(_id)}>🗑</Button>
        <Link to={`/players/${_id}`}>
          <Button>Ver detalles</Button>
        </Link>
      </Flex>
    </Flex>
  );
}
