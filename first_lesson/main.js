document.addEventListener("DOMContentLoaded", function (event) {
    do {
        // запрашиваем температуру по цельсию, пока нам не дадут число.
        // при отмене тоже вывалимся из цикла, посколкьу Number(null) === 0
        let celsius_temperature = Number(prompt('Введите температуру по цельсию'));
        if (isNaN(celsius_temperature)) {
            alert('Необходимо ввести число');
        } else {
            alert(Math.round(((9 / 5) * celsius_temperature + 32) * 100) / 100)
            break;
        }
    } while (true);
    let name = 'Василий', admin;
    admin = name;
    console.log(admin);
    let res = 10 + 10 + "10";
    /*
    1. 10 + 10 = 20
    2. приводим 20 к строке, поскольку справа стоит строка
    3. "20" + "10" = "2010" канкатинация строк
    4. с помощью console.log выводим res в консоль
     */
    console.log(res);
    res = 10 + "10" + 10;
    /*
    1. приводим 10 к строке, поскольку справа стоит строка
    2. "10" + "10" = "1010" канкатинация строк
    3. приводим 10 к строке, поскольку слева стоит строка
    4. "1010" + "10" = "101010" канкатинация строк
    5. с помощью console.log выводим res в консоль
     */
    console.log(res);
    res = 10 + 10 + +"10";
    /*
    1. 10 + 10 = 20
    2. +"10" преобразует строку в число
    3. 20 + 10 = 30 сложение
    4. с помощью console.log выводим res в консоль
     */
    console.log(res);
    res = 10 / -"";
    console.log(res);
    /*
    1. -"" приводится к числу, получаем 0
    2. 10 / 0 = Infinity
    3. с помощью console.log выводим res в консоль
     */
    res = 10 / +"2,5";
    console.log(res);
    /*
    1. +"2,5" приводится к числу, получаем NaN, поскольку в тексте есть запятая
    2. 10 / NaN = NaN любая математическая операция с NaN дает NaN
    3. с помощью console.log выводим res в консоль
     */

    /*
     let mode = "normal"; - все хорошо
     let my_value3 = 102; - все хорошо
     let 3my_value3 = "102"; - плохо, переменная не может начинаться с цифры
     let __hello__ = "world"; - нормально, хотя по стилю странно
     let $$$ = "money"; - нормально
     let !0_world = true; - плохо, ! - оператор
     */
});