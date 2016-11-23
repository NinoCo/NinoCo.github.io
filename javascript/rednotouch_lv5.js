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
    [ 430, 220, 10, 70, "white" ], // 1 Area top left
    [ 430, 160, 10, 70, "white" ], // 2
    [ 430, 90, 10, 70, "red" ], // 3
    [ 360, 80, 80, 10, "red" ], // 4
    [ 430, 10, 10, 70, "white" ], // 5
    [ 360, 10, 70, 10, "white" ], // 6
    [ 290, 10, 70, 10, "red" ], // 7
    [ 290, 20, 10, 70, "red" ], // 8
    [ 290, 90, 10, 70, "white" ], // 9
    [ 300, 150, 70, 10, "white" ], // 10
    [ 220, 10, 70, 10, "red" ], // 11
    [ 150, 10, 70, 10, "red" ], // 12
    [ 80, 10, 70, 10, "white" ],// 13
    [ 80, 20, 10, 70, "white" ], // 14
    [ 10, 10, 70, 10, "red" ], // 15
    [ 10, 20, 10, 70, "red" ], // 16
    [ 10, 90, 10, 70, "white" ], // 17
    [ 20, 150, 70, 10, "white" ], // 18
    [ 90, 150, 70, 10, "red" ], // 19
    [ 150, 80, 10, 80, "red" ], // 20
    [ 160, 80, 70, 10, "white" ], // 21
    [ 220, 90, 10, 70, "white" ], // 22
    [ 220, 160, 10, 70, "red" ], // 23
    [ 230, 220, 70, 10, "red" ], // 24
    [ 300, 220, 70, 10, "white" ], // 25
    [ 150, 160, 10, 70, "white" ], // 26
    [ 80, 220, 70, 10, "red" ], // 27
    [ 10, 160, 10, 70, "red" ], // 28
    [ 10, 230, 10, 70, "white" ], // 29
    [ 20, 290, 70, 10, "white" ], // 30
    [ 90, 290, 70, 10, "red" ], // 31
    [ 160, 290, 70, 10, "red" ], // 32
    [ 230, 290, 70, 10, "white" ], // 33
    [ 300, 290, 70, 10, "white" ], // 34
    [ 370, 290, 70, 10, "red" ], //35
    [ 880, 220, 10, 70, "red" ], // 1 Area top right
    [ 880, 160, 10, 70, "white" ], // 2
    [ 880, 90, 10, 70, "white" ], // 3
    [ 810, 80, 80, 10, "red" ], // 4
    [ 880, 10, 10, 70, "red" ], // 5
    [ 810, 10, 70, 10, "white" ], // 6
    [ 740, 10, 70, 10, "white" ], // 7
    [ 740, 20, 10, 70, "red" ], // 8
    [ 740, 90, 10, 70, "red" ], // 9
    [ 750, 150, 70, 10, "white" ], // 10
    [ 670, 10, 70, 10, "white" ], // 11
    [ 600, 10, 70, 10, "red" ], // 12
    [ 530, 10, 70, 10, "red" ],// 13
    [ 530, 20, 10, 70, "white" ], // 14
    [ 460, 10, 70, 10, "white" ], // 15
    [ 460, 20, 10, 70, "red" ], // 16
    [ 460, 90, 10, 70, "red" ], // 17
    [ 470, 150, 70, 10, "white" ], // 18
    [ 540, 150, 70, 10, "white" ], // 19
    [ 600, 80, 10, 80, "red" ], // 20
    [ 610, 80, 70, 10, "red" ], // 21
    [ 670, 90, 10, 70, "white" ], // 22
    [ 670, 160, 10, 70, "white" ], // 23
    [ 680, 220, 70, 10, "red" ], // 24
    [ 750, 220, 70, 10, "red" ], // 25
    [ 600, 160, 10, 70, "white" ], // 26
    [ 530, 220, 70, 10, "white" ], // 27
    [ 460, 160, 10, 70, "red" ], // 28
    [ 460, 230, 10, 70, "red" ], // 29
    [ 470, 290, 70, 10, "white" ], // 30
    [ 540, 290, 70, 10, "white" ], // 31
    [ 610, 290, 70, 10, "red" ], // 32
    [ 680, 290, 70, 10, "red" ], // 33
    [ 750, 290, 70, 10, "white" ], // 34
    [ 820, 290, 70, 10, "white" ], //35
    [ 880, 530, 10, 70, "red" ], // 1 Area bottom right
    [ 880, 470, 10, 70, "red" ], // 2
    [ 880, 400, 10, 70, "white" ], // 3
    [ 810, 390, 80, 10, "white" ], // 4
    [ 880, 320, 10, 70, "red" ], // 5
    [ 810, 320, 70, 10, "red" ], // 6
    [ 740, 320, 70, 10, "white" ], // 7
    [ 740, 330, 10, 70, "white" ], // 8
    [ 740, 400, 10, 70, "red" ], // 9
    [ 750, 460, 70, 10, "red" ], // 10
    [ 670, 320, 70, 10, "white" ], // 11
    [ 600, 320, 70, 10, "white" ], // 12
    [ 530, 320, 70, 10, "red" ],// 13
    [ 530, 330, 10, 70, "red" ], // 14
    [ 460, 320, 70, 10, "white" ], // 15
    [ 460, 330, 10, 70, "white" ], // 16
    [ 460, 400, 10, 70, "red" ], // 17
    [ 470, 460, 70, 10, "red" ], // 18
    [ 540, 460, 70, 10, "white" ], // 19
    [ 600, 390, 10, 80, "white" ], // 20
    [ 610, 390, 70, 10, "red" ], // 21
    [ 670, 400, 10, 70, "red" ], // 22
    [ 670, 470, 10, 70, "white" ], // 23
    [ 680, 530, 70, 10, "white" ], // 24
    [ 750, 530, 70, 10, "red" ], // 25
    [ 600, 470, 10, 70, "red" ], // 26
    [ 530, 530, 70, 10, "white" ], // 27
    [ 460, 470, 10, 70, "white" ], // 28
    [ 460, 540, 10, 70, "red" ], // 29
    [ 470, 600, 70, 10, "red" ], // 30
    [ 540, 600, 70, 10, "white" ], // 31
    [ 610, 600, 70, 10, "white" ], // 32
    [ 680, 600, 70, 10, "red" ], // 33
    [ 750, 600, 70, 10, "red" ], // 34
    [ 820, 600, 70, 10, "white" ], //35
    [ 430, 530, 10, 70, "white" ], // 1 Area bottom left
    [ 430, 470, 10, 70, "red" ], // 2
    [ 430, 400, 10, 70, "red" ], // 3
    [ 360, 390, 80, 10, "white" ], // 4
    [ 430, 320, 10, 70, "white" ], // 5
    [ 360, 320, 70, 10, "red" ], // 6
    [ 290, 320, 70, 10, "red" ], // 7
    [ 290, 330, 10, 70, "white" ], // 8
    [ 290, 400, 10, 70, "white" ], // 9
    [ 300, 460, 70, 10, "red" ], // 10
    [ 220, 320, 70, 10, "red" ], // 11
    [ 150, 320, 70, 10, "white" ], // 12
    [ 80, 320, 70, 10, "white" ],// 13
    [ 80, 330, 10, 70, "red" ], // 14
    [ 10, 320, 80, 10, "red" ], // 15
    [ 10, 330, 10, 70, "white" ], // 16
    [ 10, 400, 10, 70, "white" ], // 17
    [ 20, 460, 70, 10, "red" ], // 18
    [ 90, 460, 70, 10, "red" ], // 19
    [ 150, 390, 10, 70, "white" ], // 20
    [ 160, 390, 70, 10, "white" ], // 21
    [ 220, 400, 10, 70, "red" ], // 22
    [ 220, 470, 10, 70, "red" ], // 23
    [ 230, 530, 70, 10, "white" ], // 24
    [ 300, 530, 70, 10, "white" ], // 25
    [ 150, 470, 10, 70, "red" ], // 26
    [ 80, 530, 70, 10, "red" ], // 27
    [ 10, 470, 10, 70, "white" ], // 28
    [ 10, 540, 10, 70, "white" ], // 29
    [ 20, 600, 70, 10, "red" ], // 30
    [ 90, 600, 70, 10, "red" ], // 31
    [ 160, 600, 70, 10, "white" ], // 32
    [ 230, 600, 70, 10, "white" ], // 33
    [ 300, 600, 70, 10, "red" ], // 34
    [ 370, 600, 70, 10, "red" ], //35
    
    [ 0, 309, 900, 1, "black" ], 
    [ 449, 0, 1, 620, "black" ], 
    
    [ 20, 20, 60, 60, "yellow" ], // goal top left 
    [ 470, 20, 60, 60, "yellow" ], // goal top right
    [ 470, 330, 60, 60, "yellow" ], // goal bottom right
    [ 20, 330, 60, 60, "yellow" ], // goal bottom left 
  ],
  "players": [
    [ 390, 250, 20, 20, ], // player top left
    [ 840, 250, 20, 20, ], // player top right
    [ 840, 560, 20, 20, ], // player bottom right
    [ 390, 560, 20, 20, ], // player bottom left
  ]
};
