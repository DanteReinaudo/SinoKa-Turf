// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./horsehelper.sol";

contract HorseRacing is HorseHelper {
    uint256 raceBet = 0.01 ether;
    uint256[7] currentRace;
    uint256 idx = 0;
    uint256 randNonce = 0;

    function randMod(uint256 _modulus) internal returns (uint256) {
        randNonce = randNonce + 1;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }

    function setBet(uint256 _bet) external onlyOwner {
        raceBet = _bet;
    }

    function bet(uint256 _horseId) external payable onlyOwnerOf(_horseId) {
        require(msg.value == raceBet);
        require(idx < currentRace.length - 1);
        currentRace[idx] = _horseId;
        idx++;

        if (idx == currentRace.length - 1) {
            // si se completan los caballos, se ejecuta la carrera
            race();
        }
    }

    function race() internal {
        uint256 winnerId = currentRace[randMod(currentRace.length)];
        horses[winnerId].winCount++;
        for (uint256 i = 0; i < currentRace.length; i++) {
            horses[currentRace[i]].lossCount++;
        }
        horses[winnerId].lossCount--;

        // transferir el premio al ganador (chequear)
        payable(horseToOwner[winnerId]).transfer(raceBet * currentRace.length);

        // emitir evento de race para mostrarla en el front
        idx = 0;
    }
}
