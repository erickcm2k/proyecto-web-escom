import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
const QuestionForm = () => {
  const id = new URLSearchParams(window.location.search).get("id");

  const [formData, setFormData] = useState({
    numeradorM: 1,
    denominadorM: 1,
    b: 1,
  });

  const { numeradorM, denominadorM, b } = formData;

  const submitForm = (e) => {
    console.log(formData);
    e.preventDefault();
    let url = "";
    const formFields = `numeradorM=${numeradorM}&&denominadorM=${denominadorM}&&b=${b}`;

    // Si hay un id en el url, irá a la ruta Update
    // sino, se trata de una nueva pregunta e ira a la ruta Create.
    !id
      ? (url = `http://localhost:8080/01proyectoFinal3CM15-emo/Create?${formFields}`)
      : (url = `http://localhost:8080/01proyectoFinal3CM15-emo/Update?${formFields}&id=${id}`);

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        alert(
          !id
            ? "El nivel ha sido creada exitosamente."
            : "El nivel ha sido modificada exitosamente."
        );
        alert("Presione el botón Volver.");
      })
      .catch((err) => {
        console.log(err);
        alert(
          !id ? "El nivel no se pudo crear." : "El nivel no se pudo modificar."
        );
      });
  };

  return (
    <Stack spacing="3">
      <Heading size="xl">Ingrese los datos del nivel</Heading>
      <Text fontSize="xl">Es necesario llenar todos los campos.</Text>
      <form onSubmit={submitForm} encType="multipart/form-data">
        <Text fontWeight="bold" fontSize="xl">
          Ingrese los datos de Y = mx + b
        </Text>
        <Stack spacing={3}>
          <FormLabel>Numerador de m</FormLabel>
          <NumberInput
            isRequired={true}
            onChange={(val) => {
              setFormData({
                ...formData,
                numeradorM: val,
              });
            }}
            defaultValue={numeradorM}
            min={-10}
            max={10}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />

              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel>Denominador de m</FormLabel>
          <NumberInput
            isRequired={true}
            onChange={(val) => {
              setFormData({
                ...formData,
                denominadorM: val,
              });
            }}
            defaultValue={denominadorM}
            min={-10}
            max={10}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel>Valor de b</FormLabel>
          <NumberInput
            isRequired={true}
            onChange={(val) => {
              setFormData({
                ...formData,
                b: val,
              });
            }}
            defaultValue={b}
            min={-10}
            max={10}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Stack>
        <Button m="4" colorScheme="teal" type="submit">
          Subir cambios
        </Button>
      </form>
      <Link to="/">
        <Button m="4" colorScheme="blue" type="submit">
          Volver
        </Button>
      </Link>
    </Stack>
  );
};

export default QuestionForm;
