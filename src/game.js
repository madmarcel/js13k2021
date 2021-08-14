const WIDTH = 1200
const HEIGHT = 675

const TITLE = 0
const LEVELSELECT = 1
const LEVEL = 2

class Game {

    constructor() {
        this.state = LEVELSELECT
    }
    start ()  {

    }

    update () {

    }

    render (ctx) {
        switch(this.state) {
            case TITLE:
                return this.titlescreen(ctx)
            case LEVELSELECT:
                return this.levelSelect(ctx)
            case LEVEL:
                // nothing yet
        }
    }

    titlescreen (ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
    }

    levelSelect (ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(100, 100, 600, 400)

        ctx.fillStyle = 'green';
        ctx.fillRect(900, 10, 290, 655)
    }
}

export default Game