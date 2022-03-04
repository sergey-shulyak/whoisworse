import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";

import { ReactComponent as LinkIcon } from "./icons/link.svg";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as CopiedIcon } from "./icons/copied.svg";
import { ReactComponent as EthBlackIcon } from "./icons/eth_black.svg";
import { ReactComponent as EthWHiteIcon } from "./icons/eth_white.svg";

import { getEthBalance } from "./api";

import "./App.css";

const ethDivider = 1000000000000000000.0;
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buildLineWidth = (pEth, hEth) => {
      const calcPerc = (a, b) => a === 0 ? 0 : (a * 100) / b;

      if (pEth > hEth) {
        return [100, calcPerc(hEth, pEth)]
      } else if (hEth > pEth) {
        return [calcPerc(pEth, hEth), 100]
      } else {
        return [100, 100]
      }
    };

    const intervalId = setInterval(() => {
      getEthBalance()
        .then(([pData, hData]) => {
          setPEth(formatAmount(pData));
          setHEth(formatAmount(hData));

          const [pVal, hVal] = buildLineWidth(pData, hData);

          document.getElementById("leftCounter").style.width = `${10 + pVal / 3}vw`;
          document.getElementById("rightCounter").style.width = `${10 +hVal / 3}vw`;

          setIsLoading(false)
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);



  const formatAmount = (amount) =>  amount / ethDivider;

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

  const LoadingSpinnerWhite = <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  const LoadingSpinnerBlack = <div class="lds-ellipsis-black"><div></div><div></div><div></div><div></div></div>

  return (
    <div className="app" id="app">
      <header className="headerContainer">
        <h1 className="headerText">Who's worse?</h1>
        <h2 className="disclaimer">
          ALL MONEY GOES TO THE UKRAINIAN ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES TO THE UKRAINIAN
          ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES TO THE UKRAINIAN ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES TO THE
          UKRAINIAN ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES TO THE UKRAINIAN ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES
          TO THE UKRAINIAN ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES TO THE UKRAINIAN ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL
          MONEY GOES TO THE UKRAINIAN ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES TO THE UKRAINIAN
          ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES TO THE UKRAINIAN ARMY &nbsp;&nbsp;●&nbsp;&nbsp; ALL MONEY GOES TO THE
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
              {showCopied1 ? (
                <CopiedIcon className="icon copyMargin pointer" />
              ) : (
                <CopyIcon
                  className="icon copyMargin pointer"
                  onClick={handleCopy("pEth")}
                />
              )}
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
            {showCopied3 ? (
              <CopiedIcon className="icon shareItemMargin pointer" />
            ) : (
              <LinkIcon
                className="icon shareItemMargin pointer"
                onClick={handleCopyLink}
              />
            )}
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
              {showCopied2 ? (
                <CopiedIcon className="icon copyMargin pointer" />
              ) : (
                <CopyIcon
                  className="icon copyMargin pointer"
                  onClick={handleCopy("hEth")}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="footerContainer">
        <div className="meterLeft" id="leftCounter">
          {isLoading ? LoadingSpinnerBlack : <span className="meterCount">{pEth}</span> }
          <EthBlackIcon className="icon meterIcon" />
        </div>
        <div className="meterRight" id="rightCounter">
          {isLoading ? LoadingSpinnerWhite : <span className="meterCount">{hEth}</span> }
          <EthWHiteIcon className="icon meterIcon" />
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
