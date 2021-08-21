// import { samples, play, convertNoteToFreq, LENGTHS } from './airportmusic'

const WIDTH = 657
const HEIGHT = 1200

const TITLE = 0
const LEVELSELECT = 1
const LEVEL = 2

/* const setupLoop = (sample, index) => {
    let initialDelay = sample.delay

    const schedule = (delay, note, length) => {
        setTimeout(() => {
            play(note, length)
        }, delay)
    }

    const scheduleSample = (delay, sample) => {
        let offset = 0
        let arp = 1
        // play the note
        sample.notes.forEach(note => {
            if (note === 'ARP') {
                arp = 10
            } else {
                const bits = note.split(/(-?\d)/)
                const n = convertNoteToFreq(bits[0], bits[1])
                // precalc all the delays and offset
                schedule(delay + offset, n, LENGTHS[bits[2]])
                offset += (LENGTHS[bits[2]] * 1000 / arp) + 10
            }
        })
        setTimeout(() => {
            console.log(index)
            scheduleSample(0, sample)
        }, sample.length + delay)
    }

    scheduleSample(initialDelay, sample)
} */

class Game {

    constructor(imgs) {
        this.imgs = imgs
        this.state = LEVEL

        this.bgx = 0
        this.bgy = 0
        this.bgdir = -1
        this.bgydir = -1
    }
    start ()  {

        /* samples.forEach((sample, index) =>
            setupLoop(sample, index)
        ) */
    }

    updateGame() {
        if (this.bgdir < 0) {
            this.bgx -= 0.1
        } else {
            this.bgx += 0.1
        }
        if (this.bgx < -13) {
            this.bgdir = 1
        }
        if (this.bgx > 15) {
            this.bgdir = -1
        }

        if (this.bgydir < 0) {
            this.bgy -= 0.1
        } else {
            this.bgy += 0.1
        }
        if (this.bgy < -5) {
            this.bgydir = 1
        }
        if (this.bgy > 5) {
            this.bgydir = -1
        }
        // this.bgy = new Date&1 // random boolean
        // this.bgy = (new Date%3) random int between 0 and  < 3
    }

    update () {
        switch(this.state) {
            case TITLE:

            case LEVELSELECT:

            case LEVEL:
                // nothing yet
                this.updateGame()
        }
    }

    render (ctx) {
        switch(this.state) {
            case TITLE:
                return this.titlescreen(ctx)
            case LEVELSELECT:
                //return this.levelSelect(ctx)
            case LEVEL:
                // nothing yet
                return this.drawGame(ctx)
        }
    }

    titlescreen (ctx) {
        /* ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, WIDTH, HEIGHT) */
    }

    levelSelect (ctx) {



        /* ctx.fillStyle = 'green';
        ctx.fillRect(100, 100, 600, 400)

        ctx.fillStyle = 'green';
        ctx.fillRect(900, 10, 290, 655) */
    }

    rect(ctx, x, y, w, h, c) {
        ctx.fillStyle = c
        ctx.fillRect(x, y, w, h);
    }

    drawTrain(ctx) {
        this.rect(ctx, 250, 100, 200, 200, '#fff')
        ctx.drawImage(this.imgs[0], 75 + this.bgx, 0 + this.bgy)
        ctx.drawImage(this.imgs[1], 0, 0)
    }

    drawGame(ctx) {
        this.drawTrain(ctx)
    }
}

export default Game