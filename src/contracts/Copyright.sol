// SPDX-License-Identifier: MIT
// describes the range of solidity version compatible to compile this smart contract
pragma solidity >=0.6.0 <0.8.4;
//an experimental library, here we have used it to create the array of struct data structure which is not possible with normal library yet 
pragma experimental ABIEncoderV2;

import "./Label.sol";
contract Copyright {
mapping (uint => uint) public channelIdtoVidId;
 // mapping(uint => string) public getList;
  struct allInfo {
      uint yourVideoId;
      uint channelId;
      string yourChannelName;
      address payable yourAddress;
      uint feesPaid;
      uint timeStamp;
  }
  uint public amount=0;
  uint public count=0;
  allInfo[] allInfoarray;
  //address payable private labelAddress= address(uint160(0x583deA42d6b3DF90bafB05B8EfFB180765060604));
  address payable public labelAddress;
  constructor () public {
    labelAddress= payable(0x098C87513d8BAe2Ec6c2E909941656F2eF1e862D);
    

  }
  modifier checkOwner(){
    require(msg.sender == 0xf2FEc68a4986a1797C4fCc2F7591C0E938D1D3Fe, ": Alert! You do not have the access to call this function.");
    _;
  }
  modifier checkTheUser(uint channelId,uint yourVideoId){
      require(channelIdtoVidId[channelId] != yourVideoId);
      _;
  }
  //this function is called by user on front end of smart contract where he/she fetches the required parameters of the function and the
  // fees of the contract since it is a payable contract which means it is made to accept payments
  function get(uint _yourVideoId, uint _channelId, string calldata _channelName ) external payable checkTheUser(_channelId, _yourVideoId){
    count ++;
    channelIdtoVidId[_channelId] = _yourVideoId;
    allInfoarray.push(allInfo(_yourVideoId, _channelId, _channelName,payable(msg.sender), msg.value,block.timestamp));
    amount =address(this).balance;

  }
  function balanceOf1() external view returns(uint){
    return address(this).balance;
  }

                              /* -- this is not working properly -- */

  function debit() external checkOwner(){
    labelAddress.transfer(address(this).balance);
    //labelAddress.transfer(address(this), address(this).balance);
    // we can also directly tranfer this contract's balance to the label.sol contract rather than record label's ethereum account.
  }
  //function to display all the information stored relating to the artist per se VideoId,channelName, his wallet address, timestamp
  function display() public view returns(allInfo[] memory) {
    return allInfoarray;
  }
}
