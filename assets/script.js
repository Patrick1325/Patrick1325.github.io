var get = q => document.querySelector(q); 

// particle background
particlesJS.load('bg_vid', 'assets/json/particles.json');

// schlechter code von mir
var c = "";
var co = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a"
];
addEventListener("keydown", e => {
  if (e.key.toLowerCase() == co[c.length]) {
    c = c + 1;
    if (c.length == 10) {
        console.log("should do something");
        var stuff = get("#stuff"), main = get("#main");
      stuff.style.webkitAnimationPlayState = "running";
      main.style.webkitAnimationPlayState = "running";
      stuff.style.animationPlayState = "running";
      main.style.animationPlayState = "running";
      stuff.style.animationName = "secret";
      main.style.animationName = "secret";
      get("#secret").style.transform = "translateX(0px) translateY(-200px)"
      get("#secret").style.display = "block";
    }
  } else c = "";
});

