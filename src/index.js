import "./style.css";
import Game from './game.js'

(function() {

    const convertSVGtoImages = (id, width, height) => {
        const SVG = document.getElementById(id)
        const XML = new XMLSerializer().serializeToString(SVG)
        const SVG64 = btoa(XML) //.toString('base64')

        const img = new Image()
        img.height = height
        img.width = width
        img.src = 'data:image/svg+xml;base64,' + SVG64
        return img
    }

    // start game when page has finished loading
    window.addEventListener('load', function() {
        const canvas = document.getElementById('g')
        const ctx = canvas.getContext('2d')
        const WIDTH = 675
        const HEIGHT = 1200

        const imgs = []

        imgs.push(convertSVGtoImages('b', 526, 420))
        imgs.push(convertSVGtoImages('t', 675, 1200))

        const currentState = new Game(imgs)

        // the main loop
        let tick = () => {
            currentState.update()
            ctx.clearRect(0, 0, WIDTH, HEIGHT)
            currentState.render(ctx)
            requestAnimationFrame(tick)
        }

        currentState.start()
        tick()
    })
})()
