import { Box, Button, Card, CardBody, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, chakra, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { COLORS } from '../utils/constants'
import EditTodoForm from './EditTodoForm';

export default function TodoDetail({ title, description, dueDate, priority, _id, getTodo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card mt="32px" w={["90%", "500px"]} mx="auto">
        <CardBody>
          <Heading as="h2" size={"md"}>Título: {title}</Heading>
          <Text mt="8px">Descripción: {description}</Text>
          <Text mt="8px">Fecha: {dueDate}</Text>
          <Text mt="8px">Prioridad: <Box w="10px" h="10px" bgColor={COLORS[priority]} borderRadius={"50%"} /></Text>
          <Button mt="16px" onClick={onOpen}>✏️</Button>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <EditTodoForm todo={{ title, description, dueDate, priority, _id }} onClose={onClose} getTodo={getTodo} />
      </Modal>
    </>
  )
}
