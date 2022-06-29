import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
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

const HorseCreator = () => {
  const { currentAccount, handleChange, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { horseName } = formData;
    
    //createRandomHorse(horseName);
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white">
              Create your own horse NFT
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              
          </p>
          </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center white-glassmorphism">
            <Input placeholder="Horse Name" name="horseName" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-grey w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Generate
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorseCreator;
