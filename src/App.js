import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";

import { getEthBalance } from "./api";

import "./App.css";

const customStyles = {
  content: {
    width: "900px",
    height: "700px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

function App() {
  const [pEth, setPEth] = useState(0);
  const [hEth, setHEth] = useState(0);
  const [showCopied1, setCopied1] = useState(false);
  const [showCopied2, setCopied2] = useState(false);
  const [showCopied3, setCopied3] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const getCounterWidth = useCallback(() => {
    const getWitdh = (n) => ((Number(n) % 100) * 100 + 100).toString() + "px";

    const leftWidth = getWitdh(pEth);
    const rightWidth = getWitdh(hEth);

    return [leftWidth, rightWidth];
  }, [hEth, pEth]);

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
  }, [getCounterWidth]);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied3(true);

    setTimeout(() => {
      setCopied3(false);
    }, 2000);
  };

  return (
    <div className="app" id="app">
      <header className="headerContainer">
        <h1 className="headerText">Who's worse?</h1>
        <h2 className="disclaimer">
          ALL MONEY GOES TO THE UKRAINIAN ARMY ◉ ALL MONEY GOES TO THE UKRAINIAN
          ARMY ◉ ALL MONEY GOES TO THE UKRAINIAN ARMY ◉ ALL MONEY GOES TO THE
          UKRAINIAN ARMY ◉ ALL MONEY GOES TO THE UKRAINIAN ARMY ◉ ALL MONEY GOES
          TO THE UKRAINIAN ARMY ◉ ALL MONEY GOES TO THE UKRAINIAN ARMY ◉ ALL
          MONEY GOES TO THE UKRAINIAN ARMY ◉ ALL MONEY GOES TO THE UKRAINIAN
          ARMY ◉ ALL MONEY GOES TO THE UKRAINIAN ARMY ◉ ALL MONEY GOES TO THE
          UKRAINIAN ARMY
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
          <p className="voteText">Vote with ETH</p>
          <p
            className="sideText"
            onClick={() => {
              setAboutOpen(true);
            }}
          >
            About project
          </p>

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
      <Modal
        isOpen={aboutOpen}
        onRequestClose={() => {
          setAboutOpen(false);
        }}
        style={customStyles}
        overlayClassName="overlay"
      >
        <div className="modalContent">
          <div className="crossIcon" onClick={() => setAboutOpen(false)}>
            x
          </div>
          <h2 className="modalTitle">who we are</h2>
          <p>
            This website was created and is run by a group of Ukrainian
            volunteers trying to do anything to help our army stop this horrible
            war
          </p>
          <p>
            We decided there's no better way to make sure the poll is fair and
            objective than by voting with money. Every single contribution is
            transferred directly to Ukraine Defence Fund to support the country
          </p>

          <p className="modalText">
            You can ensure this yourself by checking all ETH transactions for
            these wallets on Etherscan
          </p>

          <a
            className="ethLink"
            href="https://etherscan.io/address/0xD146e69eB7faC9d4A68Eba1F81207ad5eFe5D4EF"
          >
            ETH wallet 1
          </a>
          <a
            className="ethLink"
            href="https://etherscan.io/address/0x34d704Ff8bFB551bF1E7Ede1b411C77D8a1A8aEE"
          >
            ETH wallet 2
          </a>

          <h2 className="modalTitle margin">Other ways to help</h2>

          <p className="boldText">ETH and USDT (ERC-20)</p>
          <pre>0x165CD37b4C644C2921454429E7F9358d18A45e14</pre>
          <p className="boldText">BTC</p>
          <pre>357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P</pre>
          <p className="boldText">Credit card</p>
          <a className="ethLink" href="https://uahelp.monobank.ua">
            monobank
          </a>

          <h2 className="modalTitle margin">Official source</h2>
          <a
            className="ethLink"
            href="https://twitter.com/Ukraine/status/1497594592438497282"
          >
            tweet
          </a>
        </div>
      </Modal>
    </div>
  );
}

export default App;