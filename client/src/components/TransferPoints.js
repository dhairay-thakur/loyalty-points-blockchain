import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: "10px",
    textAlign: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "60%",
    },
  },
}));
const TransferPoints = (props) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const classes = useStyles();

  const handleRecipientInput = (e) => {
    setRecipient(e.target.value);
  };

  const handleAmountInput = (e) => {
    setAmount(parseInt(e.target.value, 10));
  };

  const onSubmitTransfer = () => {
    axios
      .post("/points/transfer", {
        recipient,
        amount,
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => alert(error));
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
          onChange={handleRecipientInput}
        />
        <br />
        <TextField
          label="Transfer Amount"
          variant="outlined"
          onChange={handleAmountInput}
        />
        <br />
        <Button
          style={{
            border: "1px solid",
            padding: "10px",
            margin: "10px",
            width: "30%",
          }}
          onClick={onSubmitTransfer}
        >
          Tranfer
        </Button>
      </form>
    </div>
  );
};

export default TransferPoints;
