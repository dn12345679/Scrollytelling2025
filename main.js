import { gsap } from "./node_modules/gsap/all.js";
import { ScrollTrigger } from "./node_modules/gsap/ScrollTrigger.js";

// registers

gsap.registerPlugin(ScrollTrigger);
const scroller = scrollama();


// system or page functions

window.onload = function () {
      window.scrollTo(0, 0); // Scroll to the top-left corner
    };

// create objects once the DOM loads everything for safety
window.addEventListener('DOMContentLoaded', () => {});



var scrolly = document.querySelector('.main-section');
var step = scrolly.querySelectorAll(".step");

function handleStepProgress(response) {
    
    switch (response.element.id) {
        case 'part-1':
            scene1(response)
    }
}


function scene1(response) {
    var env = scrolly.querySelector('#part-1-env');
    var tree = scrolly.querySelector('.tree');
    var ground = scrolly.querySelector('.ground');
    if (response.progress > 0.1) {
        env.classList.add('shift-right')
        tree.classList.add('shift-right')
        ground.classList.add('shift-right')
    }
    else {
        env.classList.remove('shift-right')
        tree.classList.remove   ('shift-right')
        ground.classList.remove('shift-right')
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
