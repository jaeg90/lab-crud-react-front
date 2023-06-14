import { Button, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Select, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { formatDateForInput } from "../utils/functions";
import axios from "axios";
import todoService from "../services/todo.service";

export default function EditTodoForm({ todo: { title, description, dueDate, priority, _id }, onClose, getTodo }) {
  const [data, setData] = useState({
    title,
    description,
    dueDate,
    priority
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.put(`${import.meta.env.VITE_API_URL}/todos/${_id}`, data);
      await todoService.edit(_id, data);
      getTodo();
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ModalContent as="form" onSubmit={handleSubmit}>
      <ModalHeader>Editar todo</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormLabel>Título</FormLabel>
          <Input type='text' name={"title"} value={data.title} onChange={handleChange} />
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Descripción</FormLabel>
          <Textarea multiple type='text' name={"description"} value={data.description} onChange={handleChange} />
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Fecha de entrega</FormLabel>
          <Input type='date' name={"dueDate"} value={formatDateForInput(new Date(data.dueDate))} onChange={handleChange} />
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Prioridad</FormLabel>
          <Select name="priority" value={data.priority} placeholder='Selecciona la prioridad..' onChange={handleChange}>
            <option value='LOW'>Baja</option>
            <option value='MEDIUM'>Media</option>
            <option value='HIGH'>Alta</option>
          </Select>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Cerrar
        </Button>
        <Button variant='ghost' type='submit'>Guardar</Button>
      </ModalFooter>
    </ModalContent>
  )
}
