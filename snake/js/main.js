'use strict';
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented || !game.started) {
            return;
        }

        let handled = false;
        if (event.key !== undefined) {
            handled = true;
            switch (event.key) {
                case "ArrowUp":
                    game.snake.setDirection(0);
                    break
                case "ArrowRight":
                    game.snake.setDirection(1);
                    break
                case "ArrowDown":
                    game.snake.setDirection(2);
                    break
                case "ArrowLeft":
                    game.snake.setDirection(3);
                    break
                default:
                    handled = false;
            }
        } else if (event.keyCode !== undefined) {
            handled = true;
            switch (event.key) {
                case 38:
                    game.snake.setDirection(0);
                    break
                case 39:
                    game.snake.setDirection(1);
                    break
                case 40:
                    game.snake.setDirection(2);
                    break
                case 37:
                    game.snake.setDirection(3);
                    break
                default:
                    handled = false;
            }
        }
        if (handled) {
            event.preventDefault();
        }
    }, true);
    let start_buttons = document.querySelectorAll('.start');
    start_buttons.forEach(function (start_button) {
        start_button.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('id01').style.display = 'none';
            game.init();
        })
    });
    let closes = document.querySelectorAll('.close, .cancel_button');
    closes.forEach(function (close) {
        close.addEventListener('click', function (event) {
            event.preventDefault();
            let modal = close.closest('.modal');
            if (modal !== null) {
                modal.style.display = 'none';
            }
            document.getElementById('height').value = game.settings.height;
            document.getElementById('width').value = game.settings.width;
            document.getElementById('speed').value = game.settings.speed;
        });
    });
    let modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    })
    game.init(false);
    let pause = document.getElementById("pause");
    if (pause !== null) {
        pause.addEventListener('click', function (event) {
            event.preventDefault()
            if (game.started) {
                if (game.paused) {
                    game.resume()
                    event.target.innerText = 'Pause'
                } else {
                    game.pause()
                    event.target.innerText = 'Resume'
                }
            }
        })
    }
});
window.game = {
    settings: {
        height: null,
        width: null,
        speed: 1,
        fieldShape: null // 1 - border-box, 2 - thor, 3 - vertical cylinder, 4 - horizontal cylinder, 5 - Klein bottle, 6 - projective plane
    },
    score: 0,
    started: false,
    paused: false,
    play: null,
    init: function (start_game = true) {
        if (game.started) {
            game.gameOver(false);
        }
        let formData = new FormData(document.getElementById('settings'));
        let height = parseInt(formData.get('height')), width = parseInt(formData.get('width')),
            speed = parseInt(formData.get('speed')), fieldShape = parseInt(formData.get('fieldShape'));

        game.settings = {
            height: Math.max(10, Math.min(30, isNaN(height) ? 20 : height)),
            width: Math.max(10, Math.min(30, isNaN(width) ? 20 : width)),
            speed: Math.max(1, Math.min(5, isNaN(speed) ? 2 : speed)),
            fieldShape: Math.max(1, Math.min(6, isNaN(fieldShape) ? 1 : fieldShape)),
        };

        game.score = 0;
        game.createField();
        if (start_game) {
            game.started = true;
            game.snake.init()
            game.apple.init()
            game.play = setInterval(game.snake.move, 350 - game.settings.speed * 50);
        }
    },
    createField: function () {
        let cell = '<div class="cell"></div>';
        let row = `<div class="row clearfix">${cell.repeat(this.settings.width)}</div>`;
        document.getElementById('root').innerHTML = row.repeat(game.settings.height);
    },
    gameOver: function (show_score = true) {
        game.started = false;
        clearInterval(game.play);
        if (show_score) {
            let container = document.querySelector('#id02 .container');
            container.innerHTML = `<h2>Игра окончена</h2><h3>Ваш результат ${game.score}</h3>
<button type="button" onclick="document.getElementById('id02').style.display='none'" class="cancel_button">Ok</button>`
            document.getElementById('id02').style.display = 'block'
        }
    },
    pause: function () {
        if (game.started) {
            game.paused = true;
            clearInterval(game.play);
        }
    },
    resume: function () {
        if (game.started) {
            game.paused = false;
            game.play = setInterval(game.snake.move, 350 - game.settings.speed * 50);
        }
    },
    snake: {
        cells: [],
        prev_direction: null,
        direction: null, // 0 - top, 1 - right, 2 - bottom, 3 - left
        move: function () {
            let head = game.snake.addHead();
            if (head.x === game.settings.width || head.y === game.settings.height || head.x < 0 || head.y < 0) {
                game.gameOver();
            } else {
                game.snake.cutTail();
                if (game.snake.checkIntersection(head, game.snake.cells.slice(0, -1))) {
                    game.gameOver();
                }
                if (head.x === game.apple.x && head.y === game.apple.y) {
                    game.apple.hide();
                    head.apple = true;
                    game.score++;
                }
                game.snake.cells.push(head);
                if (head.apple) {
                    game.apple.init()
                }
            }
        },
        init: function () {
            let start = {
                x: 4 + Math.floor(Math.random() * (game.settings.width - 9)),
                y: 4 + Math.floor(Math.random() * (game.settings.height - 9)),
                apple: false
            };
            game.snake.direction = Math.floor(Math.random() * 4);
            game.snake.cells = [start];
            game.snake.show();
            let head = game.snake.addHead();
            game.snake.cells.push(head);

        },
        setDirection: function (value) {
            if ((game.snake.prev_direction === 0 && value === 2) || (game.snake.prev_direction === 1 && value === 3) ||
                (game.snake.prev_direction === 2 && value === 0) || (game.snake.prev_direction === 3 && value === 1)) {
                return;
            }
            game.snake.direction = value;
        },
        addHead: function () {
            let old_head = game.snake.cells[this.cells.length - 1], head;
            switch (game.snake.direction) {
                case 0:
                    head = {x: old_head.x, y: old_head.y - 1, apple: false};
                    break;
                case 1:
                    head = {x: old_head.x + 1, y: old_head.y, apple: false};
                    break;
                case 2:
                    head = {x: old_head.x, y: old_head.y + 1, apple: false};
                    break;
                case 3:
                    head = {x: old_head.x - 1, y: old_head.y, apple: false};
                    break;
            }
            if (game.settings.fieldShape === 2 || game.settings.fieldShape === 3 || game.settings.fieldShape === 5) {
                if (head.x === -1) {
                    head.x = game.settings.width - 1;
                } else if (head.x === game.settings.width) {
                    head.x = 0
                }
            }
            if (game.settings.fieldShape === 2 || game.settings.fieldShape === 4) {
                if (head.y === -1) {
                    head.y = game.settings.height - 1
                } else if (head.y === game.settings.height) {
                    head.y = 0;
                }
            }
            if (game.settings.fieldShape === 5 || game.settings.fieldShape === 6) {
                if (head.y === -1) {
                    head.y = game.settings.height - 1;
                    head.x = game.settings.width - 1 - head.x;
                } else if (head.y === game.settings.height) {
                    head.y = 0;
                    head.x = game.settings.width - 1 - head.x;
                }
            }
            if (game.settings.fieldShape === 6) {
                if (head.x === -1) {
                    head.x = game.settings.width - 1;
                    head.y = game.settings.height - 1 - head.y;
                } else if (head.x === game.settings.width) {
                    head.x = 0;
                    head.y = game.settings.height - 1 - head.y;
                }
            }
            let node = document.querySelector(`#root > .row:nth-child(${head.y + 1}) > .cell:nth-child(${head.x + 1})`);
            if (node !== null) {
                node.classList.add('snake');
            }
            game.snake.prev_direction = game.snake.direction;
            return head;
        },
        show: function () {
            game.snake.cells.forEach((element) => {
                let node = document.querySelector(`#root > .row:nth-child(${element.y + 1}) > .cell:nth-child(${element.x + 1})`);
                if (node !== null) {
                    node.classList.add('snake');
                }
            });
        },
        cutTail: function () {
            if (game.snake.cells[0].apple) {
                game.snake.cells[0].apple = false;
            } else {
                let tail = game.snake.cells.shift(), head = game.snake.cells[game.snake.cells.length - 1];
                if (tail.x !== head.x || tail.y !== head.y) {
                    let node =
                        document.querySelector(`#root > .row:nth-child(${tail.y + 1}) > .cell:nth-child(${tail.x + 1})`);
                    if (node !== null) {
                        node.classList.remove('snake');
                    }
                }
            }
        },
        checkIntersection: function (head, cells) {
            let intersection = false
            cells.forEach(function (element) {
                if (element.x === head.x && element.y === head.y) {
                    intersection = true;
                }
            });
            return intersection;
        }
    },
    apple: {
        x: null,
        y: null,
        init: function () {
            do {
                game.apple.x = Math.floor(Math.random() * (game.settings.width));
                game.apple.y = Math.floor(Math.random() * (game.settings.height));
                if (!game.snake.checkIntersection(game.apple, game.snake.cells)) {
                    break;
                }
            } while (true)
            game.apple.show()
        },
        show: function () {
            let node = document.querySelector(`#root > .row:nth-child(${game.apple.y + 1}) > .cell:nth-child(${game.apple.x + 1})`);
            if (node !== null) {
                node.classList.add('apple');
            }
        },
        hide: function () {
            let node = document.querySelector(`#root > .row:nth-child(${game.apple.y + 1}) > .cell:nth-child(${game.apple.x + 1})`);
            if (node !== null) {
                node.classList.remove('apple');
            }
        },
    }
};
(function (element) {
    element.matches = element.matches || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
    element.closest = element.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {
            return null
        } else return this.parentElement.closest(selector)
    };
}(Element.prototype));
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function (callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {

            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}