import React, { useState } from "react";

import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as CopiedIcon } from "./icons/tick.svg";

import AboutModal from "./AboutModal";

export default function Contestants(props) {
  const [aboutOpen, setAboutOpen] = useState(false);

  const [showCopied1, setCopied1] = useState(false);
  const [showCopied2, setCopied2] = useState(false);

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

  return (
    <main className="mainContainer">
      <div className="columns is-mobile">
        <div className="column is-4 is-offset-1">
          <div className="contestantContainer">
            <img
              className="contestantPhoto"
              src="img/putler2.png"
              alt="Putler"
            />
            <div className="ethContainer">
              {showCopied1 ? (
                <div className="columns is-mobile">
                  <div className="column">
                    <span className="ethWallet">Copied</span>{" "}
                  </div>
                  <div className="column is-1 iconContainer">
                    <CopiedIcon className="iconClipboard copyMargin pointer" />
                  </div>
                </div>
              ) : (
                <div className="columns is-mobile" onClick={handleCopy("pEth")}>
                  <div className="column">
                    <span id="pEth" className="ethWallet pointer">
                      0xD146e69eB7faC9d4A68Eba1F81207ad5eFe5D4EF
                    </span>
                  </div>
                  <div className="column is-1 iconContainer">
                    <CopyIcon className="iconClipboard copyMargin pointer" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="column is-2">
          <div className="shareContainer">
            <p className="voteText">OR</p>
          </div>
        </div>

        <div className="column is-4">
          <div className="contestantContainer">
            <img
              className="contestantPhoto"
              src="img/hitler2.png"
              alt="Putler"
            />
            <div className="ethContainer" onClick={handleCopy("hEth")}>
              {showCopied2 ? (
                <div className="columns is-mobile">
                  <div className="column">
                    <span className="ethWallet">Copied</span>{" "}
                  </div>
                  <div className="column is-1 iconContainer">
                    <CopiedIcon className="iconClipboard copyMargin pointer" />
                  </div>
                </div>
              ) : (
                <div className="columns is-mobile">
                  <div className="column">
                    <span id="hEth" className="ethWallet pointer">
                      0x34d704Ff8bFB551bF1E7Ede1b411C77D8a1A8aEE
                    </span>
                  </div>
                  <div className="column is-1 iconContainer">
                    <CopyIcon className="iconClipboard copyMargin pointer" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <AboutModal aboutOpen={aboutOpen} setAboutOpen={setAboutOpen} />
      </div>
    </main>
  );
}
