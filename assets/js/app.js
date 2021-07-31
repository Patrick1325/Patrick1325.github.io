/* global particlesJS, fetch */

const get = q => document.querySelector(q)

console.log('%cStop! You have violated the Law!', 'font-size: 24px; color:#036bfc;')
console.log('%cPay the court a fine or serve your sentance.', 'font-size: 18px; color:#036bfc;')

// particle background
particlesJS.load('bg', 'assets/json/particles.json')

// repos
const languageIcon = {
  java: '☕',
  python: '🐍',
  html: '📰',
  'c#': '💠',
  javascript: '☕'
};
(async () => {
  const stuffRef = get('#stuff')

  const data = await fetch(
    'https://api.github.com/users/zImPatrick/repos',
    {
      cache: 'no-cache'
    }).then((resp) => resp.json())

  const reposToShow = []
  const forbiddenNumbers = []
  const maxToShow = 4
  while (reposToShow.length < maxToShow) {
    const number = Math.floor(Math.random() * Math.floor(data.length))
    const randomRepo = data[number]
    if (!forbiddenNumbers.includes(number) && !randomRepo.archived && randomRepo.description != null) {
      reposToShow.push(randomRepo)
      forbiddenNumbers.push(number)
    }
  }
  reposToShow.forEach((rep) => {
    stuffRef.innerHTML += `<div class="block">
<a href="${rep.html_url}">
    <b>${rep.name}</b>
</a><br>
${rep.description}<br>
${languageIcon[rep.language.toLowerCase()] || '❓'} ${rep.language}
</div>`
  })
})()
