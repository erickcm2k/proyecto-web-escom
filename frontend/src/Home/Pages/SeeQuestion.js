import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Stack, Text } from "@chakra-ui/layout";
import { Button, Box } from "@chakra-ui/react";

const SeeQuestion = () => {
  const [levelData, setLevelData] = useState(null);

  const id = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    getCurrentLevel();
  }, []);

  const getCurrentLevel = async () => {
    await axios
      .get(`http://localhost:8080/01proyectoFinal3CM15-emo/Ejercicios?id=${id}`)
      .then((res) => {
        setLevelData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {!levelData ? (
        <>
          <Text fontSize="xl" align="center" pt="6">
            No fue posible obtener los datos de la pregunta.
          </Text>
          <Text fontSize="xl" pt="4">
            Se trata de un error con el servidor.
          </Text>
        </>
      ) : (
        <>
          <Text fontWeight="bold" fontSize="3xl">
            Ecuación de la forma Y = mx + b
          </Text>
          <Stack spacing={3}>
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Numerador de m
              </Text>
              <Text>{levelData.numeradorM}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Denominador de m
              </Text>
              <Text>{levelData.denominadorM}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Valor de b
              </Text>
              <Text>{levelData.b}</Text>
            </Box>
            <Box
              backgroundColor="blue.100"
              padding={"1rem"}
              borderRadius={"1rem"}
            >
              <Text fontWeight="bold" fontSize="xl">
                Ecuación
              </Text>
              <Text fontSize="xl">{`Y = (${levelData.numeradorM}/${levelData.denominadorM})x + ${levelData.b}`}</Text>
            </Box>
          </Stack>
        </>
      )}
      <Box pt="5">
        <Link to="/">
          <Button colorScheme="blue">Volver</Button>
        </Link>
      </Box>
    </>
  );
};

export default SeeQuestion;
