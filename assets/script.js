//#region Scroll-Feature
const sections = ["home", "projekte", "music"].map((e) => document.querySelector(`#${e}`));

const onShowHandlers = {}


let currentCardIdx = window.location.hash
  ? sections.indexOf(document.querySelector(window.location.hash)) || 0
  : 0;
let lastScroll = Date.now();

document.addEventListener(
  "wheel",
  (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (lastScroll + 350 > Date.now()) return;

    let isUp = ev.deltaY < 0;
    let newIndex = currentCardIdx + (isUp ? -1 : 1);
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > sections.length - 1) {
      newIndex = sections.length - 1;
    }
    if (newIndex === currentCardIdx) return;
    lastScroll = Date.now();

    let section = sections[newIndex];
    window.history.pushState(null, null, "#" + section.id);
    currentCardIdx = newIndex;

    onShowHandlers?.[section.id]?.(!section.classList.contains("anim"));
    if (!section.classList.contains("anim")) section.classList.add("anim");

    section.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  },
  { passive: false }
);

//#endregion

// Firefox workarounds
if (navigator.userAgent.includes("Firefox")) {
  document.body.style.overflow = "hidden"; // kein scrollen möglich

  // Warnung in Konsole anzeigen
  console.log("%cDu verwendest anscheinend Firefox", "font-size:32px;");
  console.log(
    "%cFirefox ist nicht wirklich 'kompatibel' mit dem Scroll-Feature dieser Website.",
    "font-size:18px;"
  );
  console.log(
    "%cWenn du Probleme hast, kontaktiere mich und ich probiere diese zu beheben.",
    "font-size:18px;"
  );
}

// Weil SerenityOS und Ladybird interessant sind
if (navigator.userAgent.includes("Ladybird")) {
  console.log("👋 hi ladybird user")
  document.querySelector('.entrycard').style.display = "none";
}

// Discord detecten und mit URL-Protocol launchen
// (ich wünschte wir könnten in JS einfach URL-Protocols detecten)
document.querySelector('.icon.discord').addEventListener('click', e => {
  let timeout = setTimeout(() => {
    window.location = e.target.href;
  }, 250)
  window.addEventListener('blur', () => clearTimeout(timeout), { once: true });

  window.location = 'discord://-/users/137228543045140480';
  e.preventDefault();
});

onShowHandlers.music = async (firstTime) => {
  if (!firstTime) return;

  let data = await fetch("https://zimpatrick.gq/_papi/lastfm")
    .then(r => r.json());

  let last5Tracks = data.recenttracks.track.splice(0,5);

  document.querySelector('#music > #musiclist').innerHTML = last5Tracks.map(track => {
    let image = track.image.find(e => e.size === "large");

    return /*html*/`
      <div class="track">
        <a href="${track.url}" class="trackImage">
          <img src="${image["#text"]}">
        </a>
        <div class="text">
          <h2>${track.name}</h2>
          <span>${track.artist["#text"]}</span><br>
          ${track?.date?.uts ? /*html*/`<span class="time">${new Date(track.date.uts * 1000).toLocaleTimeString('de-at', { hour: '2-digit', minute: '2-digit' })}</span>` : ""}
        </div>
      </div>
    `
  }).join("")
}

onShowHandlers?.[sections[currentCardIdx].id]?.(true);
sections[currentCardIdx]?.classList.add('anim');