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
    alert("You win! Ohh and Sam's car is slow... like painfully so!");
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
    [ 430, 10, 10, 70, "white" ], // 1 Area top left
    [ 430, 80, 10, 70, "white" ], // 2
    [ 430, 150, 10, 70, "white" ], // 3
    [ 430, 220, 10, 70, "white" ], // 4
    [ 430, 290, 10, 70, "white" ], // 5
    [ 430, 360, 10, 80, "white" ], // 6
    [ 360, 430, 80, 10, "white" ], // 7
    [ 290, 430, 70, 10, "white" ], // 8
    [ 220, 430, 70, 10, "white" ], // 9
    [ 150, 430, 70, 10, "white" ], // 10
    [ 80, 430, 70, 10, "white" ], // 11
    [ 10, 430, 70, 10, "white" ], // 12
    [ 10, 360, 10, 70, "white" ],// 13
    [ 10, 290, 10, 70, "white" ], // 14
    [ 10, 220, 10, 70, "white" ], // 15
    [ 10, 150, 10, 70, "white" ], // 16
    [ 10, 80, 10, 70, "white" ], // 17
    [ 10, 10, 10, 70, "white" ], // 18
    [ 10, 10, 80, 10, "red" ], // 19
    [ 90, 10, 70, 10, "red" ], // 20
    [ 160, 10, 70, 10, "red" ], // 21
    [ 230, 10, 70, 10, "red" ], // 22
    [ 300, 10, 70, 10, "red" ], // 23
    [ 370, 10, 70, 10, "red" ], // 24
    [ 80, 160, 10, 70, "red" ], // 25
    [ 150, 230, 10, 70, "red" ], // 26
    [ 290, 90, 10, 70, "red" ], // 27
    [ 90, 360, 70, 10, "red" ], // 28
    [ 90, 80, 70, 10, "white" ], // 29
    [ 80, 300, 10, 70, "white" ], // 30
    [ 360, 80, 70, 10, "white" ], // 31
    [ 360, 160, 10, 70, "white" ], // 32
    [ 360, 300, 10, 70, "white" ], // 33
    [ 80, 20, 10, 70, "white" ], // 34
    [ 150, 150, 70, 10, "white" ], //35
    [ 80, 230, 10, 70, "white" ], // 36
    [ 230, 360, 70, 10, "white" ], // 37
    [ 220, 20, 10, 70, "white" ], // 38
    [ 80, 90, 10, 70, "white" ], // 39
    [ 220, 220, 70, 10, "white" ], // 40
    [ 160, 360, 70, 10, "white" ], // 41
    [ 220, 290, 70, 10, "white" ], // 42
    [ 880, 10, 10, 70, "white" ], // 1 Area top right
    [ 880, 80, 10, 70, "white" ], // 2
    [ 880, 150, 10, 70, "white" ], // 3
    [ 880, 220, 10, 70, "white" ], // 4
    [ 880, 290, 10, 70, "white" ], // 5
    [ 880, 360, 10, 80, "white" ], // 6
    [ 810, 430, 70, 10, "white" ], // 7
    [ 740, 430, 70, 10, "white" ], // 8
    [ 670, 430, 70, 10, "white" ], // 9
    [ 600, 430, 70, 10, "white" ], // 10
    [ 530, 430, 70, 10, "white" ], // 11
    [ 460, 430, 70, 10, "white" ], // 12
    [ 460, 360, 10, 80, "red" ],// 13
    [ 460, 290, 10, 70, "red" ], // 14
    [ 460, 220, 10, 70, "red" ], // 15
    [ 460, 150, 10, 70, "red" ], // 16
    [ 460, 80, 10, 70, "red" ], // 17
    [ 460, 10, 10, 70, "red" ], // 18
    [ 470, 10, 70, 10, "white" ], // 19
    [ 540, 10, 70, 10, "white" ], // 20
    [ 610, 10, 70, 10, "white" ], // 21
    [ 680, 10, 70, 10, "white" ], // 22
    [ 750, 10, 70, 10, "white" ], // 23
    [ 820, 10, 70, 10, "white" ], // 24
    [ 530, 160, 10, 70, "white" ], // 25
    [ 600, 230, 10, 70, "white" ], // 26
    [ 740, 90, 10, 70, "white" ], // 27
    [ 540, 360, 70, 10, "white" ], // 28
    [ 540, 80, 70, 10, "red" ], // 29
    [ 530, 300, 10, 70, "red" ], // 30
    [ 810, 80, 70, 10, "red" ], // 31
    [ 810, 160, 10, 70, "red" ], // 32
    [ 810, 300, 10, 70, "red" ], // 33
    [ 530, 20, 10, 70, "white" ], // 34
    [ 600, 150, 70, 10, "white" ], //35
    [ 530, 230, 10, 70, "white" ], // 36
    [ 680, 360, 70, 10, "white" ], // 37
    [ 670, 20, 10, 70, "white" ], // 38
    [ 530, 90, 10, 70, "white" ], // 39
    [ 670, 220, 70, 10, "white" ], // 40
    [ 610, 360, 70, 10, "white" ], // 41
    [ 670, 290, 70, 10, "white" ], // 42
    [ 880, 460, 10, 70, "white" ], // 1 Area bottom right
    [ 880, 530, 10, 70, "white" ], // 2
    [ 880, 600, 10, 70, "white" ], // 3
    [ 880, 670, 10, 70, "white" ], // 4
    [ 880, 740, 10, 70, "white" ], // 5
    [ 880, 810, 10, 80, "white" ], // 6
    [ 810, 880, 80, 10, "red" ], // 7
    [ 740, 880, 70, 10, "red" ], // 8
    [ 670, 880, 70, 10, "red" ], // 9
    [ 600, 880, 70, 10, "red" ], // 10
    [ 530, 880, 70, 10, "red" ], // 11
    [ 460, 880, 70, 10, "red" ], // 12
    [ 460, 810, 10, 70, "white" ],// 13
    [ 460, 740, 10, 70, "white" ], // 14
    [ 460, 670, 10, 70, "white" ], // 15
    [ 460, 600, 10, 70, "white" ], // 16
    [ 460, 530, 10, 70, "white" ], // 17
    [ 460, 460, 10, 70, "white" ], // 18
    [ 460, 460, 80, 10, "white" ], // 19
    [ 540, 460, 70, 10, "white" ], // 20
    [ 610, 460, 70, 10, "white" ], // 21
    [ 680, 460, 70, 10, "white" ], // 22
    [ 750, 460, 70, 10, "white" ], // 23
    [ 820, 460, 70, 10, "white" ], // 24
    [ 530, 610, 10, 70, "white" ], // 25
    [ 600, 680, 10, 70, "white" ], // 26
    [ 740, 540, 10, 70, "white" ], // 27
    [ 540, 810, 70, 10, "white" ], // 28
    [ 540, 530, 70, 10, "white" ], // 29
    [ 530, 750, 10, 70, "white" ], // 30
    [ 810, 530, 70, 10, "white" ], // 31
    [ 810, 610, 10, 70, "white" ], // 32
    [ 810, 750, 10, 70, "white" ], // 33
    [ 530, 470, 10, 60, "red" ], // 34
    [ 600, 600, 70, 10, "red" ], //35
    [ 530, 680, 10, 70, "red" ], // 36
    [ 680, 810, 70, 10, "red" ], // 37
    [ 670, 470, 10, 70, "white" ], // 38
    [ 530, 540, 10, 70, "white" ], // 39
    [ 670, 670, 70, 10, "white" ], // 40
    [ 610, 810, 70, 10, "white" ], // 41
    [ 670, 740, 70, 10, "white" ], // 42
    [ 430, 460, 10, 70, "red" ], // 1 Area bottom left
    [ 430, 530, 10, 70, "red" ], // 2
    [ 430, 600, 10, 70, "red" ], // 3
    [ 430, 670, 10, 70, "red" ], // 4
    [ 430, 740, 10, 70, "red" ], // 5
    [ 430, 810, 10, 80, "red" ], // 6
    [ 360, 880, 70, 10, "white" ], // 7
    [ 290, 880, 70, 10, "white" ], // 8
    [ 220, 880, 70, 10, "white" ], // 9
    [ 150, 880, 70, 10, "white" ], // 10
    [ 80, 880, 70, 10, "white" ], // 11
    [ 10, 880, 70, 10, "white" ], // 12
    [ 10, 810, 10, 70, "white" ],// 13
    [ 10, 740, 10, 70, "white" ], // 14
    [ 10, 670, 10, 70, "white" ], // 15
    [ 10, 600, 10, 70, "white" ], // 16
    [ 10, 530, 10, 70, "white" ], // 17
    [ 10, 460, 10, 70, "white" ], // 18
    [ 20, 460, 70, 10, "white" ], // 19
    [ 90, 460, 70, 10, "white" ], // 20
    [ 160, 460, 70, 10, "white" ], // 21
    [ 230, 460, 70, 10, "white" ], // 22
    [ 300, 460, 70, 10, "white" ], // 23
    [ 370, 460, 60, 10, "white" ], // 24
    [ 80, 610, 10, 70, "white" ], // 25
    [ 150, 680, 10, 70, "white" ], // 26
    [ 290, 540, 10, 70, "white" ], // 27
    [ 90, 810, 70, 10, "white" ], // 28
    [ 90, 530, 70, 10, "white" ], // 29
    [ 80, 750, 10, 70, "white" ], // 30
    [ 360, 530, 70, 10, "white" ], // 31
    [ 360, 610, 10, 70, "white" ], // 32
    [ 360, 750, 10, 70, "white" ], // 33
    [ 80, 470, 10, 70, "white" ], // 34
    [ 150, 600, 70, 10, "white" ], //35
    [ 80, 680, 10, 70, "white" ], // 36
    [ 230, 810, 70, 10, "white" ], // 37
    [ 220, 470, 10, 70, "red" ], // 38
    [ 80, 540, 10, 70, "red" ], // 39
    [ 220, 670, 70, 10, "red" ], // 40
    [ 160, 810, 70, 10, "red" ], // 41
    [ 220, 740, 70, 10, "red" ], // 42
    
    [ 0, 449, 900, 1, "black" ], 
    [ 449, 0, 1, 900, "black" ], 
    
    [ 20, 20, 60, 60, "yellow" ], // area top left
    [ 470, 20, 60, 60, "yellow" ], // area top right
    [ 470, 470, 60, 60, "yellow" ], // area bottom right
    [ 20, 470, 60, 60, "yellow" ], // area bottom left
  ],
  "players": [
    [ 390, 110, 20, 20 ], // player top left
    [ 840, 110, 20, 20 ], // player top right
    [ 840, 560, 20, 20 ], // player bottom right
    [ 390, 560, 20, 20 ], // player top left
  ]
};
