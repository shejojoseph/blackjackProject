import { enableEdit, savePlayerName } from "./editForm.js";
import { startGame, hit, stand} from "./blackjack.js";
$(document).ready(function () {
  

  $("#player-info").on("click", "#edit-button", enableEdit);
  $("#save-button").on("click", savePlayerName);
  $("#start-game").on("click", startGame);
  $("#hit").on("click", hit);
  $("#stand").on("click", stand);

});
