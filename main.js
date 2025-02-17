import { enableEdit, savePlayerName } from "./editForm.js";

$(document).ready(function () {
  let playerCards = [];
  let dealerCards = [];
  let playerSum = 0;
  let dealerSum = 0;
  let isAlive = false;
  let hasBlackjack = false;

  $("#player-info").on("click", "#edit-button", enableEdit);
  $("#save-button").on("click", savePlayerName);
  $("#start-game").on("click", startGame);
  $("#hit").on("click",hit);

  function startGame() {
    resetGame();
    playerCards = [pickRandomCard(), pickRandomCard()];
    dealerCards = [pickRandomCard()];
    playerSum = sumOfRanks(playerCards);
    dealerSum = sumOfRanks(dealerCards);
    enableHitNStand();
    renderGame();
  }

  const pickRandomCard = () => {
    const rank = Math.floor(Math.random() * 13) + 1; // 1=Ace, 11=Jack, 12=Queen 13=King
    const suit = ["♣", "♦", "♥", "♠"][Math.floor(Math.random() * 4)]; // 0=Clubs, 1=Diamond, 2=Hearts, 3= Spades
    return { rank, suit };
  };

  const sumOfRanks = (cards) => {
    return cards.reduce((acc, card) => {
      if(card.rank === 1){
        return acc +((acc + 11 <= 21)? 11 : 1 );
      }
      return acc + Math.min(card.rank, 10);
    }, 0);
    
  };

  const renderGame = () => {
    updateCards("#player-cards", playerCards);
    updateCards("#dealer-cards", dealerCards);
    $("#player-sum").text(`Sum: ${playerSum}`);
    $("#dealer-sum").text(`Sum: ${dealerSum}`);

    displayGameStatus();
  
  };

  const displayGameStatus = () =>{
    if(playerSum === 21){
      displayMessage("Blackjack! Player wins!");
    } else if(playerSum > 21){
      displayMessage("Oops! Player Busted");
    } else{
      displayMessage("Hit or Stand?");
    }
  };

  const updateCards = (selector, cards) => {
    $(selector).html(
      cards
        .map(
          (card) =>
            `<span class="card">
                <span class="rank ${getSuitClass(card.suit)}"> 
                  ${getCardDisplay(card.rank)}
                </span>
                <span class="suit ${getSuitClass(card.suit)}">
                  ${card.suit}
                </span>
            </span>`
        )
        .join(" ")
    );
  };

  const getCardDisplay = (rank) => {
    switch (rank) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return rank;
    }
  };

  const getSuitClass = (suit) => (suit === "♦" || suit === "♥") ? "red-suit" : "black-suit";

  function resetGame() {
    playerCards = [];
    dealerCards = [];
    playerSum = 0;
    dealerSum = 0;
    isAlive = true;
    hasBlackjack = false;
  }
  
  const enableHitNStand = () => {
    $("#hit, #stand").prop("disabled", false);
  };

  const displayMessage = (message) => {
    $("#message").text(message);
  };
});
