import React, { useState, useEffect } from "react";
import { Text, Box, Stack, Button } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const GameStatus = ({
  numeradorM,
  denominadorM,
  b,
  tries,
  setTries,
  value,
  setValues,
  isCorrect,
  setIsCorrect,
}) => {
  const toast = useToast();
  // const [tries, setTries] = useState(3);

  const check = () => {
    const formNumM = parseInt(value.formNumM);
    const formDenomM = parseInt(value.formDenomM);
    const formB = parseInt(value.formB);

    setIsCorrect(
      formNumM === numeradorM && formDenomM === denominadorM && formB === b
    );

    setTries(tries - 1);
  };

  if (isCorrect) {
    toast({
      title: "Has acertado",
      description: "Felicidades",
      status: "success",
      duration: 4000,
      isClosable: false,
    });
  }

  useEffect(() => {
    if (tries !== 3 && !isCorrect) {
      toast({
        title: "Incorrecto",
        description: "La recta ingresada no es la correcta.",
        status: "warning",
        duration: 4000,
        isClosable: false,
      });
    }
  }, [tries]);

  return (
    <>
      <Stack spacing="5">
        <Text fontSize="4xl" fontWeight="bold" textAlign="center">
          Adivina la función
        </Text>
        <Text
          fontSize="2xl"
          color={tries === 0 && !isCorrect ? "red" : "black"}
        >{`Intentos restantes: ${tries}`}</Text>
        <Stack backgroundColor="blue.100" borderRadius="1rem" padding="1rem">
          <Text fontWeight="bold">Tu función</Text>
          <Text>{`Y = (${value.formNumM}/${value.formDenomM})x + ${value.formB}`}</Text>
          <NumberInput
            defaultValue={value.formNumM}
            onChange={(val) => {
              setValues({
                ...value,
                formNumM: val,
              });
            }}
            min={-10}
            max={10}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput
            defaultValue={value.formDenomM}
            onChange={(val) => {
              setValues({
                ...value,
                formDenomM: val,
              });
            }}
            min={-10}
            max={10}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput
            defaultValue={value.formB}
            onChange={(val) => {
              setValues({
                ...value,
                formB: val,
              });
            }}
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

        {tries === 0 && !isCorrect && (
          <>
            <Stack backgroundColor="green.100" borderRadius="1rem" padding="1rem">
              <Text fontWeight="bold">Esta es la función correcta</Text>
              <Text>{`Y = (${numeradorM}/${denominadorM})x + ${b}`}</Text>
            </Stack>
            <Stack
              backgroundColor="orange.100"
              borderRadius="1rem"
              padding="1rem"
            >
              <Text fontWeight="bold">Tu función</Text>
              <Text>{`Y = (${value.formNumM}/${value.formDenomM})x + ${value.formB}`}</Text>
            </Stack>
          </>
        )}

        {isCorrect && (
          <Box backgroundColor="green.100" borderRadius="1rem" padding="1rem">
            <Text fontWeight="bold">¡Has acertado!</Text>
          </Box>
        )}

        {(tries === 0 && !isCorrect) || isCorrect ? (
          <Button onClick={() => location.reload()}>Reiniciar</Button>
        ) : null}

        <Button
          disabled={(tries === 0 && !isCorrect) || isCorrect}
          backgroundColor="blue.200"
          onClick={check}
        >
          Checar
        </Button>
      </Stack>
    </>
  );
};

export default GameStatus;
