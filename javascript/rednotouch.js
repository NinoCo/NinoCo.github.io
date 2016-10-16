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
    gameObjects.push(new GameObject(obj[0], obj[1], obj[2], obj[3], "red"));
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
  // init
  this.x = this.startX = x;
  this.y = this.startY = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speedX = 0;
  this.speedY = 0;
  this._update = _update && _update.bind(this);
  
  this.update = function() {
    // physics
    this.x += this.speedX;
    this.y += this.speedY;
    // specific rules for this particular object
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

  if (detectCollision(this)) {
    this.x = this.startX;
    this.y = this.startY;
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
    [ 420, 80, 10, 130 ],  // Area top left
    [ 360, 70, 70, 10 ],
    [ 350, 10, 10, 70 ],
    [ 100, 10, 250, 10 ],
    [ 100, 20, 10, 130 ],
    [ 10, 150, 210, 10 ],
    [ 170, 80, 120, 10 ],
    [ 280, 90, 10, 130 ],
    [ 10, 160, 10, 130 ],
    [ 80, 220, 210, 10 ],
    [ 20, 280, 340, 10 ],
    [ 350, 200, 10, 90 ],
    [ 360, 200, 60, 10 ],
    [ 290, 140, 70, 10 ],
    [ 860, 80, 10, 130 ],  // Area top right
    [ 800, 70, 70, 10 ],
    [ 790, 10, 10, 70 ],
    [ 540, 10, 250, 10 ],
    [ 540, 20, 10, 130 ],
    [ 450, 150, 210, 10 ],
    [ 610, 80, 120, 10 ],
    [ 720, 90, 10, 130 ],
    [ 450, 160, 10, 130 ],
    [ 520, 220, 210, 10 ],
    [ 460, 280, 340, 10 ],
    [ 790, 200, 10, 90 ],
    [ 800, 200, 60, 10 ],
    [ 730, 140, 70, 10 ],
    [ 860, 380, 10, 130 ], // Area bottom right
    [ 800, 370, 70, 10 ],
    [ 790, 310, 10, 70 ],
    [ 540, 310, 250, 10 ],
    [ 540, 320, 10, 130 ],
    [ 450, 450, 210, 10 ],
    [ 610, 380, 120, 10 ],
    [ 720, 390, 10, 130 ],
    [ 450, 460, 10, 130 ],
    [ 520, 520, 210, 10 ],
    [ 460, 580, 340, 10 ],
    [ 790, 500, 10, 90 ],
    [ 800, 500, 60, 10 ],
    [ 730, 440, 70, 10 ],
    [ 420, 380, 10, 130 ], // Area bottom left
    [ 360, 370, 70, 10 ],
    [ 350, 310, 10, 70 ],
    [ 100, 310, 250, 10 ],
    [ 100, 320, 10, 130 ],
    [ 10, 450, 210, 10 ],
    [ 170, 380, 120, 10 ],
    [ 280, 390, 10, 130 ],
    [ 10, 460, 10, 130 ],
    [ 80, 520, 210, 10 ],
    [ 20, 580, 340, 10 ],
    [ 350, 500, 10, 90 ],
    [ 360, 500, 60, 10 ],
    [ 290, 440, 70, 10 ]
  ],
  "players": [
    [ 220, 40, 20, 20 ],
    [ 660, 40, 20, 20 ],
    [ 660, 340, 20, 20 ],
    [ 220, 340, 20, 20 ]
  ]
};