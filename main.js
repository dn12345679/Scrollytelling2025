import scrollama from "scrollama";
import { inView } from "in-view";
import { Waypoints } from "waypoints"



var waypoint = new Waypoint({
  element: document.getElementById('test-component-2'),
  handler: function(direction) {
    alert('You have scrolled to a thing')
  }
})