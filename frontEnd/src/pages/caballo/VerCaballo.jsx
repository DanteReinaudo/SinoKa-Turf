import React, { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { Loader } from "../../components";


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
  const { connectWallet, currentAccount, handleChange, formData, isLoading, horseRaceContract } = useContext(TransactionContext);

  async function getHorsesByOwner(owner) {
    const horses = await horseRaceContract.getHorsesByOwner(currentAccount)
    return horses
  }
  async function createHorse(name) {
    const horse = await horseRaceContract.createRandomHorse(horseName);
    return horse
  }

  const handleSubmit = (e) => {
    const { horseName } = formData;
    console.log('Creando caballo');
    createHorse(horseName);
  }
  
  var accountInterval = setInterval(function () {
      getHorsesByOwner(currentAccount)
        .then(displayHorses);
  }, 1000);

  return (
    <div id="horses">
      <p> Your horses:</p>

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
    </div>
  );
};


function displayHorses(ids) {
  $("#horses").empty();
  for (id of ids) {

    getHorseDetails(id)
      .then(function (horse) {
        $("#horses").append(`<div class="Horse">
          <ul>
            <li>Name: ${horse.name}</li>
            <li>DNA: ${horse.dna}</li>
            <li>Level: ${horse.level}</li>
            <li>Wins: ${horse.winCount}</li>
            <li>Losses: ${horse.lossCount}</li>
            <li>Ready Time: ${horse.readyTime}</li>
          </ul>
        </div>`);
      });
  }
}

export default VerCaballo;
