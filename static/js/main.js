;(function () {
    const win = window
    const doc = document.documentElement

    doc.classList.remove('no-js')
    doc.classList.add('js')

    // Reveal animations
    if (document.body.classList.contains('has-animations')) {
        /* global ScrollReveal */
        const sr = (window.sr = ScrollReveal())

        sr.reveal('.feature', {
            duration: 600,
            distance: '20px',
            easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
            origin: 'right',
            interval: 100,
        })

        sr.reveal('.media-canvas', {
            duration: 600,
            scale: '.95',
            easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
            viewFactor: 0.5,
        })
    }

    // Wait that device mockup has loaded before displaying
    const deviceMockup = document.querySelector('.device-mockup')

    function deviceMockupLoaded() {
        deviceMockup.classList.add('has-loaded')
    }

    if (deviceMockup.complete) {
        deviceMockupLoaded()
    } else {
        deviceMockup.addEventListener('load', deviceMockupLoaded)
    }

    // Features title adjustment
    const featuresSection = document.querySelector('.features')
    const featuresTitle = featuresSection.querySelector('.section-title')
    const firstFeature = document.querySelector('.feature-inner')

    featuresTitlePos()
    win.addEventListener('resize', featuresTitlePos)

    function featuresTitlePos() {
        let featuresSectionLeft = featuresSection
            .querySelector('.features-inner')
            .getBoundingClientRect().left
        let firstFeatureLeft = firstFeature.getBoundingClientRect().left
        let featuresTitleOffset = parseInt(
            firstFeatureLeft - featuresSectionLeft
        )
        if (firstFeatureLeft > featuresSectionLeft) {
            featuresTitle.style.marginLeft = `${featuresTitleOffset}px`
        } else {
            featuresTitle.style.marginLeft = 0
        }
    }

    // Moving objects
    const movingObjects = document.querySelectorAll('.is-moving-object')

    // Throttling
    function throttle(func, milliseconds) {
        let lastEventTimestamp = null
        let limit = milliseconds

        return (...args) => {
            let now = Date.now()

            if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
                lastEventTimestamp = now
                func.apply(this, args)
            }
        }
    }

    // Init vars
    let mouseX = 0
    let mouseY = 0
    let scrollY = 0
    let coordinateX = 0
    let coordinateY = 0
    let winW = doc.clientWidth
    let winH = doc.clientHeight

    // Move Objects
    function moveObjects(e, object) {
        mouseX = e.pageX
        mouseY = e.pageY
        scrollY = win.scrollY
        coordinateX = winW / 2 - mouseX
        coordinateY = winH / 2 - (mouseY - scrollY)

        for (let i = 0; i < object.length; i++) {
            const translatingFactor =
                object[i].getAttribute('data-translating-factor') || 20
            const rotatingFactor =
                object[i].getAttribute('data-rotating-factor') || 20
            const perspective =
                object[i].getAttribute('data-perspective') || 500
            let tranformProperty = []

            if (object[i].classList.contains('is-translating')) {
                tranformProperty.push(
                    'translate(' +
                        coordinateX / translatingFactor +
                        'px, ' +
                        coordinateY / translatingFactor +
                        'px)'
                )
            }

            if (object[i].classList.contains('is-rotating')) {
                tranformProperty.push(
                    'perspective(' +
                        perspective +
                        'px) rotateY(' +
                        -coordinateX / rotatingFactor +
                        'deg) rotateX(' +
                        coordinateY / rotatingFactor +
                        'deg)'
                )
            }

            if (
                object[i].classList.contains('is-translating') ||
                object[i].classList.contains('is-rotating')
            ) {
                tranformProperty = tranformProperty.join(' ')

                object[i].style.transform = tranformProperty
                object[i].style.transition = 'transform 1s ease-out'
                object[i].style.transformStyle = 'preserve-3d'
                object[i].style.backfaceVisibility = 'hidden'
            }
        }
    }

    // Call function with throttling
    if (movingObjects) {
        win.addEventListener(
            'mousemove',
            throttle(function (e) {
                moveObjects(e, movingObjects)
            }, 150)
        )
    }
})()

/*

  using 
    - an animated gif of sparkles.
    - an animated gradient as a holo effect.
    - color-dodge mix blend mode
  
*/
var x
var $cards = $('.card')
var $style = $('.hover')

$cards
    .on('mousemove touchmove', function (e) {
        // normalise touch/mouse
        var pos = [e.offsetX, e.offsetY]
        e.preventDefault()
        if (e.type === 'touchmove') {
            pos = [e.touches[0].clientX, e.touches[0].clientY]
        }
        var $card = $(this)
        // math for mouse position
        var l = pos[0]
        var t = pos[1]
        var h = $card.height()
        var w = $card.width()
        var px = Math.abs(Math.floor((100 / w) * l) - 100)
        var py = Math.abs(Math.floor((100 / h) * t) - 100)
        var pa = 50 - px + (50 - py)
        // math for gradient / background positions
        var lp = 50 + (px - 50) / 1.5
        var tp = 50 + (py - 50) / 1.5
        var px_spark = 50 + (px - 50) / 7
        var py_spark = 50 + (py - 50) / 7
        var p_opc = 20 + Math.abs(pa) * 1.5
        var ty = ((tp - 50) / 2) * -1
        var tx = ((lp - 50) / 1.5) * 0.5
        // css to apply for active card
        var grad_pos = `background-position: ${lp}% ${tp}%;`
        var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
        var opc = `opacity: ${p_opc / 100};`
        var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
        // need to use a <style> tag for psuedo elements
        var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `
        // set / apply css class and style
        $cards.removeClass('active')
        $card.removeClass('animated')
        $card.attr('style', tf)
        $style.html(style)
        if (e.type === 'touchmove') {
            return false
        }
        clearTimeout(x)
    })
    .on('mouseout touchend touchcancel', function () {
        // remove css, apply custom animation on end
        var $card = $(this)
        $style.html('')
        $card.removeAttr('style')
        x = setTimeout(function () {
            $card.addClass('animated')
        }, 2500)
    })
