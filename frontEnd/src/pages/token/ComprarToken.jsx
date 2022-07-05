import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { SiEthereum } from "react-icons/si";
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import { Loader } from "../../components";

import { network, contractAddress } from "../../config"
import { abi } from "../../abi"
import { ethers } from "ethers";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const ComprarToken = () => {
  const { connectWallet, currentAccount, currentAddr, handleChange, formData, isLoading } = useContext(TransactionContext);
  const [balance, setBalance] = React.useState("");

  const handleSubmit = async (e) => {
    console.log('buy ', formData.amount + ' tokens');

    const provider = new ethers.providers.Web3Provider(window.ethereum, network);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    await contract.buyTokens({ value: ethers.utils.parseEther(formData.amount), gasLimit: 5000000 })
    };

  async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, network);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    return await contract.returnBalanceOf(address);
  }

  var accountInterval = setInterval(async function () {
    const b = await getBalance();
    console.log(b.toString());
    setBalance(b.toString());
  }, 1000);

  return (
    <div style={{ textAlign: 'center', margin: 40 }}>
      <h1>Es necesario utilizar el token SinoKoin para participar de las carreras. Compre el token aquí. </h1>
      <div style={{ textAlign: 'center', margin: 60 }}>
        <h1 style={{ fontSize: 20, fontWeight: 'bold' }}> Actualmente posee: {balance} tokens </h1>
        <div style={{ textAlign: 'center', }}>
          {!currentAccount && (
            <Button
              variant="contained"
              style={{ right: 0, marginLeft: 16 }}
              color="secondary"
              size="small"
              onClick={connectWallet}
            >
              Connect wallet
            </Button>
          )}
        </div>

        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card ">
          <div className="flex justify-between flex-col w-full h-full">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
              <SiEthereum fontSize={100} color="#fff" />
            </div>
            <div style={{ textAlign: 'center', margin: 60 }}>
              <p className="text-white font-semibold text-lg mt-1">
                Account Address:
              </p>
              <p className="text-white font-light text-sm">
                {shortenAddress(currentAddr)}
              </p>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center white-glassmorphism">
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <Button
                  variant="contained"
                  style={{ right: 0, marginLeft: 16 }}
                  color="grey"
                  size="small"
                  onClick={handleSubmit}
                >
                  Buy amount
                </Button>
              )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprarToken;
