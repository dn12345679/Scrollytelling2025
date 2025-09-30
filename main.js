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
window.addEventListener('DOMContentLoaded', () => {

    

});



var scrolly = document.querySelector('.main-section');
var step = scrolly.querySelectorAll(".step");

function handleStepProgress(response) {
    const iceberg = document.querySelector('#part-1-env');
    const stepHeight = response.element.offsetHeight;
    const moveX = stepHeight * 0.2 * response.progress; 
    //iceberg.style.transform = `translateX(${moveX}px)`;

    const melting = iceberg.querySelector('#melting-iceberg');
    let rotX = Math.sin(32 * Math.PI * response.progress)
    console.log(rotX * 50)
    melting.style.transform = `rotate(${rotX * 4}deg)`;
    console.log(melting.style.transform)

    if (response.progress > 0.5) {
        const penguins = iceberg.querySelectorAll('.penguin');
        for (let i = 0; i < penguins.length; i++) {
            penguins[i].style.transform = 'scaleX(1)'
            penguins[i].src = './Assets/Penguin_shock.png'
        }
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

