import { network, contractAddress} from "../config"
import { abi } from "../abi"
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
export const TransactionContext = React.createContext();
const { ethereum } = window;


export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentAddr, setCurrentAddr] = useState("");
  const [contract, setContract] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const provider = new ethers.providers.Web3Provider(window.ethereum, network);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setCurrentAccount(signer);
      const addr = await signer.getAddress();
      setCurrentAddr(addr);
      const contract = new ethers.Contract(contractAddress, abi, signer)
      setContract(contract);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        currentAddr,
        isLoading,
        handleChange,
        formData,
        contract,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
