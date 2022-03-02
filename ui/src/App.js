import React, { useState, useEffect } from "react";
import { getEthBalance } from "./api";

import "./App.css";

function App() {
  const [pEth, setPEth] = useState(0);
  const [hEth, setHEth] = useState(0);
  const [showCopied1, setCopied1] = useState(false);
  const [showCopied2, setCopied2] = useState(false);
  const [showCopied3, setCopied3] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getEthBalance()
        .then(([data1, data2]) => {
          setPEth(data1);
          setHEth(data2);
        })
        .then(() => {
          const [left, right] = getCounterWidth();

          document.getElementById("leftCounter").style.width = left;
          document.getElementById("rightCounter").style.width = right;
        });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCopy = (elId) => () => {
    const el = document.getElementById(elId);

    navigator.clipboard.writeText(el.textContent);

    if (elId === "pEth") {
      setCopied1(true);

      setTimeout(() => {
        setCopied1(false);
      }, 2000);
    } else {
      setCopied2(true);
      setTimeout(() => {
        setCopied2(false);
      }, 2000);
    }
  };

  const getCounterWidth = () => {
    const getWitdh = (n) => ((Number(n) % 100) * 100 + 100).toString() + "px";

    const leftWidth = getWitdh(pEth);
    const rightWidth = getWitdh(hEth);

    return [leftWidth, rightWidth];
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied3(true);

    setTimeout(() => {
      setCopied3(false);
    }, 2000);
  };

  return (
    <div className="app">
      <header className="headerContainer">
        <h1 className="headerText">Who is worse?</h1>
        <h2 className="disclaimer">
          All money goes to ZSU (transparency) ◉ All money goes to ZSU
          (transparency) ◉ All money goes to ZSU (transparency) ◉ All money goes
          to ZSU (transparency) ◉ All money goes to ZSU (transparency) ◉ All
          money goes to ZSU (transparency)
        </h2>
      </header>
      <main className="mainContainer">
        <div className="contestantContainer">
          <img className="contestantPhoto" src="img/putler.png" alt="Putler" />
          <div className="ethContainer">
            <span className="ethLabel">ETH</span>
            <span id="pEth" className="ethWallet">
              0xD146e69eB7faC9d4A68Eba1F81207ad5eFe5D4EF
            </span>
            <div className="iconContainer">
              <img
                className="icon copyMargin pointer"
                src={showCopied1 ? "icons/done.png" : "icons/copy.png"}
                alt="Copy"
                onClick={handleCopy("pEth")}
              />
            </div>
          </div>
        </div>

        <div className="shareContainer">
          <p className="sideText">About project</p>

          <p className="shareLabel">Share link</p>
          <div className="iconContainer">
            <img
              className="icon shareItemMargin pointer"
              src={showCopied3 ? "icons/done.png" : "icons/link.png"}
              alt="Link"
              tooltip="Copy link"
              onClick={handleCopyLink}
            />
          </div>
        </div>

        <div className="contestantContainer">
          <img className="contestantPhoto" src="img/hitler.jpg" alt="Putler" />
          <div className="ethContainer">
            <span className="ethLabel">ETH</span>
            <span id="hEth" className="ethWallet">
              0x34d704Ff8bFB551bF1E7Ede1b411C77D8a1A8aEE
            </span>
            <div className="iconContainer">
              <img
                className="icon copyMargin pointer"
                src={showCopied2 ? "icons/done.png" : "icons/copy.png"}
                alt="Copy"
                onClick={handleCopy("hEth")}
              />
            </div>
          </div>
        </div>

        {/* <p className="rotated2 sideText">Smart Contract</p> */}
      </main>

      <footer className="footerContainer">
        <div className="meterLeft" id="leftCounter">
          <span className="meterCount">{pEth}</span>
          <img className="icon" src="icons/eth_black.png" alt="Etherium" />
        </div>
        <div className="meterRight" id="rightCounter">
          <span className="meterCount">{hEth}</span>
          <img
            className="icon meterIcon"
            src="icons/eth_white.png"
            alt="Etherium"
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
