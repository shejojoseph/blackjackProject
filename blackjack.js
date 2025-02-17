let playerCards = [];
let dealerCards = [];
let playerSum = 0;
let dealerSum = 0;

export function startGame() {
  resetGame();
  playerCards = [pickACard(), pickACard()];
  dealerCards = [pickACard()];
  playerSum = sumOfRanks(playerCards);
  dealerSum = sumOfRanks(dealerCards);
  enableHitNStand();
  renderGame();
}

export function hit() {
  const card = pickACard();
  playerCards.push(card);
  playerSum = sumOfRanks(playerCards);
  renderGame();
}

export function stand(){
  while(dealerSum < 17){
    const card = pickACard();
    dealerCards.push(card);
    dealerSum = sumOfRanks(dealerCards);
  }
  renderGame();
  if(dealerSum > 21 || playerSum > dealerSum){
    displayMessage("Player Wins!! Pay the Winners!!!");
  } else if(playerSum < dealerSum){
    displayMessage("House Wins!");
  } else{
    displayMessage("Push");
  }
  endGame();

}
const pickACard = () => {
  const rank = Math.floor(Math.random() * 13) + 1; // 1=Ace, 11=Jack, 12=Queen 13=King
  const suit = ["♣", "♦", "♥", "♠"][Math.floor(Math.random() * 4)]; // 0=Clubs, 1=Diamond, 2=Hearts, 3= Spades
  return { rank, suit };
};

const sumOfRanks = (cards) => {
  let total = 0;
  let noOfAces = 0;

  for(const card of cards){
    if(card.rank === 1){

      noOfAces++;

    }else{

      total += Math.min(card.rank, 10);
    }
    
  }
    
  total += noOfAces;
  if(noOfAces > 0 && total + 10 <= 21){
    total += 10;
  }
  return total;
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
    endGame();
  } else if(playerSum > 21){
    displayMessage("Oops! Player Busted");
    endGame();
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
}

const endGame = () => {
  disableHitNStand();
};
  
const enableHitNStand = () => {
  $("#hit, #stand").prop("disabled", false);
};

const disableHitNStand = () => {
  $("#hit, #stand").prop("disabled", true);
};

const displayMessage = (message) => {
  $("#message").text(message);
};


