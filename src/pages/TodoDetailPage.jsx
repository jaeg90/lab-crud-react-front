import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TodoDetail from "../components/TodoDetail";
import todoService from "../services/todo.service";

export default function TodoDetailPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  const getTodo = async () => {
    try {
      // const res = await axios.get(`${import.meta.env.VITE_API_URL}/todos/${id}`);
      const res = await todoService.getOne(id);
      setTodo(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodo();
  }, [id])

  return (
    <Box as="section">
      <Heading textAlign={"center"}>Todo detail</Heading>
      {
        todo ? <TodoDetail getTodo={getTodo} {...todo} /> : 
        <Center mt="32px">
          <Spinner />
        </Center>
      }
    </Box>
  )
}
