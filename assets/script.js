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

const getUrlFromCobalt = async (url) => { // <3 cobalt
  const data = await fetch("https://api.cobalt.tools/api/json", {
    method: "POST",
    body: JSON.stringify({
      aFormat: "mp3",
      isAudioOnly: true,
      url
    }),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }).then(r => r.json());
  return data.url;
}

(async () => {
  const audio = document.createElement("audio");
  const img = document.querySelector("#playImg");
  const details = document.querySelector("#songDetails");
  let isPlaying = false;
  const np = await fetch("https://patriick.dev/_papi/np").then(r => r.json());
  document.querySelector("#player").classList.add("shown");
  let lastTrackId = np.youtubeId;
  details.innerHTML = `<a href="${np.url}" target="_blank" rel="noreferrer"><b>${np.name}</b><br>${np.artist["#text"]}</a>`
  document.querySelector("#playLink").addEventListener('click', async () => {
    isPlaying = !isPlaying;
    if (!isPlaying) {
      img.src = "/assets/icons/player-play.svg";
      audio.pause();
    } else {
      img.src = "/assets/icons/player-pause.svg";
      if (audio.src == "") {
        let url = await getUrlFromCobalt("https://youtube.com/watch?v=" + lastTrackId);
        if (!url) {
          details.innerHTML = `<b>oops</b><br>ein fehler ist aufgetreten`;
        }
        audio.src = url;
      }
      audio.play();
    }
  });
})();