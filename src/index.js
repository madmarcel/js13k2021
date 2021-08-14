import "./style.css";
import Game from './game.js'

(function() {
    'use strict'

    // start game when page has finished loading
    window.addEventListener('load', function() {
        const canvas = document.getElementById('g')
        const ctx = canvas.getContext('2d')
        const WIDTH = 1200
        const HEIGHT = 675

        const currentState = new Game()

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
