let sample_python_code = `def fibIter(n):
  if n < 2:
    return n
  fibPrev = 1
  fib = 1
  for num in xrange(2, n):
    fibPrev, fib = fib, fib + fibPrev
  return fib`;

let setup_code = function(code) {
  for(let i=0; i<code.length; i++) {
    let char = code.substr(i,1);
    $("#text-box").append(`<span data-index="${i}">${char}</span>`);
  }
}

setup_code(sample_python_code);

let current_character = 0;
let errors = 0;

let handle_key = function(key) {
  if(errors > 0) {
    return;
  }  
  let current_text_box = $(`#text-box span[data-index=${current_character}]`)
  let expected_key = current_text_box.text();
  if(expected_key === key) {
    current_text_box.addClass("good-code");
    current_character += 1;
    // if done then do something
  } else {
    errors += 1;
    current_text_box.addClass("error");
  }
}

let handle_backspace = function() {
  if(errors === 0) {
    // do nothing
  } else {
    errors -= 1;
    $(".error").removeClass("error");
  }
}

$(document).on("keydown", function(e){
  // console.log("pressed key", e.keyCode, e.key, e.which);
  e.preventDefault();
  if (e.keyCode >= 32 && e.keyCode <= 255) {
    handle_key(e.key);
  } else if (e.key === "Enter") {
    // there is no visual feedback on enter
    handle_key("\n");
  } else if (e.key == "Backspace") {
    handle_backspace();
  }
})
