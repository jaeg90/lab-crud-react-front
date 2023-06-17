import {
  Button,
  Card,
  CardBody,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EditPlayerForm from "./EditPlayerForm";

export default function PlayerDetail({ firstName, lastName, gender, country, federated, _id, getPlayer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card mt="32px" w={["90%", "500px"]} mx="auto">
        <CardBody>
          <Heading as="h2" size={"md"}>
            Firs Name: {firstName}
          </Heading>
          <Text mt="8px">Gender: {gender}</Text>
          <Text mt="8px">Country: {country}</Text>
          <Button mt="16px" onClick={onOpen}>
            ✏️
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <EditPlayerForm
          player={{ firstName, lastName, gender, country, federated, _id }}
          onClose={onClose}
          getPlayer={getPlayer}
        />
      </Modal>
    </>
  );
}
