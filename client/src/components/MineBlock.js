import React from "react";
import { Button } from "@material-ui/core";
const MineBlock = (props) => {
  const mineBlock = () => {
    console.log("nhdgfajk");
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
