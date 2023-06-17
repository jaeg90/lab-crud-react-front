import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerDetail from "../components/PlayerDetail";
import playerService from "../services/players.service";

export default function PlayerDetailPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  const getPlayer = async () => {
    try {
      const res = await playerService.getOne(id);
      setPlayer(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlayer();
  }, [id]);

  return (
    <Box as="section">
      <Heading textAlign={"center"}>Player detail</Heading>
      {player ? (
        <PlayerDetail getPlayer={getPlayer} {...player} />
      ) : (
        <Center mt="32px">
          <Spinner />
        </Center>
      )}
    </Box>
  );
}
