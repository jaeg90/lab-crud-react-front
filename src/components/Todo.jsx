import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { COLORS } from '../utils/constants'
import { Link } from 'react-router-dom'

export default function Todo({ title, description, dueDate, priority, _id, deleteTodo }) {
  return (
    <Flex
      border={`1px solid ${COLORS[priority]}`}
      borderRadius="24px"
      p="24px"
      mb="32px"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Text>{title}</Text>
      <Flex alignItems={"center"} gap="8px">
        <Button onClick={() => deleteTodo(_id)}>🗑</Button>
        <Link to={`/todos/${_id}`}>
          <Button>Ver detalles</Button>
        </Link>
      </Flex>
    </Flex>
  )
}
