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