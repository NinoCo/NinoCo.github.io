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
 [ 420, 80, 10, 130, "white" ],  // 1 Area top left
    [ 420, 80, 10, 60, "white" ], // 1.1
    [ 420, 140, 10, 70, "red" ], // 1.2
    [ 360, 70, 70, 10, "red" ],  // 2
    [ 350, 10, 10, 70, "red" ],  // 3
    [ 100, 10, 250, 10, "white" ], // 4
    [ 280, 10, 80, 10, "white" ], // 4.1
    [ 170, 10, 120, 10, "red" ], // 4.2
    [ 100, 10, 70, 10, "red" ], // 4.3
    [ 100, 20, 10, 130, "white" ], // 5
    [ 100, 20, 10, 70, "red" ], // 5.1
    [ 100, 80, 10, 70, "white" ], // 5.2
    [ 10, 150, 210, 10, "white" ], // 6
    [ 170, 150, 50, 10, "red" ], // 6.1
    [ 100, 150, 70, 10, "red" ], // 6.2
    [ 10, 150, 90, 10, "red" ], // 6.3
    [ 170, 80, 120, 10, "white" ], // 7
    [ 170, 80, 50, 10, "white" ], // 7.1
    [ 220, 80, 70, 10, "red" ], // 7.2
    [ 280, 10, 10, 210, "white" ], // 8
    [ 280, 10, 10, 80, "red" ], // 8.1
    [ 280, 90, 10, 60, "red" ], // 8.2
    [ 280, 150, 10, 80, "white" ], // 8.3
    [ 10, 160, 10, 130, "white" ], // 9
    [ 10, 160, 10, 60, "red" ], // 9.1
    [ 10, 220, 10, 70, "red" ], // 9.2
    [ 80, 220, 210, 10, "white" ], // 10
    [ 80, 220, 70, 10, "red" ], // 10.1
    [ 150, 220, 70, 10, "white" ], // 10.2
    [ 220, 220, 70, 10, "red" ], // 10.3
    [ 20, 280, 340, 10, "white" ], // 11
    [ 20, 280, 70, 10, "red" ], // 11.1
    [ 90, 280, 70, 10, "red" ], // 11.2
    [ 160, 280, 70, 10, "white" ], // 11.3
    [ 230, 280, 60, 10, "red" ], // 11.4
    [ 290, 280, 70, 10, "red" ], // 11.5
    [ 350, 200, 10, 90, "red" ], // 12
    [ 360, 200, 60, 10, "white" ], // 13
    [ 290, 140, 70, 10, "red" ], // 14
    
    [ 160, 230, 60, 60, "yellow" ] // goal top left 
  ],
  "players": [
    [ 180, 40, 20, 20, ] // player top left
  ]
};
