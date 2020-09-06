for (let i = 0; i < 20; console.log('x'.repeat(++i))) ;
// ну или альтернативный вариант через вложенные циклы, но он хуже, на мой взгляд.
let str = '';
for (let i = 1; i <= 20; i++) {
    str = '';
    for (let j = 0; j < i; j++) {
        str += 'x';
    }
    console.log(str);
}
// и третий вариант
let output = '';
while (output.length < 20) {
    output += 'x';
    console.log(output);
}