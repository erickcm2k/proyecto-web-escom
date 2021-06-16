import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
const QuestionForm = () => {
  const id = new URLSearchParams(window.location.search).get("id");

  const initialValues = {
    question: "",
    questionName: "",
    answer: "",
    drag1: "",
    drag2: "",
    drag3: "",
    drag4: "",
    target1: "",
    target2: "",
    target3: "",
    target4: "",
  };

  const [formData, setFormData] = useReducer(
    (currentValues, newValues) => ({ ...currentValues, ...newValues }),
    initialValues
  );

  const {
    question,
    questionName,
    answer,
    drag1,
    drag2,
    drag3,
    drag4,
    target1,
    target2,
    target3,
    target4,
  } = formData;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    let url = "";
    const formFields = `question=${question}&questionName=${questionName}&answer=${answer}&drag1=${drag1}&drag2=${drag2}&drag3=${drag3}&drag4=${drag4}&target1=${target1}&target2=${target2}&target3=${target3}&target4=${target4}`;

    // Si hay un id en el url, irá a la ruta Update
    // sino, se trata de una nueva pregunta e ira a la ruta Create.
    !id
      ? (url = `http://localhost:8080/ProyectoFinal/Create?${formFields}`)
      : (url = `http://localhost:8080/ProyectoFinal/Update?${formFields}&id=${id}`);

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        alert(
          !id
            ? "La pregunta ha sido creada exitosamente."
            : "La pregunta ha sido modificada exitosamente."
        );
        alert("Presione el botón Volver.");
      })
      .catch((err) => {
        console.log(err);
        alert(
          !id
            ? "La pregunta no se pudo crear."
            : "La pregunta no se pudo modificar."
        );
      });
  };

  return (
    <Stack spacing="3">
      <Heading size="xl">Ingrese los datos de la pregunta</Heading>
      <Text fontSize="xl">Es necesario llenar todos los campos.</Text>
      <form onSubmit={submitForm} encType="multipart/form-data">
        <FormControl paddingTop="4">
          <FormLabel>Nombre de la pregunta</FormLabel>
          <Input
            type="text"
            name="questionName"
            value={questionName}
            onChange={handleFormChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Pregunta</FormLabel>
          <Input
            type="text"
            name="question"
            value={question}
            onChange={handleFormChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Respuesta</FormLabel>
          <Input
            type="text"
            name="answer"
            value={answer}
            onChange={handleFormChange}
          />
        </FormControl>
        <Flex direction="row" paddingTop="5">
          <FormControl>
            <Stack spacing="3">
              <Heading size="lg" paddingBottom="4">
                Drags
              </Heading>
              <Input
                placeholder="Drag 1"
                type="text"
                name="drag1"
                value={drag1}
                onChange={handleFormChange}
                required
              ></Input>
              <Input
                placeholder="Drag 2"
                type="text"
                name="drag2"
                value={drag2}
                onChange={handleFormChange}
                required
              ></Input>
              <Input
                placeholder="Drag 3"
                type="text"
                name="drag3"
                value={drag3}
                onChange={handleFormChange}
                required
              ></Input>
              <Input
                placeholder="Drag 4"
                type="text"
                name="drag4"
                value={drag4}
                onChange={handleFormChange}
                required
              ></Input>
            </Stack>
          </FormControl>
          <FormControl>
            <Stack spacing="3">
              <Heading size="lg" paddingBottom="4">
                Targets
              </Heading>
              <Input
                placeholder="Target 1"
                type="text"
                name="target1"
                value={target1}
                onChange={handleFormChange}
                required
              ></Input>
              <Input
                placeholder="Target 2"
                type="text"
                name="target2"
                value={target2}
                onChange={handleFormChange}
                required
              ></Input>
              <Input
                placeholder="Target 3"
                type="text"
                name="target3"
                value={target3}
                onChange={handleFormChange}
                required
              ></Input>
              <Input
                placeholder="Target 4"
                type="text"
                name="target4"
                value={target4}
                onChange={handleFormChange}
                required
              ></Input>
            </Stack>
          </FormControl>
        </Flex>
        <Link to="/">
          <Button m="4" colorScheme="blue" type="submit">
            Volver
          </Button>
        </Link>
        <Button m="4" colorScheme="teal" type="submit">
          Subir cambios
        </Button>
      </form>
    </Stack>
  );
};

export default QuestionForm;
