import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
  const [questions, setQuestions] = useState(null);

  // Solicitar las preguntas al momento de que cargue la página.
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    await axios
      .get("http://localhost:8080/ProyectoFinal/Preguntas")
      .then((res) => {
        setQuestions(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteQuestion = (id) => {
    alert(`La pregunta ${id} será eliminada.`);
    let url = `http://localhost:8080/ProyectoFinal/Delete?id=${id}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        getQuestions();
      })
      .catch((err) => {
        console.log(err);
        alert("Error, la pregunta no pudo ser eliminada.");
      });
  };

  return (
    <>
      <Text fontSize="6xl" align="center">
        Line Game
      </Text>
      <Link to="new">
        <Button colorScheme="blue">Crear nuevo nivel del juego</Button>
      </Link>
      <Link to="game">
        <Button colorScheme="green">Probar</Button>
      </Link>
      {questions ? (
        <Table variant="striped">
          <TableCaption>Lista de niveles</TableCaption>
          <Thead>
            <Tr>
              <Th>Nivel</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questions.map((e, index) => {
              return (
                <Tr key={e.id}>
                  <Td>
                    {Number(index + 1)}.- {e.pregunta}
                  </Td>
                  <Td>
                    <Link to={`see?id=${e.id}`}>
                      <Button colorScheme="green" size="md">
                        Jugar
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`modify?id=${e.id}`}>
                      <Button colorScheme="yellow" size="md">
                        Modificar
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => deleteQuestion(e.id)}
                    >
                      Borrar
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      ) : (
        <>
          <Text fontSize="xl" align="center" pt="6">
            No fue posible obtener los niveles.
          </Text>
          <Text fontSize="xl" pt="4">
            Se trata de un error con el servidor o es posible que la lista de
            niveles esté vacía.
          </Text>
        </>
      )}
    </>
  );
};

export default Home;
