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
  const [levels, setLevels] = useState(null);

  // Solicitar las preguntas al momento de que cargue la página.
  useEffect(() => {
    getlevels();
  }, []);

  const getlevels = async () => {
    await axios
      .get("http://localhost:8080/01proyectoFinal3CM15-emo/Ejercicios")
      .then((res) => {
        setLevels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteQuestion = (id) => {
    alert(`La pregunta ${id} será eliminada.`);
    let url = `http://localhost:8080/01proyectoFinal3CM15-emo/Delete?id=${id}`;
    axios
      .get(url)
      .then(() => {
        getlevels();
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

      {levels ? (
        <Table variant="striped">
          <TableCaption>Lista de niveles</TableCaption>
          <Thead>
            <Tr>
              <Th>Nivel</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {levels.map((e, index) => {
              return (
                <Tr key={e.id}>
                  <Td>{`${Number(index + 1)})`}</Td>
                  <Td>
                    <Link to={`see?id=${e.id}`}>
                      <Button colorScheme="green" size="md">
                        Ver
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
                    <Link to={`game?id=${e.id}`}>
                      <Button colorScheme="blue" size="md">
                        Probar nivel
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
