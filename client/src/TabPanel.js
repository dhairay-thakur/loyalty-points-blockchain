import React from "react";

const TabPanel = ({ children, value, index }) => {
  return <div>{value === index && <div>{children}</div>}</div>;
};

export default TabPanel;
