


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
const plot_treemap = scrolly.querySelector('#scene-4-treemap');
/* Preload Items Scene 5*/
const leaf = scrolly.querySelector('.leaf-s5');
const scatter = scrolly.querySelector('.scatter-s5');
const bush = scrolly.querySelector('.bush-parallax');
/* preload items scene 6 */
const fire = scrolly.querySelector('.fire-shape');
const fire_text = scrolly.querySelector('.fire-text');
const text_s6 = scrolly.querySelector('.main-text-scene-6');
const plot_s6 = scrolly.querySelector('.quadrants-s6');
const static_plot_s6 = scrolly.querySelector('#scene6-static');

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

var markerGroupCurrent = L.layerGroup().addTo(map)

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
        "Due to reasons such as food supply and land use, deforestation is often a result of a necessary and often undesired outcome in the development of countries. However, not all of forest land cover loss is within control of just anybody. Natural disasters, such as wildfires, accounted for the largest losses, approaching an estimated 13.875 million hectares, or approximately 46.96% of damage just in the year 2024, according to the Global Forest Watch.",
        "However, not all countries experienced an equal amount of losses with wildfires as the cause. In 2024, of the estimated tree cover loss (in hectares) globally, was over 13.8 million hectares. Canada, Russia, Brazil, Bolivia, and the United States accounted for a combined 91.75% of all wildfire loss in the world; over 12.3 million hectares of tree cover. This does seemingly have a deep impact on the overall carbon dioxide emissions by country as well.",
        "From the plot adjacent, it can be seen that the countries with the highest area affected by wildfires tends to emit the most amount of carbon dioxide as well. Brazil appears to have emit the highest amount of carbon dioxide, while similarly having the higher percentage of burned area."
    ]
    
    let targetId;
    if (response.progress > 0.6) {
        targetId = 3;
    }
    else if (response.progress > 0.3) {
        targetId = 2;
    }
    else if (response.progress > 0.05) {
        targetId = 1;
    }
    else {
        targetId = 0;

    }

    if (targetId !== textid) {
        textid= targetId
        changeText(text, targetId);
        if (targetId === 3) {
            setFireText("");
            fire.style.scale = '0.0';
            fire.style.shapeOutside = 'circle(0%)';
            static_plot_s6.style.visibility = 'visible'
            static_plot_s6.style.shapeOutside = 'circle(50%)';
            static_plot_s6.style.opacity = '1.0';
            transitionToBottom();
        } else if (targetId === 2) {
            fire.style.scale = '1.0';
            fire.style.shapeOutside = 'circle(50%)';
            static_plot_s6.style.visibility = 'hidden'
            static_plot_s6.style.shapeOutside = 'circle(0%)';
            static_plot_s6.style.opacity = '0.0';
            setFireText("138m hA");
        } else if (targetId === 1) {
            fire.style.scale = '1.0';
            fire.style.shapeOutside = 'circle(50%)';
            static_plot_s6.style.visibility = 'hidden'
            static_plot_s6.style.shapeOutside = 'circle(0%)';
            static_plot_s6.style.opacity = '0.0';
            setFireText("46.96%");
        } else {
            fire.style.scale = '1.0';
            fire.style.shapeOutside = 'circle(50%)';
            static_plot_s6.style.visibility = 'hidden'
            static_plot_s6.style.opacity = '0.0';
            static_plot_s6.style.shapeOutside = 'circle(0%)';
            setFireText('');
        }
    }

}
function transitionToBottom() {
    plot_s6.style.scale = '1.0';
    plot_s6.style.opacity = '1.0'
}

function setFireText(textTo) {


    if (!textTo) {
        fire_text.style.opacity = '0';
        fire_text.textContent = '';
        return;
    }

    fire_text.textContent = textTo;


    void fire_text.offsetHeight;
    fire_text.style.opacity = '1';


}

function changeText(texts, index) {
    text_s6.style.opacity = '0';
    setTimeout(() => {
        text_s6.textContent = texts[index];
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                text_s6.style.opacity = '1';
            });
        });
    }, 300);
}

function scene4(response) {
    const elements = [...text_box_s4, plot_treemap]
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
    
    if (response.progress > 0.8) {
        resetMarkingsAll();
        map.setView([0, 0], 3)

        let coords = [
            [-10.235, -54.209],
            [-0.0236, 33.9],
            [24.4, 85.25],
            [35.4881, 114.404]
        ]
        for (let i = 0; i < coords.length; i++) {
            L.circle([coords[i][0], coords[i][1]], 1100000, {
            color: 'green',
            fillColor: 'rgba(133, 185, 136, 1)',
            fillOpacity: 0.1
        }).addTo(markerGroupCurrent)
        }
    }
    else if (response.progress > 0.5) {
        resetMarkingsAll();
        map.setView([-25.2744, 133.7751], 5);

        let coords = [
            [-34.55, 138.35],
            [-35.3, 149.1],
            [-33.87, 151.20],
            [-28, 152]
        ]
        for (let i = 0; i < coords.length; i++) {
            L.circle([coords[i][0], coords[i][1]], 300000, {
            color: 'green',
            fillColor: 'rgba(133, 185, 136, 1)',
            fillOpacity: 0.1
        }).addTo(markerGroupCurrent)
        }
        

    }else if (response.progress > 0.05) {
        resetMarkingsAll();
        
        map.setView([-30.2744, 153.7751], 6);
        
        L.circle([-32.55, 149.46], 300000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1
        }).addTo(markerGroupCurrent).bindPopup("New South Wales")

        L.circle([-27.5, 151.46], 250000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1
        }).addTo(markerGroupCurrent).bindPopup("Brisbane")
    } else{
        resetMarkingsAll();
    }

}

function resetMarkingsAll() {
    markerGroupCurrent.clearLayers();
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