import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "../abi"
export const TransactionContext = React.createContext();

const { ethereum } = window;

let contractAddress = "0x69F202076983a9E926475D27eD930c8D7A295854"

const createEthereumContract = () => {
  const provider = new ethers.providers.InfuraProvider('ropsten', '62a26547e82949f0baf003bf5b20e627');
  const senderWallet = ethers.Wallet.fromMnemonic('snap slender trap leopard web wasp typical hobby panther once tattoo just').connect(provider);
  return new ethers.Contract(contractAddress, abi, senderWallet);
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const horseRaceContract = createEthereumContract();

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
        handleChange,
        formData,
        horseRaceContract,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
