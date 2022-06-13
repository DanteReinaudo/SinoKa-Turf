pragma solidity >=0.7.0 <0.9.0;

contract HorseFactory {

    event NewHorse(uint horseId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Horse {
        string name;
        uint dna;
    }

    Horse[] public horses;

    mapping (uint => address) public horseToOwner;
    mapping (address => uint) ownerHorseCount;

    function _createHorse(string memory _name, uint _dna) internal {
        horses.push(Horse(_name, _dna));
        uint id = horses.length - 1;
        horseToOwner[id] = msg.sender;
        ownerHorseCount[msg.sender]++;
        emit NewHorse(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomHorse(string memory _name) public {
        require(ownerHorseCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _createHorse(_name, randDna);
    }

}
