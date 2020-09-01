// 1
(function () {
    let a = 1, b = 1, c, d;

    c = ++a; // сначала a увеличивается на 1, потом значение из а кладется в с. т.е. a === 2 && c === 2
    console.log(c); // ответ: 2
//пример 2
    d = b++; // значение из b кладется в d, потом b увеличивается на 1. т.е. b === 2 && d === 1
    console.log(d); //ответ: 1
//пример 3
    c = 2 + ++a; // значение a увеличивается на 1, потом прибавляется к двум и кладется в c. т.е. a === 3 && c === 5
    console.log(c); //ответ: 5
//пример 4
    d = 2 + b++; // берется значение b. потом b увеличивается на 1, к двум прибавляется старое значение b и кладется в d. b === 3, d === 4
    console.log(d); //ответ: 4
    console.log(a); //3
    console.log(b); //3
})();

// 2
(function () {
    let a = 2;
    let x = 1 + (a *= 2); // a умножается на два, потом это значение присваивается a, и возвращается как результат скобок. итого 5
})();

//3
(function () {
    let a = Math.floor(1000 * Math.random()), b = Math.floor(1000 * Math.random());
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('a and b must be numbers')
    }
    console.log(a, b);
    // тут можно использовать и Math.sign() но не вижу в этом смысла
    if (a >= 0 && b >= 0) {
        console.log(a - b);
    } else if (a < 0 && b < 0) {
        console.log(a * b)
    } else {
        console.log(a + b)
    }
})();

//4, 5
(function () {
    let addition = (a, b) => a + b,
        subtraction = (a, b) => a - b,
        multiplication = (a, b) => a * b,
        division = (a, b) => a / b;
    let a = Math.floor(1000 * Math.random()), b = Math.floor(1000 * Math.random());
    console.log(a, b);
    console.log(addition(a, b));
    console.log(subtraction(a, b));
    console.log(multiplication(a, b));
    console.log(division(a, b));

    function mathOperation(arg1, arg2, operation) {
        switch (operation) {
            case 'addition':
                return addition(arg1, arg2);
            case 'subtraction':
                return addition(arg1, arg2);
            case 'multiplication':
                return addition(arg1, arg2);
            case 'division':
                return addition(arg1, arg2);
            default:
                throw new Error(`Unknown operation "${operation}"`);
        }
    }
})();

// 6
(function () {
    function declensionOfWord(number, forms) {
        number = Math.abs(number) % 100;
        let units = number % 10;
        if (number > 10 && number < 20) {
            return forms[2];
        }
        if (units > 1 && units < 5) {
            return forms[1];
        }
        if (units === 1) {
            return forms[0];
        }
        return forms[2];
    }
    do {
        let sum = prompt('Сколько денег вы хотите зачислить?');
        if(sum === null){
            break;
        }
        sum = Number(sum);
        if(isNaN(sum)){
            alert('Необходимо ввести число');
            continue;
        }
        alert(`Ваша сумма в ${sum} ${declensionOfWord(sum, ['рубль', 'рубля', 'рублей'])} успешно зачислена.`);
        break;
    } while (true);
})();