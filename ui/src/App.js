import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="headerContainer">
        <h1 className="headerText">Who's more Hitler?</h1>
        <h2 className="disclaimer">
          All money goes to ZSU (transparency) ◉ All money goes to ZSU
          (transparency) ◉ All money goes to ZSU (transparency) ◉ All money goes
          to ZSU (transparency) ◉ All money goes to ZSU (transparency) ◉ All
          money goes to ZSU (transparency)
        </h2>
      </header>
      <main className="mainContainer">
        <p className="rotated1 sideText">About project</p>
        <div className="contestantContainer">
          <img className="contestantPhoto" src="img/putler.png" alt="Putler" />
          <div className="ethContainer">
            <span className="ethLabel">ETH</span>
            <span className="ethWallet">
              0x165CD37b4C644C2921454429E7F9358d18A45e14
            </span>
            <img className="icon copyMargin" src="icons/copy.png" alt="Copy" />
          </div>
        </div>

        <div className="shareContainer">
          <p className="shareLabel">Share</p>
          <img
            className="icon shareItemMargin"
            src="icons/facebook.png"
            alt="Facebook"
          />
          <img
            className="icon shareItemMargin"
            src="icons/twitter.png"
            alt="Twitter"
          />
          <img
            className="icon shareItemMargin"
            src="icons/discord.png"
            alt="Discord"
          />
          <img
            className="icon shareItemMargin"
            src="icons/link.png"
            alt="Link"
          />
        </div>

        <div className="contestantContainer">
          <img className="contestantPhoto" src="img/hitler.jpg" alt="Putler" />
          <div className="ethContainer">
            <span className="ethLabel">ETH</span>
            <span className="ethWallet">
              0x165CD37b4C644C2921454429E7F9358d18A45e14
            </span>
            <img className="icon copyMargin" src="icons/copy.png" alt="Copy" />
          </div>
        </div>

        <p className="rotated2 sideText">Smart Contract</p>
      </main>

      <footer className="footerContainer">
        <div className="meterLeft">
          <span className="meterCount">7</span>
          <img className="icon" src="icons/eth_black.png" alt="Etherium" />
        </div>
        <div className="meterRight">
          <span className="meterCount">7</span>
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
