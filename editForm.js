/* Generated with assistance from ChatGPT to understand the 
    flow of control between html css and javascript and the usage of jquery */
    
export function enableEdit() {
  $("#edit-form").show();
  const currentName = $("#player-name")
    .contents()
    .first()
    .text()
    .replace("Player: ", "")
    .trim();
  $("#name-input").val(currentName);
}

export function savePlayerName() {
  const newName = $("#name-input").val().trim();
  if (newName) {
    $("#player-name").contents().first().replaceWith(`Player: ${newName} `);

    $("#edit-form").hide();
  } else {
    alert("Please enter a valid name.");
  }
}
