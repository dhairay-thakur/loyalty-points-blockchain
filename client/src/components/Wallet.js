import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import Refresh from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/core/styles";

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
  const createWallet = () => {};
  const loadWallet = () => {};
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
            3082025c020100028181009fb06824ef874669989e5a2d53435dec386f5579aca8bcdc0d14d612120adbc3717fb026b51799e278178755c0f22bf1abff89555b19b1f717f40782b9f60680a3625509dbdbeb16cee39a4d897fb0eb800ea2801fb4a6e382237f110d4096df9ade4a52494116f74597bb486c0b2f68316f257bfc6fb77b09778cad781609ef020301000102818006ad256d85e62df7743e0a9f22800a8939c2cddc0c6ff19571a6915ca80c742bb3af16fa474ff94b12a2493238a2e75b6f497bc069d2a532237a3c6626c83675517203f7b99ef995366ac73d04c94039890a48254711145080096cd21963483a22c262a4aef7324edfe78d2e6d2af6fd9d2b5a4a8d3d327ffaeeede2786e53a1024100c0728df85af897170b809cfd15a050c27f0f18d8afbdf6872e9e3338643cc56bd09093b0483050e8d41640fa2b65bdd7cf1d309e6edd4061d9aa4d3b834ada63024100d46c780cded057b8022c4576324251531dcabb667bb3d9b23fe840add97844ccd4b817e3415b66309e7fe1a45ceb509f51698d2a95719a1e48f16c293cd9020502400e5fc008dfca97866a1e861b45253f42f7b889f38d54d3f80edc54190f2b96d751b1aac64cee06ed0d0248822701a7675a19e50ac05f1832f6ce088cbc66b7df02402b64ed3153e323c847495bf745551edfe7da1e665526ec75e9703ca64722b68b51793a0806b5f12e4572c2599d51c4ea86eb151779e7f71ff0aec0f5bba469310241008a291da3b168bf0905b673298f142b338a4a43f5850802a396c1f9fe072e7b61c88a5319004c5cfc3dfe7f54ddcddaa0ec56ade13a9a58718feb2c3c6c341884
          </Typography>
          <br />
          <Typography className={classes.title} color="secondary" gutterBottom>
            Public Key (double tap to copy):
          </Typography>
          <Typography variant="h5" component="h2">
            30819f300d06092a864886f70d010101050003818d00308189028181009fb06824ef874669989e5a2d53435dec386f5579aca8bcdc0d14d612120adbc3717fb026b51799e278178755c0f22bf1abff89555b19b1f717f40782b9f60680a3625509dbdbeb16cee39a4d897fb0eb800ea2801fb4a6e382237f110d4096df9ade4a52494116f74597bb486c0b2f68316f257bfc6fb77b09778cad781609ef0203010001
          </Typography>
          <br />
          <Typography className={classes.title} color="primary">
            Your Balance:
          </Typography>
          <Typography variant="h5" component="h2">
            200
          </Typography>
        </CardContent>
        <CardActions>
          <Button>
            Refresh
            <Refresh />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Wallet;
