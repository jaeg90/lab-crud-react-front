import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import playerService from "../services/players.service";

export default function CreatePlayerForm({ getPlayers, onClose }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (value) => {
    let updatedValue = value;
    if (typeof value === "object") {
      updatedValue = value.target.value;
    }

    if (updatedValue === "true") {
      updatedValue = true;
    }
    if (updatedValue === "false") {
      updatedValue = false;
    }

    setData({
      ...data,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await playerService.create(data);
      getPlayers();
      onClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ModalContent as="form" onSubmit={handleSubmit}>
      <ModalHeader>Editar player</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type="text" name={"firstName"} value={data.firstName} onChange={handleChange("firstName")} />
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Last Name</FormLabel>
          <Input type="text" name={"lastName"} value={data.lastName} onChange={handleChange("lastName")} />
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Gender</FormLabel>
          <Select
            name={"gender"}
            value={data.gender}
            placeholder="Select your gender..."
            onChange={handleChange("gender")}
          >
            <option value="MAN">Man</option>
            <option value="WOMAN">Woman</option>
          </Select>
        </FormControl>
        <FormControl mt="12px">
          <FormLabel>Country</FormLabel>
          <Input type="text" name={"country"} value={data.country} onChange={handleChange("country")} />
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel>Federated?</FormLabel>
          <RadioGroup defaultValue={true} onChange={handleChange("federated")} value={data.federated}>
            <HStack spacing="24px">
              <Radio name="federated" value={true}>
                Yes
              </Radio>
              <Radio name="federated" value={false}>
                No
              </Radio>
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
