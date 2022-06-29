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
    HorseCoin token;
    address contractOwner;

    // token price for ETH
    uint256 public tokensPerEth = 100;

    constructor() {
        token = new HorseCoin(1e6,msg.sender);
        contractOwner = msg.sender;
    }

    // Event that log buy operation
    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

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
        require(token.balanceOf(msg.sender) >= raceBet);
        require(idx < maxHorses);
        currentRace[idx] = _horseId;
        idx++;
        totalBet += raceBet;
        token.bankTransfer(msg.sender, contractOwner, raceBet,contractOwner);
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
        token.bankTransfer(contractOwner,payTo, raceBet,contractOwner);

        //payable(horseToOwner[winnerId]).transfer(raceBet * currentRace.length);

        // emitir evento de race para mostrarla en el front
        emit Race(raceBet * currentRace.length, currentRace.length, currentRace, horseToOwner[winnerId], winnerId);
        idx = 0;
        totalBet = 0;
    }


    function mock_race(uint256 winner) external onlyOwner returns (uint256){
        require(msg.sender == contractOwner);
        require(token.balanceOf(contractOwner) >= totalBet);
        require(idx == maxHorses);

        uint256 winnerId = currentRace[winner];
        horses[winnerId].winCount++;

        for (uint256 i = 0; i < currentRace.length; i++) {
            horses[currentRace[i]].lossCount++;
        }
        horses[winnerId].lossCount--;

        // transferir el premio al ganador (chequear)
        //address payable payTo = payable(address(horseToOwner[winnerId]));
        //payTo.transfer(totalBet);

        address payTo = horseToOwner[winnerId];
        token.bankTransfer(contractOwner,payTo, totalBet,contractOwner);

        //payable(horseToOwner[winnerId]).transfer(raceBet * currentRace.length);

        // emitir evento de race para mostrarla en el front
        emit Race(raceBet * currentRace.length, currentRace.length, currentRace, horseToOwner[winnerId], winnerId);
        idx = 0;
        totalBet = 0;
    }


    function returnTotalBet() external view returns (uint256){
        return totalBet;
    }

    function returnRaceBet() external view returns (uint256){
        return raceBet;
    }

    function returnRaceLength() external view returns (uint256){
        return idx;
    }

    function transferToken(address from, address to, uint256 tokens) external returns (uint256){
        require(msg.sender == contractOwner);
        token.bankTransfer(from, to, tokens, msg.sender);
    }

    function returnBalanceOf(address tokenOwner) external view returns (uint256){
        return token.balanceOf(tokenOwner);
    }

    function buyTokens() public payable returns (uint256 tokenAmount) {
        require(msg.value > 0, "Send ETH to buy some tokens");

        uint256 amountToBuy = msg.value * tokensPerEth;

        // check if the Vendor Contract has enough amount of tokens for the transaction
        uint256 ourBalance = token.balanceOf(contractOwner);
        require(ourBalance >= amountToBuy, "Vendor contract has not enough tokens in its balance");

        // Transfer token to the msg.sender
        (bool sent) = token.bankTransfer(contractOwner, msg.sender, amountToBuy, contractOwner);
        require(sent, "Failed to transfer token to user");

        // emit the event
        emit BuyTokens(msg.sender, msg.value, amountToBuy);

        return amountToBuy;
  }

}
