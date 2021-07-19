import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Refresh from "@material-ui/icons/Refresh";
import axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Wallet = (props) => {
  const [wallet, setWallet] = useState({
    balance: undefined,
    private_key: "",
    public_key: "",
  });
  const createWallet = () => {
    let ans = true;
    if (wallet.balance !== undefined) {
      ans = window.confirm(
        'Wallet already set up! \nAre you sure you want to create new wallet?  \nYou may select "Load Wallet" instead'
      );
    }
    if (ans) {
      axios
        .post("/wallet")
        .then((response) => {
          setWallet(response.data);
        })
        .catch((error) => console.log(error));
    }
  };
  const loadWallet = () => {
    axios
      .get("/wallet")
      .then((response) => {
        setWallet(response.data);
      })
      .catch((error) => console.log(error));
  };
  const classes = useStyles();
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
          onClick={createWallet}
        >
          Create Wallet
        </Button>

        <Button
          style={{
            border: "1px solid",
            margin: "10px",
            padding: "10px",
          }}
          onClick={loadWallet}
        >
          Load Wallet
        </Button>
      </div>
      <Card className={classes.root} raised>
        <CardContent>
          <Typography className={classes.title} color="secondary" gutterBottom>
            Private Key (double tap to copy):
          </Typography>
          <Typography variant="h5" component="h2">
            {wallet.private_key}
          </Typography>
          <br />
          <Typography className={classes.title} color="secondary" gutterBottom>
            Public Key (double tap to copy):
          </Typography>
          <Typography variant="h5" component="h2">
            {wallet.public_key}
          </Typography>
          <br />
          <Typography className={classes.title} color="primary">
            Your Balance:
          </Typography>
          <Typography variant="h5" component="h2">
            {wallet.balance}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={loadWallet}>
            Refresh
            <Refresh />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Wallet;
