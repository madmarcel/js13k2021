import "./style.css";

(function() {
    // start game when page has finished loading
    window.addEventListener('load', function() {
        const swipe = document.getElementById('choicepic')

        let isDragging = false;
        let t = null
        let startX = 0;

        const copyTouch = ({ identifier, pageX, pageY }) => {
            return { identifier, pageX, pageY }
        }

        swipe.addEventListener('touchstart', e => {
            e.preventDefault();
            isDragging = true;
            const touches = e.changedTouches;
            t = copyTouch(touches[0])
            // console.log('start', t.pageX, t.pageY)
            startX = t.pageX
        })

        swipe.addEventListener('touchmove', e => {
            if (isDragging) {
                // console.log(e.changedTouches)
                let l = e.changedTouches.length - 1;

                let temp = copyTouch(e.changedTouches[0])

                if (temp.pageX !== t.pageX) {
                    t = temp;
                    //console.log('move', t.pageX, t.pageY)

                    const diff = (startX - t.pageX) * -1

                    swipe.style.left = `${diff}px`
                    swipe.style.top = `${Math.abs(diff / 2)}px`

                    let w = swipe.offsetWidth;
                    let r = 0
                    if (diff > 0) {
                        r = (t.pageX) / w * 10;
                    } else {
                        r = (-1 * t.pageX) / w * 10;
                    }
                    swipe.style.transform = "rotate("+ r + "deg)"
                }
            }
        })

        swipe.addEventListener('touchend', e => {
            // console.log('end')
            isDragging = false;
            t = null;
            swipe.style.left = `0px`
            swipe.style.top = `0px`
            swipe.style.transform = "rotate(0deg)"
        })

        swipe.addEventListener('touchcancel', e => {
            // console.log('cancel')
            isDragging = false;
            t = null;
            swipe.style.left = `0px`
            swipe.style.top = `0px`
            swipe.style.transform = "rotate(0deg)"
        })

    })
})()
