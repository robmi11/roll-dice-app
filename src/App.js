import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Confetti from "react-confetti";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const allNewDice = () => {
  const diceState = [];
  for (let i = 0; i < 10; i++) {
    diceState.push(generateDice());
  }
  return diceState;
};

const generateDice = () => {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
};

const App = () => {
  const [allDicesState, setAllDicesState] = useState(allNewDice());
  const [won, setWon] = useState(false);

  useEffect(() => {
    const isHeld = allDicesState.every((dice) => dice.isHeld);
    const firstValue = allDicesState[0].value;
    const allTheSame = allDicesState.every((dice) => dice.value === firstValue);
    if (isHeld && allTheSame) {
      setWon(true);
    }
  }, [allDicesState]);

  const rollDices = () => {
    setAllDicesState((oldDice) =>
      oldDice.map((dice) => {
        return dice.isHeld ? dice : generateDice();
      })
    );
  };
  const changeIsHeld = (id) => {
    setAllDicesState((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  };

  const resetTheGame = () => {
    setWon(false);
    setAllDicesState(allNewDice());
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: 360,
          height: 379,
          backgroundColor: "#0b2434",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {won && <Confetti />}
        <Box
          sx={{
            width: 320,
            height: 320,
            backgroundColor: "#F5F5F5",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{
              margin: "8px 0 0",
              textAlign: "center",
              fontWeight: "bold",
              letterSpacing: "2px",
              textDecoration: "underline",
              opacity: won ? "1" : "0",
              textShadow: "1px 1px 2px yellow",
            }}
          >
            Gratulacje!!!!
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "26px",
              fontWeight: "700",
              marginTop: "5px",
              marginBottom: "5px",
              textAlign: "center",
            }}
          >
            Rzut kostkami
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "13px",
              padding: "0 40px",
              textAlign: "center",
            }}
          >
            Rzucaj kostkami dopóki wszystkie nie będą takie same. Aby zatrzymać
            kostkę, pomiędzy kolejnymi rzutami, kliknij ją.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                rowGap: 2,
                columnGap: 3,
                marginTop: 2,
              }}
            >
              {allDicesState.map((dice) => {
                return (
                  <Die
                    key={dice.id}
                    diceState={dice}
                    changeIsHeld={changeIsHeld}
                  />
                );
              })}
            </Box>
          </Box>
          <Box textAlign="center" mt="25px">
            <Button
              variant="contained"
              onClick={won ? resetTheGame : rollDices}
            >
              {won ? "Nowa gra" : "Rzut"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
