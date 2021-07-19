import React from "react";

const transfers = [
  {
    user: "30819f300d06092a864886f70d010101050003818d0030818902818100e6c58f279f0bcf040908c11f62cdd1daf46a3bb058244561e3c35704bba61e1e4d59cd951e8c70fe7643e5c0843ff81fd8bfaa368cb9a70a0010c9718c45b61a9daf1478b37b523d3ad8018d07861d33ba835763a961f169e5fd2090252132819d1dfe6ea5998db908e66aaa0bf9d0704518e67334e5dd99b076ab1e5b84fb090203010001",
    signature: "MINING",
    amount: 10,
  },
  {
    user: "30819f300d06092a864886f70d010101050003818d0030818902818100e6c58f279f0bcf040908c11f62cdd1daf46a3bb058244561e3c35704bba61e1e4d59cd951e8c70fe7643e5c0843ff81fd8bfaa368cb9a70a0010c9718c45b61a9daf1478b37b523d3ad8018d07861d33ba835763a961f169e5fd2090252132819d1dfe6ea5998db908e66aaa0bf9d0704518e67334e5dd99b076ab1e5b84fb090203010001",
    signature: "MINING",
    amount: -110,
  },
];

const OpenTransfers = (props) => {
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
