// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./horsefactory.sol";

contract HorseHelper is HorseFactory {
    modifier onlyOwnerOf(uint256 _horseId) {
        require(msg.sender == horseToOwner[_horseId]);
        _;
    }
    
    function getHorsesByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](ownerHorseCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < horses.length; i++) {
            if (horseToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

}
