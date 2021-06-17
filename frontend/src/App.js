import * as React from "react";

// 1. import `ChakraProvider` component
import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Home/Pages/Home";
import SeeQuestion from "./Home/Pages/SeeQuestion";
import QuestionForm from "./Home/Pages/QuestionForm";
import Game from "./Game/Pages/Game";
function App() {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>
      <Box width="70vw" margin="0 auto" paddingTop="10">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/see">
              <SeeQuestion />
            </Route>

            <Route exact path="/new">
              <QuestionForm />
            </Route>

            <Route exact path="/modify">
              <QuestionForm />
            </Route>

            <Route exact path="/game">
              <Game />
            </Route>

            <Redirect to="/" />
          </Switch>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
