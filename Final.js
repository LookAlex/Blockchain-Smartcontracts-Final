// This function is called when the web page is loaded.
function init () {
  // Set up each of the buttons in the 4x4 grid to call code below when they are clicked.
  // Technically, "helper (i, j)" returns a function that is called back when the button at
  // the (i, j) coordinate is clicked.
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let button = document.querySelector (`#board${i}${j}`);
      button.addEventListener ("click", helper (i, j));
    }
  }

  // Set up the Join Game button to call the function joinGame when it is clicked.
  document.querySelector ("#joinGame").addEventListener ("click", joinGame);

  // Fetch the Final.abi.json file.
  // It contains information about the Final.sol contract that is needed to interact with
  // the contract.
  fetch ("./Final.abi.json")
    .then (function (response) {
      return response.json ();
    })
    .then (function (abi) {
      window.abi = abi;
    });
}

// The helper function is written in this style so that it can use the position (i,j)
// to figure out which button was pressed.
function helper (i, j) {
  return function (evt) {    // When a game board button is pressed, this code starts running.
    // First, make sure that we are listening for Move events.
    startListening ();
    // Set up so that we can call the "play" function in the smart contract.
    // Note: Metamask makes the current account available as "web3.eth.accounts[0]",
    // so you always use "web3.eth.accounts[0]" in code, and you switch accounts using the Metamask
    // user interface.
    let instance = getInstance ();
    let sender = web3.eth.accounts[0];
    // Document what is happening on the console for ease of debugging.
    console.log (`calling play with x = ${i} and y = ${j}`);
    // Make the call to the "play" function in the smart contract.
    // The arguments to "play" are "i" and "j".
    // We also have to send in a JavaScript object with "from" and "gas", and a
    // function to show the state afterwards.  However, that function knows about whether
    // the transaction was sent successfully, not whether it completed successfully, so
    // had to add Move events to monitor success.
    instance.play (
      i,
      j,
      { from : sender, gas : 200000 },
      function (error, result) { 
        if (!error) {
          console.log (result.toString ());
        } else {
          console.error (error); 
        }
      }
    );     
  }
}

// Calls the "joinGame" function in the smart contract.
function joinGame (evt) {
  let instance = getInstance ();
  let sender = web3.eth.accounts[0];
  console.log ("calling joinGame");
  instance.joinGame (
    { from : sender, gas : 200000 },
    function (error, result) { 
      if (!error) {
        console.log (result.toString ());
      } else {
        console.error (error); 
      }
    }
  );     
}

// Standard "getInstance" function that reads the contract address and glues
// things together for you.  You can just copy this function into your code.
function getInstance () {
  let contractAddress = document.querySelector ("#contractAddress").value;
  if (contractAddress === "") {
    console.error ("no contract address set");
  }
  let factory = web3.eth.contract (window.abi);
  let instance = factory.at (contractAddress);
  return instance;
}

// Keep track of whether we are already listening for events.
let alreadyListening = false;

// Start listening for Move events if we are not already listening for them.
function startListening () {
  if (!alreadyListening) {
    let instance = getInstance ();
    let event = instance.Move (function (error, result) {
      if (!error) {
        // When we do receive a Move event, print a message to the console and
        // then call "updateScreen" below.
        console.log ("A Move event was received: " + result);
        updateScreen ();
      }
    });
    alreadyListening = true;
  }
}

// We can read the contents of the "board" array in the smart contract just 
// as if it is a function, i.e., to get "board[0]" we call "board (0)", and
// to get "board[5]" we call "board (5)".
function updateScreen () {
  // Loop over the 4x4 grid.
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      // Get the HTML button at position (i,j).
      let button = document.querySelector (`#board${i}${j}`);
      // Read the state of the "board" array for position (i,j).
      let instance = getInstance ();
      let sender = web3.eth.accounts[0];
      instance.board (
        i + j * 4,
        { from : sender, gas : 200000 },
        function (error, result) { 
          if (!error) {
            // When we reach here, "result" is the uint8 for the "board" array at position (i,j).
            // So we assign it to the HTML button's value, which changes the button's label.
            button.value = result;
          } else {
            console.error (error); 
          }
        }
      );     
    }
  }
}