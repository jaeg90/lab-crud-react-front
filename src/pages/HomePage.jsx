import { Box, Spinner, Heading, Text, Center, Modal, ModalOverlay, useDisclosure, Button } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Todo from '../components/Todo';
import CreateTodoForm from '../components/CreateTodoForm';
import todoService from '../services/todo.service';

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    try {
      // const res = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
      const res = await todoService.getAll();
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      // await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
      await todoService.delete(id);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }

  const renderTodos = () => {
    return (
      todos.map((todo) => <Todo deleteTodo={deleteTodo} key={todo._id} {...todo} />)
    )
  }

  return (
    <Box as="section">
      <Heading textAlign={"center"}>Todo App</Heading>
      {todos && <Center mt="32px">
        <Button onClick={onOpen}>Añadir todo</Button>
      </Center>}
      <Box mt="32px">
        {
          !todos ?
            <Center>
              <Spinner />
            </Center> :
            todos && todos.length ?
              <Box
                maxW={["90%", "500px"]}
                mx="auto"
              >
                {renderTodos()}
              </Box> :
              <Text>No hay todos</Text>
        }
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <CreateTodoForm onClose={onClose} getTodos={getTodos} />
      </Modal>
    </Box>
  )
}

export default HomePage;