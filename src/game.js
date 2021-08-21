// import { samples, play, convertNoteToFreq, LENGTHS } from './airportmusic'

const WIDTH = 1200
const HEIGHT = 675

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
        this.state = LEVELSELECT
    }
    start ()  {

        /* samples.forEach((sample, index) =>
            setupLoop(sample, index)
        ) */
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
        /* ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, WIDTH, HEIGHT) */
    }

    levelSelect (ctx) {

        ctx.drawImage(this.imgs[0], 75, 0)
        ctx.drawImage(this.imgs[1], 0, 0)

        /* ctx.fillStyle = 'green';
        ctx.fillRect(100, 100, 600, 400)

        ctx.fillStyle = 'green';
        ctx.fillRect(900, 10, 290, 655) */
    }
}

export default Game