// gamer (von zimpatrick.gq)
(async () => {
    var gameCanvas = document.querySelector("#game");
    var ctx = gameCanvas.getContext('2d');
    var { width, height } = gameCanvas;
    gameCanvas.tabIndex = 1000;

    function hasHit(box1, box2) {
        var box1Right = box1.x + box1.width
        var box1Bottom = box1.y + box1.height  
        var box2Right = box2.x + box2.width
        var box2Bottom = box2.y + box2.height  
        
        if(box1Right > box2.x && box2Right > box1.x && 
          box1Bottom > box2.y && box2Bottom > box1.y) return true;
        else return false;
      }

    var autoMode = false;
    var score = 0;
    var player = {
        x: random(15, width-15),
        y: random(15, height-15),
        speed: 0.5,
        dx: 0,
        dy: 0,
        width: 15,
        height: 15,
        dead: false
    }
    var scoreThing = {
        x: random(30, width-30),
        y: random(30, height-30),
        width: 10,
        height: 10
    }

    function update(progress) {
        if(autoMode === true) {
            if(player.dead) respawn();

            var tx = scoreThing.x - player.x,
            ty = scoreThing.y - player.y,
            dist = Math.sqrt(tx * tx + ty * ty);
    
            player.dx = (tx / dist) * player.speed;
            player.dy = (ty / dist) * player.speed;
        }
        

        if(!player.dead && player.x + player.width + player.dx * progress < width &&
            player.x + player.dx * progress > 0) player.x += player.dx * progress
        else player.dead = true;
        if(!player.dead && player.y + player.height + player.dy * progress < height &&
            player.y + player.dy * progress > 0) player.y += player.dy * progress
        else player.dead = true;
    
        if(hasHit(player, scoreThing)) {
            scoreThing.x = random(30, width-30)
            scoreThing.y = random(30, height-30)
            score++;
        }
    
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
      }

    function draw(progress) {
        ctx.clearRect(0, 0, width, height)

        ctx.fillStyle = "#aaa";
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height)
        
        ctx.fillStyle = 'red';
        ctx.fillRect(scoreThing.x, scoreThing.y, scoreThing.width, scoreThing.height)
        
        ctx.font = "20px Monospace";
        ctx.fillStyle = 'black';
        ctx.fillText("Score: "+score, (width / 2) - (ctx.measureText("Score: "+score).width / 2), 30)


        if(player.dead) {
            ctx.fillStyle = 'red';
            ctx.fillText("Du bist tot.", (width / 2) - (ctx.measureText("Du bist tot.").width / 2), height - (height / 2));
        }
    }

    function loop(timestamp) {
        var progress = timestamp - lastRender
      
        update(progress)
        draw()
      
        lastRender = timestamp
        window.requestAnimationFrame(loop)
      }
      var lastRender = 0
      window.requestAnimationFrame(loop)

    function respawn() {
        player.dead = false;
        player.dx = 0;
        player.dy = 0;
        player.x = random(5, width-5)
        player.y = random(5, height-5)

        scoreThing.x = random(5, width-5)
        scoreThing.y = random(5, height-5)

        score = 0;
    }

    function handleInput(e) {
        if(e.code == "ArrowUp") {
            player.dy = -player.speed;
        }
        if(e.code == "ArrowDown") {
            player.dy = player.speed;
        }
        if(e.code == "ArrowLeft") {
            player.dx = -player.speed;
        }
        if(e.code == "ArrowRight") {
            player.dx = player.speed;
        }

        if(player.dead) respawn();
    }

    window.addEventListener("keydown", handleInput, false);

    document.getElementById("autoGame").onclick = () => {
        autoMode = !autoMode;
        respawn();
    }
    document.getElementById("speedGame").oninput = (e) => {
        document.getElementById("speedGameValue").value = e.target.value;
        player.speed = e.target.value;
        if(!autoMode) respawn();
    }

    document.getElementById("speedGameValue").value = player.speed;


    

})();