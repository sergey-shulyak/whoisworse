import axios from "axios";

import { accounts } from "./constants";

const api = axios.create({
  baseURL: "https://api.etherscan.io",
});

async function getEthBalance(account) {
  const accountsStr = accounts.join(",");

  const { data } = await api.get(
    `/api?module=account&action=balancemulti&address=${accountsStr}&tag=latest&apiKey=HUID88X9IV88925EF7VIUXTT51KUEN84Z2HUID88X9IV88925EF7VIUXTT51KUEN84Z2`
  );

  return [data?.result[0]?.balance, data?.result[1]?.balance];
}

export { getEthBalance };
