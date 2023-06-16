import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

import todoService from "../services/todo.service";

export default function EditTodoForm({ todo: { title, description, dueDate, priority, _id }, onClose, getPlayers }) {
  const [data, setData] = useState({
    title,
    description,
    dueDate,
    priority,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await todoService.edit(_id, data);
      getPlayers();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalContent as="form" onSubmit={handleSubmit}>
      <ModalHeader>Editar todo</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type="text" name={"firstName"} value={data.firstName} onChange={handleChange} />
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Last Name</FormLabel>
          <Input type="text" name={"lastName"} value={data.lastName} onChange={handleChange} />
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Gender</FormLabel>
          <Select name="gender" value={data.gender} placeholder="Select your gender..." onChange={handleChange}>
            <option value="MAN">Man</option>
            <option value="WOMAN">Woman</option>
          </Select>
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Country</FormLabel>
          <Input type="text" name={"country"} value={data.country} onChange={handleChange} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel>Federated?</FormLabel>
          <RadioGroup defaultValue="true" name="federated" value={data.federated} onChange={handleChange}>
            <HStack spacing="24px">
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant="ghost" type="submit" isLoading={loading}>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
