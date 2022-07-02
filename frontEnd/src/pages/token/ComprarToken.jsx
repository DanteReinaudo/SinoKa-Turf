import React from 'react';
import { useHistory } from "react-router-dom";

const ComprarToken = () => {
  let history = useHistory();

  return (
    <>
      <div style={{ textAlign: 'center' }}><h1>Es necesario utilizar el token SinoKoin para participar de las carreras. Compre el token aquí. </h1></div>
      {/* <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} /> */}

      {/* <div className="h-[1px] w-full bg-gray-400 my-2" />

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
        )} */}
    </>
  )
};

export default ComprarToken;
