// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./horsehelper.sol";
import "./horsecoin.sol";

contract HorseRacing is HorseHelper {

    uint256 randNonce = 0;
    HorseCoin token;
    address contractOwner;

    struct Race {
        uint raceBet;
        uint256 idx;
        uint[] bets;
        bool completed;
        uint256 maxHorses;
    }

    struct Bet {
        uint256 amount;
        address owner;
        uint256 horseId;
    }

    mapping(uint => Race) races;
    mapping(uint256 => Bet) betsToId;
    uint numberOfRaces = 0;
    uint256 numberOfBets = 0;

    // token price for ETH
    uint256 public tokensPerEth = 100;

    constructor() {
        token = new HorseCoin(1e6,msg.sender);
        contractOwner = msg.sender;
    }

    // Event that log buy operation
    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event RaceCreated(uint256 raceId);

    function newRace(uint _betAmount, uint256 _maxAmountOfHorses) public returns (uint256 raceId) {
        uint[] memory bets;
        raceId = numberOfRaces;
        races[raceId] = Race(_betAmount, 0, bets, false, _maxAmountOfHorses);

        numberOfRaces++;
        emit RaceCreated(raceId);
    }

    function randMod(uint256 _modulus) internal returns (uint256) {
        randNonce = randNonce + 1;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }

    function bet(uint256 raceId, uint256 _horseId) public payable onlyOwnerOf(_horseId) {
        require(races[raceId].completed == false);
        require(token.balanceOf(msg.sender) >= races[raceId].raceBet);

        betsToId[numberOfBets] = Bet(races[raceId].raceBet, msg.sender, _horseId);
        races[raceId].bets.push(numberOfBets);
        races[raceId].idx++;
        numberOfBets++;

        token.bankTransfer(msg.sender, contractOwner, races[raceId].raceBet, contractOwner);
        if(races[raceId].idx == races[raceId].maxHorses) {
            simulateRace(raceId);
        }
    }

    function simulateRace(uint256 raceId) private {
        uint256 winnerId = betsToId[races[raceId].bets[randMod(races[raceId].bets.length)]].horseId;
        horses[winnerId].winCount++;
        
        for (uint256 i = 0; i < races[raceId].maxHorses - 1; i++) {
            horses[betsToId[races[raceId].bets[i]].horseId].lossCount++;
        }
        horses[winnerId].lossCount--;

        // transferir el premio al ganador (chequear)

        address payTo = horseToOwner[winnerId];
        token.bankTransfer(contractOwner, payTo, races[raceId].raceBet * races[raceId].maxHorses, contractOwner);
        races[raceId].completed = true;
    }

    function mock_simulateRace(uint256 raceId, uint winner) public {
        require(races[raceId].idx == races[raceId].maxHorses);

        uint256 winnerId = betsToId[races[raceId].bets[winner]].horseId;
        horses[winnerId].winCount++;

        for (uint256 i = 0; i < races[raceId].maxHorses - 1; i++) {
            horses[betsToId[races[raceId].bets[i]].horseId].lossCount++;
        }
        horses[winnerId].lossCount--;

        // transferir el premio al ganador (chequear)

        address payTo = horseToOwner[winnerId];
        token.bankTransfer(contractOwner, payTo, races[raceId].raceBet * races[raceId].idx, contractOwner);
        races[raceId].completed = true;
    }

    function mock_bet(uint256 raceId, uint256 _horseId) public payable onlyOwnerOf(_horseId) {
        require(races[raceId].completed == false);
        require(token.balanceOf(msg.sender) >= races[raceId].raceBet);

        betsToId[numberOfBets] = Bet(races[raceId].raceBet, msg.sender, _horseId);
        races[raceId].bets.push(numberOfBets);
        races[raceId].idx++;
        numberOfBets++;

        token.bankTransfer(msg.sender, contractOwner, races[raceId].raceBet, contractOwner);
    }

    function isRaceCompleted(uint256 raceId) external view returns(bool) {
        return races[raceId].completed;
    }   

    function returnTotalBet(uint256 raceId) external view returns (uint256){
        return (races[raceId].raceBet * races[raceId].idx);
    }

    function returnRaceBet(uint256 raceId) external view returns (uint256){
        return races[raceId].raceBet;
    }

    function returnRaceLength(uint256 raceId) external view returns (uint256){
        return races[raceId].idx;
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
