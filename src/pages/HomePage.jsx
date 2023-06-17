import { Box, Spinner, Heading, Text, Center, Modal, ModalOverlay, useDisclosure, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Player from "../components/Player";
import CreatePlayerForm from "../components/CreatePlayerForm";
import playerService from "../services/players.service";

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [players, setPlayers] = useState(null);
  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    try {
      const res = await playerService.getAll();
      setPlayers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlayer = async (id) => {
    try {
      await playerService.delete(id);
      getPlayers();
    } catch (error) {
      console.log(error);
    }
  };

  const renderPlayers = () => {
    return players.map((player) => <Player deletePlayer={deletePlayer} key={player._id} {...player} />);
  };

  console.log(players);

  return (
    <Box as="section">
      <Heading textAlign={"center"}>Golf Player App</Heading>
      {players && (
        <Center mt="32px">
          <Button onClick={onOpen}>Añadir Player</Button>
        </Center>
      )}
      <Box mt="32px">
        {!players ? (
          <Center>
            <Spinner />
          </Center>
        ) : players && players.length ? (
          <Box maxW={["90%", "500px"]} mx="auto">
            {renderPlayers()}
          </Box>
        ) : (
          <Text>No hay datos</Text>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <CreatePlayerForm onClose={onClose} getPlayers={getPlayers} />
      </Modal>
    </Box>
  );
}

export default HomePage;
