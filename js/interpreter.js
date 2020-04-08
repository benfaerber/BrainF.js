const helloWorld =
`Hello World
+++++ +++++             initialize counter (cell #0) to 10
[                       use loop to set 70/100/30/10
    > +++++ ++              add  7 to cell #1
    > +++++ +++++           add 10 to cell #2
    > +++                   add  3 to cell #3
    > +                     add  1 to cell #4
<<<< -                  decrement counter (cell #0)
]
> ++ .                  print 'H'
> + .                   print 'e'
+++++ ++ .              print 'l'
.                       print 'l'
+++ .                   print 'o'
> ++ .                  print ' '
<< +++++ +++++ +++++ .  print 'W'
> .                     print 'o'
+++ .                   print 'r'
----- - .               print 'l'
----- --- .             print 'd'
> + .                   print '!'
> .                     print '\n'
`;

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('#code').value = helloWorld;
  document.querySelector('#run-btn').addEventListener("click", begin); 
  document.querySelector('#mini-btn').addEventListener("click", minify);
});

let array = [];
let pos = 0;
let start = 0;
let end = 0;
let inpIndex = 0;

function begin() {
  document.querySelector('#output').value = '';
  let code = document.querySelector('#code').value.split('');
  code = removeComments(code);

  pos = 0;
  start = 0;
  end = 0;
  inpIndex = 0;
  array = [];
  for (let i = 0; i < 30000; i++) {
    array.push(0);
  }

  excecute(code);
}

function excecute(code) {
  for(let i = 0; i < code.length; i++) {
    currKey = -1;
    const cmd = code[i];
    if (cmd === '>') {
      pos++;
    } else if (cmd === '<') {
      pos--;
    }

    if (cmd === '+') {
      array[pos] += 1;
    } else if (cmd == '-') {
      array[pos] -= 1;
    }

    if (cmd === '.') {
      output(array[pos]);
    } else if (cmd === ',') {
      const inp = document.querySelector('#input').value.split('');
      array[pos] = inp[inpIndex].charCodeAt(0);
      console.log(array[pos]);
      inpIndex++;
    }

    if (cmd === '[') {
      start = i;
      end = findFriend(code, i);
    } else if (cmd === ']' && i === end && array[pos]) {
      i = start;
    }
  }
}

function output(value) {
  const character = String.fromCharCode(value);
  document.querySelector('#output').value += character;
}

function minify() {
  let code = document.querySelector('#code').value.split('');
  const mini = removeComments(code);
  document.querySelector('#code').value = mini.join('');
}

// Actions
function removeComments(code) {
  const allowed = '<>+-.,[]';
  return code.filter(letter => allowed.includes(letter));
}

function findFriend(code, openingIndex) {
  let opened = 0, closed = 0;
  for (var i = openingIndex; i < code.length; i++) {
    const curr = code[i];
    if (curr === '[') {
      opened++;
    } else if (curr === ']') {
      closed++;
    }

    if (closed != 0 && closed === opened) {
      break;
    }
  }

  //highlight(code, i);
  return i;
}

// Debug functions
function highlight(code, index) {
  copy = [...code];
  copy[index] = `%c${copy[index]}%c`;
  console.log(copy.join(''), 'color: red', 'color: black');
}