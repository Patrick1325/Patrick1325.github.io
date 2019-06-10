function updateFollower() {
    fetch('https://plus.zimpatrick.gq/zimnew/follower')
    .then(resp=>resp.text())
    .then(text=>document.getElementById('follower_count').innerHTML=text);
}
function updateSubcount() {
    fetch('https://plus.zimpatrick.gq/zimnew/abos')
    .then(resp=>resp.text())
    .then(text=>document.getElementById('sub_count').innerHTML=text);
}

updateFollower();
updateSubcount();