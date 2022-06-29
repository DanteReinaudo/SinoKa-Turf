import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum, SiEventbrite } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

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

const Betting = () => {
  const { currentAccount, connectWallet, handleChange, formData, isLoading } = useContext(TransactionContext);

  const handleBet = (e) => {

  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 ">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl flex sm:text-5xl text-white">
              Bet on your own horse
            </h1>
          </div>
        
        <div className="flex mf:flex-row justify-center w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center white-glassmorphism">
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleBet}
                    className="text-grey w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Bet
                  </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Betting;
