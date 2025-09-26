//const scrollama = require("scrollama");


window.addEventListener('DOMContentLoaded', () => {
    var waypoint = new Waypoint({
    element: document.getElementById('test-component-2'),
    handler: function(direction) {
        console.log("hello")
    }
    })
});