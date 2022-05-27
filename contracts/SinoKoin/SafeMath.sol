// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

library SafeMath{

    function add(uint a,uint b) internal pure returns(uint c){
        c = a + b;
        require(c >= a);
    }

    function sub(uint a,uint b) internal pure returns(uint c){
        require(a >= b);
        c = a - b;
    }

    function mul(uint a,uint b) internal pure returns(uint c){
        c = a * b;
        require( a == 0 || c / a == b);
    }

    function div(uint a,uint b) internal pure returns(uint c){
        require( b > 0 );
        c = a / b;
    }
    
}

