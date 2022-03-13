import React from "react";

import { ReactComponent as WhoseWorseLabel } from "./icons/whose_worse.svg";

export default function Header() {
  return (
    <div className="columns">
      <div className="column is-12">
        <header className="headerContainer">
          <WhoseWorseLabel height={'100%'} width={'100%'} className="width100" />
          <h2 className="disclaimer">
            VOTE WITH ETHEREUM. ALL MONEY GOES TO THE UKRAINIAN ARMY
          </h2>
        </header>
      </div>
    </div>
  );
}
