// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./horsehelper.sol";
import "./horsecoin.sol";

contract HorseRacing is HorseHelper {
    uint256 raceBet = 10;
    uint256 maxHorses = 4;
    uint256[4] currentRace;
    uint256 idx = 0;
    uint256 randNonce = 0;
    uint256 totalBet = 0;
    HorseCoin token = new HorseCoin(10000);
    address contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    event Race(uint _betAmount, uint _numberOfParticipants, uint256[4] _participants, address _winner, uint _winnerHorseId);

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

    function bet(uint256 _horseId) external onlyOwnerOf(_horseId) {
        //require(msg.value == raceBet);
        require(token.balanceOf(msg.sender) >= raceBet);
        require(idx < maxHorses);
        currentRace[idx] = _horseId;
        idx++;
        token.transferFrom(msg.sender, contractOwner, raceBet);
    }

    function race() external onlyOwner {
        require(msg.sender == contractOwner);
        require(token.balanceOf(msg.sender) >= totalBet);
        require(idx == maxHorses);

        uint256 winnerId = currentRace[randMod(currentRace.length)];
        horses[winnerId].winCount++;

        for (uint256 i = 0; i < currentRace.length; i++) {
            horses[currentRace[i]].lossCount++;
        }
        horses[winnerId].lossCount--;

        // transferir el premio al ganador (chequear)
        //address payable payTo = payable(address(horseToOwner[winnerId]));
        //payTo.transfer(totalBet);

        address payTo = horseToOwner[winnerId];
        token.transfer(payTo, totalBet);

        //payable(horseToOwner[winnerId]).transfer(raceBet * currentRace.length);

        // emitir evento de race para mostrarla en el front
        emit Race(raceBet * currentRace.length, currentRace.length, currentRace, horseToOwner[winnerId], winnerId);
        idx = 0;
        totalBet = 0;
    }


    function mock_race(uint256 winner) external onlyOwner returns (uint256){
        require(idx == maxHorses);
        uint256 winnerId = currentRace[winner];
        horses[winnerId].winCount++;
        for (uint256 i = 0; i < currentRace.length; i++) {
            horses[currentRace[i]].lossCount++;
        }
        horses[winnerId].lossCount--;

        // transferir el premio al ganador (chequear)
        payable(horseToOwner[winnerId]).transfer(totalBet);

        // emitir evento de race para mostrarla en el front
        idx = 0;
        totalBet;
        return winnerId;
    }


    function returnTotalBet() external view returns (uint256){
        return totalBet;
    }

    function returnRaceBet() external view returns (uint256){
        return raceBet;
    }

    function returnBalanceOf(address tokenOwner) external view returns (uint256){
        return token.balanceOf(tokenOwner);
    }

    function transferToken(address to, uint256 tokens) external returns (bool success){
        return token.transfer(to, tokens);
    }

}
