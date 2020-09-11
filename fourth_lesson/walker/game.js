let game = {
    run() {
        while (true) {
            let direction = mover.getDirection();
            if (direction === null) {
                console.log('Игра окончена');
                return;
            }
            renderer.clear()
            let nextPoint = mover.getNextPosition(direction);
            if (mover.checkPosition(nextPoint)) {
                player.move(nextPoint)
            }
            renderer.render();
        }
    },
    init() {
        console.log("Ваше положение на поле в виде о");
        renderer.render();
        console.log("Чтобы начать игру введите game.run() и нажмите Enter")
    }
}
game.init();