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
    alert("You win!");
    window.location.reload();
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
    [ 80, 20, 10, 70, "red" ], // 2
    [ 90, 80, 60, 10, "red" ], // 3
    [ 150, 10, 10, 80, "red" ], // 4
    [ 160, 10, 60, 10, "red" ], // 5
    [ 220, 10, 10, 80, "red" ], // 6
    [ 230, 80, 60, 10, "red" ], // 7
    [ 290, 10, 10, 80, "red" ], // 8
    [ 300, 10, 70, 10, "red" ], // 9
    [ 370, 10, 70, 10, "red" ], // 10
    [ 430, 20, 10, 70, "red" ], // 11
    [ 430, 90, 10, 70, "red" ], // 12
    [ 430, 160, 10, 70, "red" ],// 13
    [ 430, 230, 10, 70, "red" ], // 14
    [ 360, 80, 10, 80, "red" ], // 15
    [ 290, 150, 70, 10, "red" ], // 16
    [ 220, 150, 70, 10, "red" ], // 17
    [ 360, 160, 10, 70, "red" ], // 18
    [ 290, 220, 70, 10, "red" ], // 19
    [ 220, 220, 70, 10, "red" ], // 20
    [ 150, 220, 70, 10, "red" ], // 21
    [ 150, 150, 10, 70, "red" ], // 22
    [ 80, 220, 70, 10, "red" ], // 23
    [ 80, 150, 10, 70, "red" ], // 24
    [ 150, 230, 10, 60, "red" ], // 25
    [ 360, 290, 70, 10, "red" ], // 26
    [ 290, 290, 70, 10, "red" ], // 27
    [ 220, 290, 70, 10, "red" ], // 28
    [ 150, 290, 70, 10, "red" ], // 29
    [ 80, 290, 70, 10, "red" ], // 30
    [ 20, 290, 60, 10, "red" ], // 31
    [ 10, 230, 10, 70, "red" ], // 32
    [ 10, 160, 10, 70, "red" ], // 33
    [ 10, 90, 10, 70, "red" ], // 34
    [ 10, 20, 10, 70, "red" ], //35

    
    [ 160, 230, 60, 60, "yellow" ], // goal top left 
  ],
  "players": [
    [ 180, 40, 20, 20, ], // player top left
  ]
};
