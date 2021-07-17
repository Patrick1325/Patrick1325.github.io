var get = (q) => document.querySelector(q);

console.log('%cStop! You have violated the Law!', 'font-size: 24px; color:#036bfc;');
console.log('%cPay the court a fine or serve your sentance. (jk)', 'font-size: 18px; color:#036bfc;');

// particle background
particlesJS.load("bg_vid", "assets/json/particles.json");

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
