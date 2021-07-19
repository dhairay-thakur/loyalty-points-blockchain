import React, { useEffect, useState } from "react";
import axios from "axios";

const OpenTransfers = (props) => {
  const [transfers, setTransfers] = useState([]);
  useEffect(() => {
    axios
      .get("/points/open")
      .then((response) => {
        setTransfers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div
      style={{
        overflow: "hidden",
        height: "100%",
        margin: "0 auto",
        paddingTop: "10px",
        position: "relative",
        width: "80%",
      }}
    >
      {transfers.map((t) => (
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
    </div>
  );
};

export default OpenTransfers;
