import React from "react";

import "./AboutModal.css";

export default function AboutModal(props) {
  const { aboutOpen, setAboutOpen } = props;

  const closeModal = React.useCallback(
    () => setAboutOpen(false),
    [setAboutOpen]
  );
  const escFunction = React.useCallback(
    (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <div
      id="modal-js-example"
      className={`modal is-clipped ${aboutOpen && "is-active"}`}
    >
      <div className="modal-background" onClick={closeModal}></div>

      <div className="modal-content">
        <div className="box">
          <div className="modalContent">
            <h2 className="modalTitle">who we are</h2>
            <p>
              This website was created and is run by a group of Ukrainian
              volunteers trying to do anything to help our army stop this
              horrible war
            </p>
            <p>
              We decided there's no better way to make sure the poll is fair and
              objective than by voting with money. Every single contribution is
              transferred directly to Ukraine Defence Fund to support the
              country
            </p>

            <p>
              You can ensure this yourself by checking all ETH transactions for
              these wallets on Etherscan
            </p>

            <br />

            <a
              className="ethLink"
              href="https://etherscan.io/address/0xD146e69eB7faC9d4A68Eba1F81207ad5eFe5D4EF"
            >
              ETH wallet 1 🔗
            </a>
            <a
              className="ethLink"
              href="https://etherscan.io/address/0x34d704Ff8bFB551bF1E7Ede1b411C77D8a1A8aEE"
            >
              ETH wallet 2 🔗
            </a>

            <h2 className="modalTitle margin">Other ways to help</h2>

            <p className="boldText">ETH and USDT (ERC-20)</p>
            <pre>0x165CD37b4C644C2921454429E7F9358d18A45e14</pre>
            <p className="boldText">BTC</p>
            <pre>357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P</pre>
            <p className="boldText">Credit card</p>
            <pre>
              <a className="black" href="https://uahelp.monobank.ua">
                monobank 🔗
              </a>
            </pre>

            <h2 className="modalTitle margin">Official source</h2>
            <a
              className="ethLink"
              href="https://twitter.com/Ukraine/status/1497594592438497282"
            >
              tweet
            </a>
          </div>
        </div>
      </div>

      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      ></button>
    </div>
  );
}
