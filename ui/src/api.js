import axios from "axios";

import { accounts } from "./constants";

const api = axios.create({
  baseURL: "https://api.etherscan.io",
});

async function getEthBalance(account) {
  const [data1, data2] = await Promise.all(
    accounts.map((account) =>
      api.get(
        `/api?module=account&action=balance&address=${account}&tag=latest&apiKey=HUID88X9IV88925EF7VIUXTT51KUEN84Z2HUID88X9IV88925EF7VIUXTT51KUEN84Z2`
      )
    )
  );

  return [data1.data.result, data2.data.result];
}

export { getEthBalance };
