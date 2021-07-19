import { AppBar, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import TabPanel from "./TabPanel";
import styles from "./styles/app.module.css";
import Blockchain from "./components/Blockchain";
import Wallet from "./components/Wallet";
import TransferPoints from "./components/TransferPoints";
import OpenTransfers from "./components/OpenTransfers";
import MineBlock from "./components/MineBlock";

const App = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabs = (e, val) => {
    console.log(val);
    setTabValue(val);
  };
  return (
    <div className={styles.body}>
      <h1>Manage your Loyalty Points Blockchain</h1>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleTabs} variant="fullWidth">
          <Tab label="My Wallet" />
          <Tab label="Transfer Points" />
          <Tab label="BlockChain" />
          <Tab label="Open Transfers" />
          <Tab label="Mine New Block" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <Wallet />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TransferPoints />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Blockchain />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <OpenTransfers />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <MineBlock />
      </TabPanel>
    </div>
  );
};

export default App;
