import React, { useState } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import GameStatus from "../Components/GameStatus";
import CartesianPlane from "../Components/CartesianPlane";

const DUMMY_LINE = {
  id: uuidv4(),
  numeradorM: 3,
  denominadorM: 1,
  b: 2,
};

const Game = () => {
  const [tries, setTries] = useState(3);
  const [value, setValues] = useState({ formNumM: 1, formDenomM: 1, formB: 1 });
  const [isCorrect, setIsCorrect] = useState(false);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <Box w="100%">
        <GameStatus
          {...DUMMY_LINE}
          tries={tries}
          setTries={setTries}
          value={value}
          setValues={setValues}
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
        />
      </Box>
      <Box w="100%">
        <CartesianPlane
          {...DUMMY_LINE}
          tries={tries}
          value={value}
          isCorrect={isCorrect}
        />
      </Box>
    </Grid>
  );
};

export default Game;
