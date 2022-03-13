import axios from "axios";

import { accounts, BALANCES_URL } from "./constants";

async function getOverallBalance() {
  const { data } = await axios.get(BALANCES_URL);
  const [pEth, hEth] = data.split(", ");

  return [parseFloat(pEth), parseFloat(hEth)];
}

async function getEthBalance() {
  const accountsStr = accounts.join(",");
  const api = axios.create({
    baseURL: "https://api.etherscan.io",
  });

  const { data } = await api.get(
    `/api?module=account&action=balancemulti&address=${accountsStr}&tag=latest&apiKey=HUID88X9IV88925EF7VIUXTT51KUEN84Z2HUID88X9IV88925EF7VIUXTT51KUEN84Z2`
  );

  return [data?.result[0]?.balance, data?.result[1]?.balance];
}

export { getEthBalance, getOverallBalance };
