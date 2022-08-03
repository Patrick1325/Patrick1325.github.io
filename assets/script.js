//#region Scroll-Feature
let sections = ["home", "projekte"].map((e) => document.querySelector(`#${e}`));

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
    lastScroll = Date.now();

    let isUp = ev.deltaY < 0;
    let newIndex = isUp ? -1 : 1;
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > sections.length - 1) {
      newIndex = sections.length - 1;
    }

    let section = sections[newIndex];
    window.history.pushState(null, null, "#" + section.id);
    currentCardIdx = newIndex;

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