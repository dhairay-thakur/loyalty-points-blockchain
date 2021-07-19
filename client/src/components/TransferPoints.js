import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: "10px",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "100ch",
    },
  },
}));
const TransferPoints = (props) => {
  const classes = useStyles();

  const handleInput = (e) => {
    console.log(e.target.value);
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        padding: "10px",
        height: "100%",
        position: "relative",
      }}
    >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Recipient's Public Key"
          variant="outlined"
          onChange={handleInput}
        />
        <br />
        <TextField
          label="Transfer Amount"
          variant="outlined"
          onChange={handleInput}
        />
        <br />
        <Button
          style={{
            border: "1px solid",
            padding: "10px",
            margin: "10px",
            width: "40ch",
          }}
          onClick={handleInput}
        >
          Tranfer
        </Button>
      </form>
    </div>
  );
};

export default TransferPoints;
