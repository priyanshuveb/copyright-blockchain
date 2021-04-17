// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.4;
pragma experimental ABIEncoderV2;

contract Label{

    struct pay {
        address payable yourAddress ;
        uint256 amount;
    }
    pay[] payArray;
    modifier verify() {
        require(msg.sender ==0x42a9e93B089f3F57FC3eAEc7283090d25Ec24D7c, " : Alert! You do not have access to change the state of this contract");
        _;
    }
    // a payaable function which is by default empty, the label owner using this function will tranfer funds to the contract's account
    //which then will be used to pay youtube artists

    //this is special fallback function defined in library and is manadatory to declare like this to receive ether
    receive() external payable {}

    //function to transfer funds from this contract to a desired wallet address, after the payment is done the left amount
    // which is profit is needed to be transferred into one's account
    //try taking a variable address taken as input rather than hardcoded so that the label can decide in which account it wants to transfer 
    function sendEther() external {}

    //to transfer funds to this contract if needed
    function receivepayment() external payable{
    }
    // returns the balance of this smart contract
    function balanceOf() external view returns(uint) {
        return address(this).balance;
    }
    // function to transfer funds to the youtube artists from this contract's account
    function set(address payable[] memory _address, uint256[] memory _amount) public verify(){
        for(uint i=0; i< _amount.length;i++) {
            //In ethereum any address does not natively act as an address that can receive ether, it needs to be in uint160 format and here we area doing
            //that exactly
            address payable my = payable(_address[i]);
            uint256 my2= _amount[i];
            my2=my2*1000;
            payArray.push(pay(my,my2));
            my.transfer(my2);
            
        }



    }


    function display2() public view returns(pay[] memory) {
        return payArray;
    }



}
