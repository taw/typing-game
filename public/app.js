let sample_python_code = `def fibIter(n):
  if n < 2:
    return n
  fibPrev = 1
  fib = 1
  for num in xrange(2, n):
    fibPrev, fib = fib, fib + fibPrev
  return fib`;

let setup_code = function(code) {
  let newline = true;
  let index = 0;
  for(let i=0; i<code.length; i++) {
    let char = code.substr(i,1);
    if(char === "\n") {
      newline = true;
      $("#text-box").append(`<span class="typable" data-index="${index}">${char}</span>`);
      index += 1;
    } else if(newline && char === " ") {
      $("#text-box").append(`<span class="indentation" data-for="${index-1}">${char}</span>`);
    } else {
      newline = false;
      $("#text-box").append(`<span class="typable" data-index="${index}">${char}</span>`);
      index += 1;
    }
  }
}

setup_code(sample_python_code);

let typing_start_time = null;
let typing_end_time = null;
let current_character = 0;
let errors = 0;
let finished = false;

let game_finished = function() {
  finished = true;
}

let handle_key = function(key) {
  if(typing_start_time === null) {
    typing_start_time = new Date();
  }
  if(errors > 0) {
    return;
  }
  let current_text_box = $(`#text-box .typable[data-index=${current_character}]`)
  let indentation = $(`#text-box .indentation[data-for=${current_character}]`);
  if(!current_text_box.length) {
    game_finished();
  }
  let expected_key = current_text_box.text();
  if(expected_key === key) {
    current_text_box.addClass("good-code");
    indentation.addClass("good-code");
    current_character += 1;
    // if done then do something
  } else {
    errors += 1;
    current_text_box.addClass("error");
  }
}

let handle_backspace = function() {
  if(errors === 0) {
    if(current_character > 0) {
      current_character -= 1;
      let current_text_box = $(`#text-box .typable[data-index=${current_character}]`)
      current_text_box.removeClass("good-code");
      let indentation = $(`#text-box .indentation[data-for=${current_character}]`);
      indentation.removeClass("good-code");
    }
  } else {
    errors -= 1;
    $(".error").removeClass("error");
  }
}

let update_timer = function() {
  if(finished) {
    return;
  }
  if(typing_start_time === null) {
    return;
  }
  let ms = (new Date()) - typing_start_time;
  let s = Math.round(ms/1000);
  $(".time span").text(s);

  let cpm = Math.round(60000 * current_character / ms);
  $(".typing-rate span").text(cpm);
}

$(document).on("keydown", function(e){
  if(finished) {
    return;
  }
  if(e.ctlKey || e.metaKey) {
    return;
  }
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

setInterval(update_timer, 100);
