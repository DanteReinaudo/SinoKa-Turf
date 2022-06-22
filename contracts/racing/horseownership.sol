// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./horseracing.sol";
import "./erc721.sol";
import "./safemath.sol";

contract HorseOwnership is HorseRacing, ERC721 {
    using SafeMath for uint256;

    mapping(uint256 => address) horseApprovals;

    function balanceOf(address _owner) external view override returns (uint256) {
        return ownerHorseCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view override returns (address) {
        return horseToOwner[_tokenId];
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) private {
        ownerHorseCount[_to] = ownerHorseCount[_to].add(1);
        ownerHorseCount[msg.sender] = ownerHorseCount[msg.sender].sub(1);
        horseToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable override {
        require(
            horseToOwner[_tokenId] == msg.sender ||
                horseApprovals[_tokenId] == msg.sender
        );
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId)
        external
        payable
        override
        onlyOwnerOf(_tokenId)
    {
        horseApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }
}
