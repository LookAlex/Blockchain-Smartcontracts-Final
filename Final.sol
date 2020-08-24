pragma solidity >=0.4.22 <0.7.0;

contract Final{
    uint8[16] public board;
    address public player1;
    address public player2;
    bool public player1GoesNext;
    uint8 public player1pieces;
    uint8 public player2pieces;
    bool player1wins=false;
    bool player2wins=false;

    event Move (uint8 x, uint8 y, bool player1);

    constructor() public{
        player1=msg.sender;
        player1GoesNext=true;
    }
    function joinGame() public{
        require(player2 == address(0));
        player2=msg.sender;
    }
    function play(uint8 x, uint8 y) public{
        uint8 index=y*4+x;
        require(board[index]==0);
        if(player1GoesNext){
            require(msg.sender==player1);
             board[index]= 1;//sets player 1 peice to 1
             player1pieces+=1;//player1pieces increments by 1
             emit Move(x,y,true);
        }else{
            require(msg.sender==player2);
             board[index]= 2;//sets players piece to 2
             player2pieces+=1;//player2pieces incrmeents by 1
             emit Move(x,y,false);
        }
        player1GoesNext=!player1GoesNext;
    }
    function get() public view returns(uint8, uint8){
	    bytes32 theHash=sha256 (abi.encode(block.timestamp));
	    uint8 result1=((uint8) (theHash[0]))%16;
	    uint8 result2=((uint8) (theHash[1]))%16;
	    return(result1, result2);
	}
    function wrongpick(uint8 x, uint8 y) public{
        uint8 index=y*4+x;
        require(board[index]==0);
        if(player1GoesNext){//if player 1 picks a 2 then player 2 wins
            board[index]=2;
            player2wins=true;
        }
        else if(!player1GoesNext){//if not player 1 and that index is 1 then player 1 wins
            board[index]=1;
            player1wins=true;
        }
    }
    function win() public{//win condition
        if(player1pieces==9){//win condition for player 1
            player1wins=true;
        }
        else if(player2pieces==9){//win condition for player 2
            player2wins=true;
        }
    }
}