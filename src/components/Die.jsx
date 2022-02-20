import React from "react";
import Box from "@mui/material/Box";

const Die = ({ diceState, changeIsHeld }) => {
  const { value, isHeld, id } = diceState;
  return (
    <Box
      sx={{
        width: "35px",
        height: "35px",
        backgroundColor: isHeld ? "#59E391" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
        boxShadow: "1px 1px 2px #000",
        cursor: "pointer",
      }}
      onClick={() => changeIsHeld(id)}
    >
      {value}
    </Box>
  );
};

export default Die;
