import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    margin: "0 auto",
    padding: "10px",
    position: "relative",
    width: "80%",
    overflow: "hidden",
  },
  header: { marginBottom: 10 },
  title: {
    backgroundColor: "cyan",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Blockchain = () => {
  const classes = useStyles();
  const [blockData, setBlockData] = useState([]);
  useEffect(() => {
    axios
      .get("/chain")
      .then((response) => {
        console.log(response);
        setBlockData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className={classes.root}>
      {blockData.map((data) => (
        <Accordion className={classes.header}>
          <AccordionSummary
            className={classes.title}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Block #{data.index}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <Typography>
                <b>Creation Date/Time </b>:
                {new Date(data.timestamp).toLocaleString()}
                <br />
                <b>Previous Hash </b>: {data.previous_hash}
                <br />
                <b>Transfers</b>:
                <br />
                {data.transfers.map((t) => (
                  <div
                    style={{
                      backgroundColor: t.amount > 0 ? "#70e000" : "#f52900",
                      padding: 8,
                      marginBottom: 10,
                    }}
                  >
                    User: {t.user}
                    <br />
                    Amount = <b>{t.amount}</b>
                  </div>
                ))}
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Blockchain;
