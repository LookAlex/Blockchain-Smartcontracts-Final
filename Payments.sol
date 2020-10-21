pragma solidity >=0.4.22 <0.7.0;
contract Payments {
  uint256 public n1;
  uint256 public n2;
  uint256 public n3;
  uint256 public n4;
    address payable public owner;
    constructor()public{
      owner=msg.sender;
  }
  
  function set1(uint256 x)public payable{
      n1=x;
  }
  
  function set2(uint256 x)public payable{
      require (msg.value == 0.0001 ether);
       n2=x;
  }
  
  function set3(uint256 x)public payable{
      msg.sender.transfer(50 szabo);
      msg.sender.transfer(address(this).balance/10);
      n3=x;
  }
  function set4(uint256 x)public payable{
      require (msg.sender==owner);
      n4=x;
  }
}