import React, { useState, useEffect } from "react";

import Header from "./Header";
import Contestants from "./Contestants";
import Footer from "./Footer";

import { getEthBalance } from "./api";
import { ETH_DIVIDER } from "./constants";

import "./App.css";

function App() {
  const [pEth, setPEth] = useState(0);
  const [hEth, setHEth] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const formatAmount = (val) => parseFloat((val / ETH_DIVIDER).toFixed(3));
    const buildProportions = (a, b) => {
      const aPerc = (a * 100) / (a + b);
      return [aPerc, 100 - aPerc];
    };
    const setElementWidth = (id, val) =>
      (document.getElementById(id).style.width = `${val}%`);
    const getBalances = () => {
      getEthBalance().then(([pData, hData]) => {
        const p = formatAmount(pData);
        const h = formatAmount(hData);
        const [pVal, hVal] = buildProportions(p, h);

        setPEth(p);
        setHEth(h);

        setElementWidth("leftLine", pVal);
        setElementWidth("rightLine", hVal);

        setIsLoading(false);
      });
    };

    getBalances();

    const intervalId = setInterval(() => getBalances(), 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="app" className="container">
      <div className="columns">
        <div className="column">
          <Header />
          <Contestants />
          <Footer isLoading={isLoading} pEth={pEth} hEth={hEth} />
        </div>
      </div>
    </div>
  );
}

export default App;
