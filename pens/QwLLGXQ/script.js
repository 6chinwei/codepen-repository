// utilities
import {
  clamp,
  onMouseMove,
  onWindowResize
} from "https://codepen.io/6chinwei/pen/XJrrpKw.js";

let maxWidth = document.documentElement.offsetWidth;
let maxHeight = document.documentElement.offsetHeight;

onMouseMove((mouseX, mouseY) => {  
  const deg = Math.atan2(mouseY - maxHeight/2, mouseX - maxWidth/2) * 180 / Math.PI;

  document.documentElement.style.setProperty("--rotate", `${deg}deg`);
});

onWindowResize((width, height) => {
  maxWidth = width;
  maxHeight = height;
});
