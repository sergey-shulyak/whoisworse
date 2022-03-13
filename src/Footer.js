import React, { useState } from "react";
import AboutModal from "./AboutModal";

import { ReactComponent as EthBlackIcon } from "./icons/eth_black.svg";

// import LoadingSpinner from "./LoadingSpinner";

export default function Footer(props) {
  const { isLoading, pEth, hEth } = props;

  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="footerContainer">
      <div className="columns is-mobile">
        
        <div className="column is-2 is-offset-2 amountBox">
          {isLoading ? (
            <div></div>
          ) : (
            <div>
              <span className="meterCount">{pEth}</span>
              <EthBlackIcon className="meterIcon iconEth" />
            </div>
          )}
        </div>
        <div className="column is-4 contestLine">
          <div id="leftLine" className="red"></div>
          <div id="rightLine" className="black"></div>
        </div>
        <div className="column is-2 amountBox">
          {isLoading ? (
            <div></div>
          ) : (
            <div>
              <span className="meterCount">{hEth}</span>
              <EthBlackIcon className="meterIcon iconEth" />
            </div>
          )}
        </div>
      </div>
      <div className="aboutLink has-text-centered">
        <p
          className="sideText"
          onClick={() => {
            setAboutOpen(true);
          }}
        >
          About project
        </p>
      </div>
      <AboutModal aboutOpen={aboutOpen} setAboutOpen={setAboutOpen} />
    </div>
  );
}
