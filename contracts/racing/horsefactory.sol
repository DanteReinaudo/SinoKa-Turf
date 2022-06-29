// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./ownable.sol";
import "./safemath.sol";

contract HorseFactory is Ownable {

    event NewHorse(uint256 horseId, string name, uint256 dna);

    uint256 dnaDigits = 16;
    uint256 dnaModulus = 10**dnaDigits;

    struct Horse {
        string name;
        uint256 dna;
        uint16 winCount;
        uint16 lossCount;
    }

    Horse[] public horses;

    mapping(uint256 => address) public horseToOwner;
    mapping(address => uint256) ownerHorseCount;

    function _createHorse(string memory _name, uint256 _dna) internal {
        horses.push(
            Horse(_name, _dna, 0, 0)
        );
        uint256 id = horses.length - 1;
        horseToOwner[id] = msg.sender;
        ownerHorseCount[msg.sender] = ownerHorseCount[msg.sender] + 1 ;
        emit NewHorse(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomHorse(string memory _name) public {
        require(ownerHorseCount[msg.sender] == 0);
        uint256 randDna = _generateRandomDna(_name);
        randDna = randDna - (randDna % 100);
        _createHorse(_name, randDna);
    }

}
