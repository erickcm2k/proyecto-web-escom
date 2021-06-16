import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const SeeQuestion = () => {
  const [questionData, setQuestionData] = useState(null);

  // const id = useParams().id;
  const id = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    const getQuestionData = async () => {
      await axios
        .get(`http://localhost:8080/ProyectoFinal/Preguntas?id=${id}`)
        .then((res) => {
          setQuestionData(res.data[0]);
          console.log(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getQuestionData();
  }, [id]);

  return (
    <>
      {!questionData ? (
        <>
          <Text fontSize="xl" align="center" pt="6">
            No fue posible obtener los datos de la pregunta.
          </Text>
          <Text fontSize="xl" pt="4">
            Se trata de un error con el servidor.
          </Text>
        </>
      ) : (
        <Stack spacing={3}>
          <Heading>Datos de la pregunta</Heading>

          <Text fontSize="2xl">{questionData.pregunta}</Text>
          <Text>Respuestas: {questionData.respuesta}</Text>
          <Heading size="md">Drags</Heading>
          <Flex direction="row" justifyContent="space-evenly">
            {questionData.drags.map((drag) => {
              return (
                <Box key={drag.valor}>
                  <Image
                    borderRadius="full"
                    pb="2"
                    src={drag.imagen}
                    alt={drag.valor}
                  ></Image>
                  <Text align="center" key={uuidv4()}>
                    {drag.valor}
                  </Text>
                </Box>
              );
            })}
          </Flex>
          <Heading size="md">Targets</Heading>
          <Flex direction="row" justifyContent="space-evenly">
            {questionData.targets.map((target) => {
              return (
                <Box key={target.valor}>
                  <Image
                    borderRadius="full"
                    pb="2"
                    src={target.imagen}
                    alt={target.valor}
                  ></Image>
                  <Text align="center" key={uuidv4()}>
                    {target.valor}
                  </Text>
                </Box>
              );
            })}
          </Flex>
        </Stack>
      )}
      <Link to="/">
        <Button colorScheme="blue">Volver</Button>
      </Link>
    </>
  );
};

export default SeeQuestion;
