function num2obj(number) {
    number = parseInt(number);
    if (isNaN(number)) {
        throw new Error('number must be a number');
    }
    if (number < 0 || number > 999) {
        throw new Error('number must be between 0 and 999');
    }
    return  {
        "units": number % 10,
        "tens": Math.floor(number / 10) % 10,
        "hundreds": Math.floor(number / 100)
    }
}