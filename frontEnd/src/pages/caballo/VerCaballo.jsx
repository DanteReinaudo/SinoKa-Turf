import React, { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
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

const VerCaballo = () => {
  const { connectWallet, currentAccount, currentAddr, handleChange, formData, isLoading, horseRaceContract } = useContext(TransactionContext);
  const [horses, setHorses] = React.useState([]);

  async function getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, network);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  }

  async function getHorsesByOwner(owner) {
    // const contract = await getContract();

    const provider = new ethers.providers.Web3Provider(window.ethereum, network);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let addr = await signer.getAddress();
    // console.log(addr); 
    const contract = new ethers.Contract(contractAddress, abi, signer);

    await contract.getHorsesByOwner(addr)
      .then((horses) => { setHorses(horses) })
      .catch((error) => { console.log(error) })
  }

  const handleSubmit = async (e) => {
    console.log('Creando caballo');
    const { horseName } = formData;
    const contract = await getContract();
    console.log(contract)
    await contract.createRandomHorse(horseName);
    // await getHorsesByOwner(currentAddr);
  }

  var accountInterval = setInterval(async function () {
    getHorsesByOwner(currentAccount);
  }, 1000);

  function listHorses() {
    if (horses.length == 0) {
      return <div>No horses yet :( </div>
    }
    console.log('horses: ' + horses + ' len: ' + horses.length)
    return horses.map((id) => (
      // console.log(id),
      <li key={id.hex}> {id.hex}</li>
    ))
  }
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 'bold' }}> Your horses: </h1>
      <div style={{ margin: 30, textAlign: 'start' }}>
        <h1 style={{ fontSize: 20 }}>
          <ul style={{ listStyle: 'decimal' }}>
            {listHorses()}
          </ul>
        </h1>
      </div>

      <div style={{ textAlign: 'center', margin: 80 }}>
        Create your own horse NFT:

        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white">

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
    </div >
  );
};


function displayHorses(ids) {
  console.log(ids)
  $("#horses").empty();
  for (id of ids) {
    $("#horses").append(`<div class="Horse">
          <ul>
            <li>Name: ${id}</li>
          </ul>
        </div>`);
  };
}

export default VerCaballo;
