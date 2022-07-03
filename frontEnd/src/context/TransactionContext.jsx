import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.getDefaultProvider('ropsten');
  // const signer = provider.getSigner();
  const horseRaceContract = new ethers.Contract(contractAddress, contractABI, signer); //hay que definir contractAddres y contractABI
  console.log('contrato creado en '+provider)
  if (!horseRaceContract) {
    throw new Error("No se pudo crear el contrato");
  }
  return horseRaceContract;
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
