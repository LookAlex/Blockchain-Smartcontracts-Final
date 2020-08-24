General Description
This is a two palyer game. To win a player must have a majority of the board game over a 4x4 game board.

The point is to click a button each time and once the payment is done the player's number will appear.

Player's are trying to beat their opponent by winning more of the board spaces

The twist to the game is that while they might pick a board spot it may end up changing the result where the piece is placed(Not working)


The rules of the game
Must enter the contract adress from Remix to get the contract address to play

Each player must go one at a time

Player 1 by default will always go first in the code I have made

The game is over when one player has more board spaces than the other player

If a player tries to pick a space that has already been claimed by another player then they will automatically lose their turn

With the randomization part as well if the hash went to a space that has been claimed by the oppnent or their own peice
the player loses their turn and now the other player's turn

Players are allowed to play anywhere on the board 



The role the smart contract plays
Player 1 by default will always go first in the code I have made.

No matter who may play if player 1 plays for player 2 or vice versa the pieces will go to 1 and then 2 continously due to the player goes first variable.
There is a get function that will randomly generate a position for the players peice to be placed. That was not fully working when I turned it in.
It is currently not working. To get into the win function in play I made counnter variables  to keep total of pieces for each player for each transaction

In the win function if either players peices are greater than the other player's pieces then it will return that player's win

There is a function called wrong pick that checks the board space that it is tryin to get called to if there was a piece already in that spot 
the piece was going to it would make that player playing lose their turn because of a collison with a current peice already down. 
Makes the player have to check if the transaction go through. 
If failed then they have lost their turn otherwise their turn will be made and board will be updated. 


