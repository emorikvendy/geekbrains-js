let mover = {
    getDirection() {
        const availableDirections = [1, 2, 3, 4, 6, 7, 8, 9];
        while (true) {
            let direction = parseInt(prompt("Введите число для перемещения. Отмена для завершения"));
            if (isNaN(direction) || direction === null) {
                return null;
            }
            if (!availableDirections.includes(direction)) {
                alert('Допустимые значения для перемещения: ' + availableDirections.join(', '));
                continue;
            }
            return direction;
        }
    },
    getNextPosition(direction) {
        let nextPosition = {
            x: player.x,
            y: player.y
        }
        switch (direction) {
            case 1:
                nextPosition.x -= 1;
            case 2:
                nextPosition.y += 1;
                break;
            case 3:
                nextPosition.y += 1;
            case 6:
                nextPosition.x += 1;
                break;
            case 9:
                nextPosition.x += 1;
            case 8:
                nextPosition.y -= 1;
                break;
            case 7:
                nextPosition.y -= 1;
            case 4:
                nextPosition.x -= 1;
                break;
        }
        return nextPosition;
    },

    checkPosition(position) {
        return position.x >= 0 && position.x < config.colsCount && position.y >= 0 && position.y < config.rowsCount;
    }
}