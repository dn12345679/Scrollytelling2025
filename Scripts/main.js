
import { gsap } from "../node_modules/gsap/all.js";
import { ScrollTrigger } from "../node_modules/gsap/ScrollTrigger.js";

// registers

gsap.registerPlugin(ScrollTrigger);
let scroller = scrollama(); // the 'import' is inside the index html file 


// system or page functions

window.onload = function () {
      //window.scrollTo(0, 0); // Scroll to the top-left corner
    };


var scrolly = document.querySelector('.main-section');
var step = scrolly.querySelectorAll(".step");

/* PRELOAD ITEMS SCENE 1*/ 
const env = scrolly.querySelector('#part-1-env');
const tree = scrolly.querySelector('.tree');
const tree2 = scrolly.querySelector('.tree_2');
const tree3 = scrolly.querySelector('.tree_3');
const ground = scrolly.querySelector('.ground');
const s1text = scrolly.querySelector('#scene-1-text');
const co2 = scrolly.querySelector('.animated-co2-particle');
const o2 = scrolly.querySelector('.animated-o2-particle');
const intro_text = scrolly.querySelector('#intro-text-pin');
/* PRELOAD ITEMS SCENE 3*/
const env3 = scrolly.querySelector('#part-3-env');
const logs = scrolly.querySelectorAll('.log');


function handleStepProgress(response) {
    console.log(response.progress)
    switch (response.element.id) {
        case 'part-1':
            scene1(response)
        case 'part-3':
            scene3(response)
        default: 
            break;
    }
}

function scene3(response) {
    const elements = [env3, ...logs];
    if (response.progress > 0.3) {
        elements.forEach(el => {
            if (!el.classList.contains('fallen')) {
                el.classList.add('fallen')
            }
        })
    }
    else if (response.progress > 0.1) {
        elements.forEach(el => {
        if (!el.classList.contains('timber')) {
            el.classList.remove('fallen')
            el.classList.add('timber');
        }
        });
    }
    else {
        elements.forEach(el => {
            
        el.classList.remove('timber');
        el.classList.remove('fallen')
    });
    }
}

function scene1(response) {
    const elements = [env, tree, ground, s1text, tree2, tree3];
    if (response.progress > 0.9) {
        elements.forEach(el => {
        if (!el.classList.contains('shift-right')) {
            el.classList.remove('shift-up');
            el.classList.add('shift-right');
        }
        });
        co2.classList.remove('animate-particle-conversion')
        o2.classList.remove('animate-particle-conversion')
    }
    
    else if (response.progress > 0.6) {
        elements.forEach(el => {
            if (!el.classList.contains('shift-up')) {
                el.classList.remove('shift-right');
                el.classList.add('shift-up');
            }
        });
        co2.classList.add('animate-particle-conversion')
        o2.classList.add('animate-particle-conversion')
    } 

    else if (response.progress > 0.1) {
        elements.forEach(el => {
        if (!el.classList.contains('shift-right')) {
            el.classList.remove('shift-up');
            el.classList.add('shift-right');
        }
        });
        co2.classList.remove('animate-particle-conversion')
        o2.classList.remove('animate-particle-conversion')
        intro_text.classList.add('hidden')
    } 
    else {
        elements.forEach(el => {
        el.classList.remove('shift-right', 'shift-up');
        co2.classList.remove('animate-particle-conversion')
        o2.classList.remove('animate-particle-conversion')
        intro_text.classList.remove('hidden')
    });
    }
}





function resize() {
    var min = window.innerHeight * 0.5;
    var h = min + Math.random() * window.innerHeight * 0.25;
    step.style("height", Math.floor(h) + "px");
    scroller.resize();
}   


function init() {
    scroller
        .setup({
            step: ".step",
            progress: true,
            debug: false
        })
        .onStepProgress(handleStepProgress);
}

// kick things off
init();

window.addEventListener("resize", () => {
    scroller = scrollama();
    init();
});