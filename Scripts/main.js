


// registers

gsap.registerPlugin(ScrollTrigger);
let scroller = scrollama(); // the 'import' is inside the index html file 


// system or page functions

window.onload = function () {
      //window.scrollTo(0, 0); // Scroll to the top-left corner
        // kick things off
        init();
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
/* PRELOAD ITEMS SCENE 2 */
const text_box_s2 = scrolly.querySelectorAll('.main-text-scene-2.animate-text')
/* PRELOAD ITEMS SCENE 3*/
const env3 = scrolly.querySelector('#part-3-env');
const logs = scrolly.querySelectorAll('.log');
const log_labels = scrolly.querySelectorAll('.bar-content')
const axes3 = scrolly.querySelector('.bar-plot');
/* PRELOAD ITEMS SCENE 4 */
const text_box_s4 = scrolly.querySelectorAll('.main-text-scene-4.animate-text')
/* Preload Items Scene 5*/
const leaf = scrolly.querySelector('.leaf-s5');
const scatter = scrolly.querySelector('.scatter-s5');
const bush = scrolly.querySelector('.bush-parallax');
/* preload items scene 6 */
const fire = scrolly.querySelector('.fire-shape');
const fire_text = scrolly.querySelector('.fire-text');
const text_s6 = scrolly.querySelector('.main-text-scene-6');
let textid = 0;

/* items scene 7 */

var map = L.map('map', {
    dragging: false, 
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false, 
    keyboard: false, 
    zoomControl: false

})

map.setView([43.53, 5.45], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var circle = L.circle([43.53, 5.45], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);


function handleStepProgress(response) {
    switch (response.element.id) {
        case 'part-1':
            scene1(response)
            break;
        case 'part-2':
            scene2(response)
            break;
        case 'part-3':
            scene3(response)
            break;
        case 'part-4':
            scene4(response) 
            break;
        case 'part-5':
            scene5(response)
            break;
        case 'part-6':
            scene6(response)
            break;
        case 'part-7':
            scene7(response)
            break;
        default: 
            break;
    }
}

// text content
function scene2(response) {
    const elements = [...text_box_s2];
    if (response.progress > 0.1) {
        elements.forEach(el => {
            el.classList.add("play-fade-in")
        });

    }
    else {
        elements.forEach(el => {
            el.classList.remove('play-fade-in');
        });
    }
}

function scene6(response) {
    
    const text = [
        "",
        "Due to reasons such as food supply and land use, deforestation is often a result of a necessary and often undesired outcome in the development of countries. However, not all of forest land cover loss is within control of just anybody. Natural disasters, such as wildfires, accounted for the largest losses, approaching an estimated 13.875 million hectares, or approximately 46.96% of damage just in the year 2024.",
        "However, not all countries experienced an equal amount of losses with wildfires as the cause. In 2024, of the estimated tree cover loss (in hectares) globally, was over 151 million hectares. Canada, Russia, Brazil, Bolivia, and the United States accounted for a combined "
    ]
    if (response.progress > 0.2) {
        if (textid !== 2) {
            changeText(text, 2);
            setFireText("")
        }
    }
    else if (response.progress > 0.05) {
        if (textid !== 1) {
            changeText(text, 1)
            setFireText("46.96%");
            textid = 1
        }
    }
    else {
        if (textid !== 0) {
            changeText(text, 0)
            setFireText('');
            textid = 0
            
        }
        
    }
}
function setFireText(textTo) {
    setTimeout(() => {
        if (textTo !== "") {
            fire_text.style.backdropFilter = 'invert(90%)';
            fire_text.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
            fire_text.textContent = textTo
        }else{
            fire_text.style.backdropFilter = 'invert(0%)';
            fire_text.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0)';
            fire_text.textContent = '';
        }
    }, 500);

}
function changeText(texts, index) {
    text_s6.style.opacity = '0';
    setTimeout(() => {
        text_s6.textContent = texts[index];
        text_s6.style.opacity = '1';
    }, 300);
}

function scene4(response) {
    const elements = [...text_box_s4]
    if (response.progress > 0.1) {
        elements.forEach(el => {
            el.classList.add("play-fade-in")
        });
    }
    else {
        elements.forEach(el => {
            el.classList.remove('play-fade-in');
        })
    }
}

function scene7(response) {
    if (response.progress > 0.4) {
        map.setView([12.53, 14.45], 10);
    }else {
        map.setView([43.53, 5.45], 10);
    }

}


// visualizations
function scene5(response) { 

    if (response.progress < 0.4) {
        leaf.style.left = `${50 + 20 * Math.sin(4 * Math.PI * response.progress)}vw`;
        leaf.style.scale = 1.0;
        bush.style.top = `${140 - 100 * (1- response.progress)}vh`;
    }
    else if (response.progress >= 0.4 && response.progress < 0.6) {
        const t = (response.progress - 0.4) / (0.6 - 0.4)
        leaf.style.scale = `${1 - t}`
        scatter.style.scale = `${t}`
        scatter.style.opacity = `${t}`
        bush.style.setProperty('top', `${140 - 100 * (1 - response.progress)}vh`);
        bush.style.setProperty('left', `${20 - (1 - response.progress) * -50}vw`);

        // IDEA: Maybe include layer-blurred "trees" that acts as parallax effects
    }
    else if (response.progress > 0.6) {
        
    }
    

}

function scene3(response) {
    const elements = [env3, ...logs, ...log_labels];
    const t = (response.progress - 0.3) / (0.5 - 0.3)
    if (Math.sign(t) >0) {
        axes3.style.opacity = t
    }
    if (response.progress > 0.80) {
         if (!logs[2].classList.contains('.start-bar')) {
            logs[2].classList.add('start-bar')
            log_labels[2].classList.add('visible')

        }       
    }
    else if (response.progress > 0.7) {

        if (!logs[1].classList.contains('.start-bar')) {
            logs[1].classList.add('start-bar')
            log_labels[1].classList.add('visible')
        }
    }
    else if (response.progress > 0.5) {

        if (!logs[0].classList.contains('.start-bar')) {
            logs[0].classList.add('start-bar')
            log_labels[0].classList.add('visible')
        }
        
    }
    else if (response.progress > 0.3) {
        elements.forEach(el => {
            if (!el.classList.contains('fallen')) {
                el.classList.add('fallen')
                
            }   
            el.classList.remove('start-bar')
        })


    }
    else if (response.progress > 0.1) {
        elements.forEach(el => {
            if (!el.classList.contains('timber')) {
                
                el.classList.add('timber');
            }
            el.classList.remove('fallen');
        });
    }
    else {
        elements.forEach(el => {
        el.classList.remove('start-bar');
        el.classList.remove('timber');
        el.classList.remove('fallen')
        el.classList.remove('visible')
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



window.addEventListener("resize", () => {
    scroller = scrollama();
    init();
});