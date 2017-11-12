$(document).on("keydown", function(e){
  if (e.keyCode >= 32 && e.keyCode <= 127) {
    $(".typing-box").append(`<span>${e.key}</span>`);
  } else if (e.key === "Enter") {
    $(".typing-box").append(`<br/>`);
  } else if (e.key == "Backspace") {
    $(".typing-box").append(`🥔`);
  }
})
