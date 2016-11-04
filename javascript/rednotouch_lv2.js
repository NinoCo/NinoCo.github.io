var g, keys, gameObjects;

function init() {
  var canvas, i, obj, loop;
  canvas = document.getElementsByTagName("canvas")[0];
  g = canvas.getContext("2d");
  
  keys = [];
  addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
  });
  addEventListener("keyup", function(e){
    keys[e.keyCode] = false;
  });

  gameObjects = [];
  for (i=0;i<map.obstacles.length;i++) {
    obj = map.obstacles[i];
    gameObjects.push(new GameObject(obj[0], obj[1], obj[2], obj[3], obj[4]));
  }
  for (i=0;i<map.players.length;i++) {
    obj = map.players[i];
    gameObjects.push(new GameObject(obj[0], obj[1], obj[2], obj[3], "green", playerUpdate));
  }

  loop = function() {
    update();
    render();
    requestAnimationFrame(loop);
  };
  loop();
}

function update() {
  var i, gameObject;
  for(i=0;i<gameObjects.length;i++) {
    gameObject = gameObjects[i];
    gameObject.update();
  }
}

function render() {
  var i, gameObject;
  g.clearRect(0, 0, g.canvas.width, g.canvas.height);
  for(i=0;i<gameObjects.length;i++) {
    gameObject = gameObjects[i];
    gameObject.render();
  }
}


function GameObject(x, y, width, height, color, _update) {
  this.x = this.startX = x;
  this.y = this.startY = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speedX = 0;
  this.speedY = 0;
  this._update = _update && _update.bind(this);
  
  this.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this._update) this._update();
  }
  
  this.render = function() {
    g.fillStyle = this.color;
    g.fillRect(this.x, this.y, this.width, this.height);
  }
}

function playerUpdate(){
  this.speedX = 0;
  this.speedY = 0;
  if (keys[37]) { this.speedX = -2; }
  if (keys[39]) { this.speedX = 2; }
  if (keys[38]) { this.speedY = -2; }
  if (keys[40]) { this.speedY = 2; }

var other = detectCollision(this);
if (other) {
  if (other.color === "yellow") {
    window.location.href = "https://ninoco.github.io/rednotouch_lv3.html";
    stop.playerUpdate();
  } else {
    this.x = this.startX;
    this.y = this.startY;
  }
}
}

function detectCollision(myObject) {
  var i, gameObject,
      myLeft, myRight, myTop, myBottom,
      otherLeft, otherRight, otherTop, otherBottom;
  
  myLeft = myObject.x;
  myRight = myObject.x + myObject.width;
  myTop = myObject.y;
  myBottom = myObject.y + myObject.height;
  
  for(i=0;i<gameObjects.length;i++) {
    gameObject = gameObjects[i];
    if (gameObject !== myObject) {
      otherLeft = gameObject.x;
      otherRight = gameObject.x + gameObject.width;
      otherTop = gameObject.y;
      otherBottom = gameObject.y + gameObject.height;
      if ((myBottom > otherTop) &&
          (myTop < otherBottom) &&
          (myRight > otherLeft) &&
          (myLeft < otherRight)) {
        return gameObject;
      }
    }
  }
}

