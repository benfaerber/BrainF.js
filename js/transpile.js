document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('#transpile-btn').addEventListener('click', transpile);
})

let base = 
`let array = [], index = 0;
for (let i = 0; i < 30000; i++) {
  array.push(0)
}
`;

function transpile() {
  let indent = 0;
  let js = base;

  let code = document.querySelector('#code').value.split('');
  let plusCount = 0;
  let minusCount = 0;

  code = code.filter(cmd => '<>+-.,[]'.includes(cmd));
  code.forEach((cmd, i) => {
    let tab = ' '.repeat(indent*4);
    if (cmd === '>') {
      console.log('a');
      js += tab + 'index++;\n';
    } else if (cmd === '<') {
      js += tab + 'index--;\n';
    }

    if (cmd === '+') {
      plusCount++;
    } else if (plusCount != 0) {
      js += tab + `array[index] += ${plusCount};\n`;
      plusCount = 0;
    }
    
    if (cmd === '-') {
      minusCount++;
    } else if (minusCount != 0) {
      js += tab + `array[index] -= ${minusCount};\n`;
      minusCount = 0;
    }

    if (cmd === '.') {
      js += tab + 'console.log(String.fromCharCode(array[index]));\n'
    } else if (cmd === ',') {
      js += tab + 'array[index] = prompt("Input:");\n';
    }

    if (cmd === '[') {
      js  += tab + 'while (array[index]) {\n';
      indent++;
    } else if (cmd === ']') {
      indent--;
      let tab = ' '.repeat(indent*4);
      js += tab + '}\n';
    }
  });

  document.querySelector('#output').value = js;
}