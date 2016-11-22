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
    window.location.href = "https://ninoco.github.io/rednotouch_lv1.html";
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
    [ 10, 10, 80, 10, "red" ], // 1 Area top left
    [ 90, 10, 70, 10, "red" ], // 2
    [ 160, 10, 70, 10, "white" ], // 3
    [ 230, 10, 70, 10, "white" ], // 4
    [ 300, 10, 70, 10, "red" ], // 5
    [ 370, 10, 70, 10, "red" ], // 6
    [ 430, 20, 10, 70, "white" ], // 7
    [ 430, 90, 10, 70, "white" ], // 8
    [ 360, 150, 70, 10, "red" ], // 9
    [ 360, 80, 10, 70, "red" ], // 10
    [ 430, 160, 10, 70, "white" ], // 11
    [ 430, 230, 10, 70, "white" ], // 12
    [ 360, 290, 70, 10, "red" ],// 13
    [ 290, 290, 70, 10, "red" ], // 14
    [ 220, 290, 70, 10, "white" ], // 15
    [ 220, 220, 10, 70, "white" ], // 16
    [ 220, 150, 10, 70, "red" ], // 17
    [ 230, 150, 70, 10, "red" ], // 18
    [ 290, 80, 10, 70, "white" ], // 19
    [ 290, 160, 10, 70, "white" ], // 20
    [ 300, 220, 70, 10, "red" ], // 21
    [ 150, 150, 70, 10, "red" ], // 22
    [ 150, 160, 10, 70, "white" ], // 23
    [ 80, 220, 70, 10, "white" ], // 24
    [ 80, 150, 70, 10, "red" ], // 25
    [ 80, 80, 10, 70, "red" ], // 26
    [ 90, 80, 70, 10, "white" ], // 27
    [ 150, 290, 70, 10, "white" ], // 28
    [ 220, 20, 10, 70, "red" ], // 29
    [ 80, 290, 70, 10, "red" ], // 30
    [ 10, 290, 70, 10, "white" ], // 31
    [ 10, 220, 10, 70, "white" ], // 32
    [ 10, 150, 10, 70, "red" ], // 33
    [ 10, 80, 10, 70, "red" ], // 34
    [ 10, 20, 10, 60, "white" ], //35
    [ 460, 10, 80, 10, "white" ], // 1 Area top right
    [ 540, 10, 70, 10, "white" ], // 2
    [ 610, 10, 70, 10, "red" ], // 3
    [ 680, 10, 70, 10, "red" ], // 4
    [ 750, 10, 70, 10, "white" ], // 5
    [ 820, 10, 70, 10, "white" ], // 6
    [ 880, 20, 10, 70, "red" ], // 7
    [ 880, 90, 10, 70, "red" ], // 8
    [ 810, 150, 70, 10, "white" ], // 9
    [ 810, 80, 10, 70, "white" ], // 10
    [ 880, 160, 10, 70, "red" ], // 11
    [ 880, 230, 10, 70, "red" ], // 12
    [ 810, 290, 70, 10, "white" ],// 13
    [ 740, 290, 70, 10, "white" ], // 14
    [ 670, 290, 70, 10, "red" ], // 15
    [ 670, 220, 10, 70, "red" ], // 16
    [ 670, 150, 10, 70, "white" ], // 17
    [ 680, 150, 70, 10, "white" ], // 18
    [ 740, 80, 10, 80, "red" ], // 19
    [ 740, 160, 10, 70, "red" ], // 20
    [ 750, 220, 70, 10, "white" ], // 21
    [ 600, 150, 70, 10, "white" ], // 22
    [ 600, 160, 10, 70, "red" ], // 23
    [ 530, 220, 70, 10, "red" ], // 24
    [ 530, 150, 70, 10, "white" ], // 25
    [ 530, 80, 10, 70, "white" ], // 26
    [ 540, 80, 70, 10, "red" ], // 27
    [ 600, 290, 70, 10, "red" ], // 28
    [ 670, 20, 10, 70, "white" ], // 29
    [ 530, 290, 70, 10, "white" ], // 30
    [ 460, 290, 70, 10, "red" ], // 31
    [ 460, 220, 10, 70, "red" ], // 32
    [ 460, 150, 10, 70, "white" ], // 33
    [ 460, 80, 10, 70, "white" ], // 34
    [ 460, 20, 10, 60, "red" ], //35
    
    [ 449, 0, 1, 310, "black" ],  
    
    [ 160, 160, 60, 60, "yellow" ], // goal top left 
    [ 610, 160, 60, 60, "yellow" ], // goal top right
  ],
  "players": [
    [ 250, 180, 20, 20, ], // player top left
    [ 700, 180, 20, 20, ], // player top right
  ]
};
