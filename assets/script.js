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