var map = {
  "obstacles": [
    // x, y, width, height
    [ 10, 10, 80, 10, "white" ], // 1 Area top left
    [ 80, 20, 10, 70, "white" ], // 2
    [ 90, 80, 60, 10, "red" ], // 3
    [ 150, 10, 10, 80, "red" ], // 4
    [ 160, 10, 60, 10, "white" ], // 5
    [ 220, 10, 10, 80, "white" ], // 6
    [ 230, 80, 60, 10, "red" ], // 7
    [ 290, 10, 10, 80, "red" ], // 8
    [ 300, 10, 70, 10, "white" ], // 9
    [ 370, 10, 70, 10, "white" ], // 10
    [ 430, 20, 10, 70, "red" ], // 11
    [ 430, 90, 10, 70, "red" ], // 12
    [ 430, 160, 10, 70, "white" ],// 13
    [ 430, 230, 10, 70, "white" ], // 14
    [ 360, 80, 10, 80, "red" ], // 15
    [ 290, 150, 70, 10, "red" ], // 16
    [ 220, 150, 70, 10, "white" ], // 17
    [ 360, 160, 10, 70, "white" ], // 18
    [ 290, 220, 70, 10, "red" ], // 19
    [ 220, 220, 70, 10, "red" ], // 20
    [ 150, 220, 70, 10, "white" ], // 21
    [ 150, 150, 10, 70, "white" ], // 22
    [ 80, 220, 70, 10, "red" ], // 23
    [ 80, 150, 10, 70, "red" ], // 24
    [ 150, 230, 10, 60, "white" ], // 25
    [ 360, 290, 70, 10, "white" ], // 26
    [ 290, 290, 70, 10, "red" ], // 27
    [ 220, 290, 70, 10, "red" ], // 28
    [ 150, 290, 70, 10, "white" ], // 29
    [ 80, 290, 70, 10, "white" ], // 30
    [ 20, 290, 60, 10, "red" ], // 31
    [ 10, 230, 10, 70, "red" ], // 32
    [ 10, 160, 10, 70, "white" ], // 33
    [ 10, 90, 10, 70, "white" ], // 34
    [ 10, 20, 10, 70, "red" ], //35
    [ 460, 10, 80, 10, "red" ], // 1 Area top right
    [ 530, 20, 10, 70, "white" ], // 2
    [ 540, 80, 60, 10, "white" ], // 3
    [ 600, 10, 10, 80, "red" ], // 4
    [ 610, 10, 60, 10, "red" ], // 5
    [ 670, 10, 10, 80, "white" ], // 6
    [ 680, 80, 60, 10, "white" ], // 7
    [ 740, 10, 10, 80, "red" ], // 8
    [ 750, 10, 70, 10, "red" ], // 9
    [ 820, 10, 70, 10, "white" ], // 10
    [ 880, 20, 10, 70, "white" ], // 11
    [ 880, 90, 10, 70, "red" ], // 12
    [ 880, 160, 10, 70, "red" ],// 13
    [ 880, 230, 10, 70, "white" ], // 14
    [ 810, 80, 10, 80, "white" ], // 15
    [ 740, 150, 70, 10, "red" ], // 16
    [ 670, 150, 70, 10, "red" ], // 17
    [ 810, 160, 10, 70, "white" ], // 18
    [ 740, 220, 70, 10, "white" ], // 19
    [ 670, 220, 70, 10, "red" ], // 20
    [ 600, 220, 70, 10, "red" ], // 21
    [ 600, 150, 10, 70, "white" ], // 22
    [ 530, 220, 70, 10, "white" ], // 23
    [ 530, 150, 10, 70, "red" ], // 24
    [ 600, 230, 10, 60, "red" ], // 25
    [ 810, 290, 70, 10, "white" ], // 26
    [ 740, 290, 70, 10, "white" ], // 27
    [ 670, 290, 70, 10, "red" ], // 28
    [ 600, 290, 70, 10, "red" ], // 29
    [ 530, 290, 70, 10, "white" ], // 30
    [ 470, 290, 60, 10, "white" ], // 31
    [ 460, 230, 10, 70, "red" ], // 32
    [ 460, 160, 10, 70, "red" ], // 33
    [ 460, 90, 10, 70, "white" ], // 34
    [ 460, 20, 10, 70, "white" ], //35
    [ 460, 320, 80, 10, "red" ], // 1 Area bottom right
    [ 530, 330, 10, 70, "red" ], // 2
    [ 540, 390, 60, 10, "white" ], // 3
    [ 600, 320, 10, 80, "white" ], // 4
    [ 610, 320, 60, 10, "red" ], // 5
    [ 670, 320, 10, 80, "red" ], // 6
    [ 680, 390, 60, 10, "white" ], // 7
    [ 740, 320, 10, 80, "white" ], // 8
    [ 750, 320, 70, 10, "red" ], // 9
    [ 820, 320, 70, 10, "red" ], // 10
    [ 880, 330, 10, 70, "white" ], // 11
    [ 880, 400, 10, 70, "white" ], // 12
    [ 880, 470, 10, 70, "red" ],// 13
    [ 880, 540, 10, 70, "red" ], // 14
    [ 810, 390, 10, 80, "white" ], // 15
    [ 740, 460, 70, 10, "white" ], // 16
    [ 670, 460, 70, 10, "red" ], // 17
    [ 810, 470, 10, 70, "red" ], // 18
    [ 740, 530, 70, 10, "white" ], // 19
    [ 670, 530, 70, 10, "white" ], // 20
    [ 600, 530, 70, 10, "red" ], // 21
    [ 600, 460, 10, 70, "red" ], // 22
    [ 530, 530, 70, 10, "white" ], // 23
    [ 530, 460, 10, 70, "white" ], // 24
    [ 600, 540, 10, 60, "red" ], // 25
    [ 810, 600, 70, 10, "red" ], // 26
    [ 740, 600, 70, 10, "white" ], // 27
    [ 670, 600, 70, 10, "white" ], // 28
    [ 600, 600, 70, 10, "red" ], // 29
    [ 530, 600, 70, 10, "red" ], // 30
    [ 470, 600, 60, 10, "white" ], // 31
    [ 460, 540, 10, 70, "white" ], // 32
    [ 460, 470, 10, 70, "red" ], // 33
    [ 460, 400, 10, 70, "red" ], // 34
    [ 460, 330, 10, 70, "white" ], //35
    [ 10, 320, 80, 10, "red" ], // 1 Area bottom left
    [ 80, 330, 10, 70, "red" ], // 2
    [ 90, 390, 60, 10, "red" ], // 3
    [ 150, 320, 10, 80, "white" ], // 4
    [ 160, 320, 60, 10, "white" ], // 5
    [ 220, 320, 10, 80, "red" ], // 6
    [ 230, 390, 60, 10, "red" ], // 7
    [ 290, 320, 10, 80, "white" ], // 8
    [ 300, 320, 70, 10, "white" ], // 9
    [ 370, 320, 70, 10, "red" ], // 10
    [ 430, 330, 10, 70, "red" ], // 11
    [ 430, 400, 10, 70, "white" ], // 12
    [ 430, 470, 10, 70, "white" ],// 13
    [ 430, 540, 10, 70, "red" ], // 14
    [ 360, 390, 10, 80, "red" ], // 15
    [ 290, 460, 70, 10, "white" ], // 16
    [ 220, 460, 70, 10, "white" ], // 17
    [ 360, 470, 10, 70, "red" ], // 18
    [ 290, 530, 70, 10, "red" ], // 19
    [ 220, 530, 70, 10, "white" ], // 20
    [ 150, 530, 70, 10, "white" ], // 21
    [ 150, 460, 10, 70, "red" ], // 22
    [ 80, 530, 70, 10, "red" ], // 23
    [ 80, 460, 10, 70, "white" ], // 24
    [ 150, 540, 10, 60, "white" ], // 25
    [ 360, 600, 70, 10, "red" ], // 26
    [ 290, 600, 70, 10, "red" ], // 27
    [ 220, 600, 70, 10, "white" ], // 28
    [ 150, 600, 70, 10, "white" ], // 29
    [ 80, 600, 70, 10, "red" ], // 30
    [ 20, 600, 60, 10, "red" ], // 31
    [ 10, 540, 10, 70, "white" ], // 32
    [ 10, 470, 10, 70, "white" ], // 33
    [ 10, 400, 10, 70, "red" ], // 34
    [ 10, 330, 10, 70, "red" ], //35 
    
    [ 0, 305, 900, 10, "red" ], 
    [ 445, 0, 10, 620, "red" ], 
    
    [ 160, 230, 60, 60, "yellow" ], // goal top left 
    [ 610, 230, 60, 60, "yellow" ], // goal top right
    [ 610, 540, 60, 60, "yellow" ], // goal bottom right
    [ 160, 540, 60, 60, "yellow" ], // goal bottom left 
  ],
  "players": [
    [ 180, 40, 20, 20, ], // player top left
    [ 630, 40, 20, 20, ], // player top right
    [ 630, 350, 20, 20, ], // player bottom right
    [ 180, 350, 20, 20, ], // player bottom left
  ]
};
