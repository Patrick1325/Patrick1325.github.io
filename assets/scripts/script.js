var get = (q) => document.querySelector(q);

console.log('%cStop! You have violated the Law!', 'font-size: 24px; color:#036bfc;');
console.log('%cPay the court a fine or serve your sentance. (jk)', 'font-size: 18px; color:#036bfc;');

// particle background
particlesJS.load("bg_vid", "assets/json/particles.json");

// schlechter code von mir (was das für müll code)
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
  "a",
];
addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() == co[c.length]) {
    c = c + 1;
    if (c.length == 10) {
      var stuff = get("#stuff"),
        main = get("#main");
      stuff.style.webkitAnimationPlayState = "running";
      main.style.webkitAnimationPlayState = "running";
      stuff.style.animationPlayState = "running";
      main.style.animationPlayState = "running";
      stuff.style.animationName = "secret";
      main.style.animationName = "secret";

      get("#secret").style.transform = "translateX(0px) translateY(-200px)";
      get("#secret").style.display = "block";

      // secret game

      (async () => {
        var script = document.createElement('script');
        script.src = "/assets/scripts/g.js?"+Math.random();

        document.head.appendChild(script);
      })();
    }
  } else c = "";
});

// repos
var languageIcon = {
  java: "☕",
  python: "🐍",
  html: "📰",
  "c#": "💠",
  javascript: "☕",
};
(async () => {
  var stuffRef = get("#stuff");

  var data = await fetch(
    "https://api.github.com/users/zImPatrick/repos",
  {
    cache: "no-cache"
  }).then((resp) => resp.json());

  var reposToShow = [];
  var forbiddenNumbers = [];
  var maxToShow = 4;
  while (reposToShow.length < maxToShow) {
    var number = Math.floor(Math.random() * Math.floor(data.length));
    var randomRepo = data[number];
    if (!forbiddenNumbers.includes(number) && !randomRepo.archived && randomRepo.description != null) {
      reposToShow.push(randomRepo);
      forbiddenNumbers.push(number);
    }
      
  }
  reposToShow.forEach((rep) => {
    stuffRef.innerHTML += `<div class="block">
<a href="${rep.html_url}">
    <b>${rep.name}</b>
</a><br>
${rep.description}<br>
${languageIcon[rep.language.toLowerCase()] || "❓"} ${rep.language}
</div>`;
  });
})();
