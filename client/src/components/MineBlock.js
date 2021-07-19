import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
const MineBlock = (props) => {
  const mineBlock = () => {
    axios
      .post("/mine")
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          border: "1px solid",
          margin: "10px",
          padding: "10px",
        }}
        onClick={mineBlock}
      >
        MINE NEW BLOCK
      </Button>
    </div>
  );
};

export default MineBlock;
