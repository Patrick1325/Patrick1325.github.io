// init stuff
var term;
var me = false;
window.onload = start;
window.onkeydown = key;
async function start() {
    if(!term) term = document.getElementById('terminal');
    
    //interface
    term.innerHTML += "imBios ALPHA<br>";
    document.title = "imBios";
    
    await wait(5e2);
    term.innerHTML += `${window.screen.width}x${window.screen.height} Resolution<br><br>`

    await wait(3e2);
    term.innerHTML += "loading menu"
    var adddot = () => term.innerHTML += "."
    await wait(3e2).then(()=>adddot());
    await wait(3e2).then(()=>adddot());
    await wait(3e2).then(()=>adddot());
    
    await wait(1e3);
    term.innerHTML = "";
    menu();
}
async function menu() {
    var pointer = document.getElementById('pointer');
    await wait(5e2);
    me = true;
    pointer.style.display = "block";
    term.innerHTML = 
    "GUI<br>"+
    "Twitter<br>"+
    "YouTube<br>"+
    "<br>you found an easteregg. congratulations!"
    term.style.left = "26px";
}
var times = 1;
function key(e) {
    if(!me) return;
    switch(e.keyCode) {
        case 40:
            times++;
            set();
            break;
        case 38:
            times--;
            set();
            break;
        case 13:
            switch(times) {
                case 1:
                    window.location.href = "https://zimpatrick.gq"
                    break;
                case 2:
                    window.location.href = "https://twitter.com/zImPatrick_"
                    break;
                case 3:
                    window.location.href = "https://youtube.com/Patrick1325"
                    break;
            }
            break;
    }
}

// helper
async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

function set() {
    switch(times) {
        case 1:
            document.getElementById('pointer').style.top = `13px`
            break;
        case 2:
            document.getElementById('pointer').style.top = `28px`
            break;
        case 3:
            document.getElementById('pointer').style.top = `42px`
            break;
        default:
            if(times > 2) times = 3;
            else times = 1;
    }
}