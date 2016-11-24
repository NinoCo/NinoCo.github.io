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
    window.location.href = "https://ninoco.github.io/rednotouch_lv7.html";
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
    [ 360, 430, 80, 10, "red" ], // 7
    [ 290, 430, 70, 10, "red" ], // 8
    [ 220, 430, 70, 10, "red" ], // 9
    [ 150, 430, 70, 10, "red" ], // 10
    [ 80, 430, 70, 10, "red" ], // 11
    [ 10, 430, 70, 10, "red" ], // 12
    [ 10, 360, 10, 70, "white" ],// 13
    [ 10, 290, 10, 70, "white" ], // 14
    [ 10, 220, 10, 70, "white" ], // 15
    [ 10, 150, 10, 70, "white" ], // 16
    [ 10, 80, 10, 70, "white" ], // 17
    [ 10, 10, 10, 70, "white" ], // 18
    [ 20, 10, 70, 10, "white" ], // 19
    [ 90, 10, 70, 10, "white" ], // 20
    [ 160, 10, 70, 10, "white" ], // 21
    [ 230, 10, 70, 10, "white" ], // 22
    [ 300, 10, 70, 10, "white" ], // 23
    [ 370, 10, 70, 10, "white" ], // 24
    [ 360, 300, 10, 70, "red" ], // 25
    [ 80, 150, 10, 70, "red" ], // 26
    [ 80, 220, 10, 70, "red" ], // 27
    [ 80, 290, 10, 70, "red" ], // 28
    [ 80, 360, 70, 10, "red" ], // 29
    [ 360, 230, 10, 70, "white" ], // 30
    [ 90, 80, 70, 10, "white" ], // 31
    [ 160, 80, 70, 10, "white" ], // 32
    [ 230, 80, 70, 10, "white" ], // 33
    [ 150, 90, 10, 70, "white" ], // 34
    [ 150, 160, 10, 70, "white" ], //35
    [ 150, 230, 10, 70, "white" ], // 36
    [ 360, 150, 70, 10, "white" ], // 37
    [ 150, 360, 70, 10, "white" ], // 38
    [ 220, 360, 70, 10, "white" ], // 39
    [ 290, 360, 70, 10, "white" ], // 40
    [ 220, 290, 10, 70, "white" ], // 41
    [ 220, 220, 10, 70, "white" ], // 42
    [ 220, 150, 10, 70, "white" ], // 43
    [ 360, 160, 10, 70, "white" ], // 45
    [ 290, 80, 80, 10, "white" ], // 46
    [ 290, 90, 10, 70, "white" ], // 47
    [ 290, 160, 10, 70, "white" ], // 48
    [ 290, 230, 10, 70, "white" ], // 49
    [ 20, 80, 70, 10, "white" ], // 50
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
    [ 810, 300, 10, 70, "white" ], // 25
    [ 530, 150, 10, 70, "white" ], // 26
    [ 530, 220, 10, 70, "white" ], // 27
    [ 530, 290, 10, 70, "white" ], // 28
    [ 530, 360, 70, 10, "white" ], // 29
    [ 810, 230, 10, 70, "red" ], // 30
    [ 540, 80, 70, 10, "red" ], // 31
    [ 610, 80, 70, 10, "red" ], // 32
    [ 680, 80, 70, 10, "red" ], // 33
    [ 600, 90, 10, 70, "red" ], // 34
    [ 600, 160, 10, 70, "red" ], //35
    [ 600, 230, 10, 70, "red" ], // 36
    [ 810, 150, 70, 10, "white" ], // 37
    [ 600, 360, 70, 10, "white" ], // 38
    [ 670, 360, 70, 10, "white" ], // 39
    [ 740, 360, 70, 10, "white" ], // 40
    [ 670, 290, 10, 70, "white" ], // 41
    [ 670, 220, 10, 70, "white" ], // 42
    [ 670, 150, 10, 70, "white" ], // 43
    [ 810, 160, 10, 70, "white" ], // 45
    [ 740, 80, 80, 10, "white" ], // 46
    [ 740, 90, 10, 70, "white" ], // 47
    [ 740, 160, 10, 70, "white" ], // 48
    [ 740, 230, 10, 70, "white" ], // 49
    [ 470, 80, 70, 10, "white" ], // 50
    [ 880, 460, 10, 70, "white" ], // 1 Area bottom right
    [ 880, 530, 10, 70, "white" ], // 2
    [ 880, 600, 10, 70, "white" ], // 3
    [ 880, 670, 10, 70, "white" ], // 4
    [ 880, 740, 10, 70, "white" ], // 5
    [ 880, 810, 10, 80, "white" ], // 6
    [ 810, 880, 70, 10, "white" ], // 7
    [ 740, 880, 70, 10, "white" ], // 8
    [ 670, 880, 70, 10, "white" ], // 9
    [ 600, 880, 70, 10, "white" ], // 10
    [ 530, 880, 70, 10, "white" ], // 11
    [ 460, 880, 70, 10, "white" ], // 12
    [ 460, 810, 10, 70, "white" ],// 13
    [ 460, 740, 10, 70, "white" ], // 14
    [ 460, 670, 10, 70, "white" ], // 15
    [ 460, 600, 10, 70, "white" ], // 16
    [ 460, 530, 10, 70, "white" ], // 17
    [ 460, 460, 10, 70, "white" ], // 18
    [ 460, 460, 80, 10, "red" ], // 19
    [ 540, 460, 70, 10, "red" ], // 20
    [ 610, 460, 70, 10, "red" ], // 21
    [ 680, 460, 70, 10, "red" ], // 22
    [ 750, 460, 70, 10, "red" ], // 23
    [ 820, 460, 70, 10, "red" ], // 24
    [ 810, 750, 10, 70, "white" ], // 25
    [ 530, 600, 10, 70, "white" ], // 26
    [ 530, 670, 10, 70, "white" ], // 27
    [ 530, 740, 10, 70, "white" ], // 28
    [ 530, 810, 70, 10, "white" ], // 29
    [ 810, 680, 10, 70, "white" ], // 30
    [ 540, 530, 70, 10, "white" ], // 31
    [ 610, 530, 70, 10, "white" ], // 32
    [ 680, 530, 70, 10, "white" ], // 33
    [ 600, 540, 10, 70, "white" ], // 34
    [ 600, 610, 10, 70, "white" ], //35
    [ 600, 680, 10, 70, "white" ], // 36
    [ 810, 600, 70, 10, "red" ], // 37
    [ 600, 810, 70, 10, "red" ], // 38
    [ 670, 810, 70, 10, "red" ], // 39
    [ 740, 810, 70, 10, "red" ], // 40
    [ 670, 740, 10, 70, "red" ], // 41
    [ 670, 670, 10, 70, "red" ], // 42
    [ 670, 600, 10, 70, "red" ], // 43
    [ 810, 610, 10, 70, "white" ], // 45
    [ 740, 530, 80, 10, "white" ], // 46
    [ 740, 540, 10, 70, "white" ], // 47
    [ 740, 610, 10, 70, "white" ], // 48
    [ 740, 680, 10, 70, "white" ], // 49
    [ 470, 530, 70, 10, "white" ], // 50
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
    [ 360, 750, 10, 70, "white" ], // 25
    [ 80, 600, 10, 70, "white" ], // 26
    [ 80, 670, 10, 70, "white" ], // 27
    [ 80, 740, 10, 70, "white" ], // 28
    [ 80, 810, 70, 10, "white" ], // 29
    [ 360, 680, 10, 70, "white" ], // 30
    [ 90, 530, 70, 10, "white" ], // 31
    [ 160, 530, 70, 10, "white" ], // 32
    [ 230, 530, 70, 10, "white" ], // 33
    [ 150, 540, 10, 70, "white" ], // 34
    [ 150, 610, 10, 70, "white" ], //35
    [ 150, 680, 10, 70, "white" ], // 36
    [ 360, 600, 70, 10, "white" ], // 37
    [ 150, 810, 70, 10, "white" ], // 38
    [ 220, 810, 70, 10, "white" ], // 39
    [ 290, 810, 70, 10, "white" ], // 40
    [ 220, 740, 10, 70, "white" ], // 41
    [ 220, 670, 10, 70, "white" ], // 42
    [ 220, 600, 10, 70, "white" ], // 43
    [ 360, 610, 10, 70, "red" ], // 45
    [ 290, 530, 80, 10, "red" ], // 46
    [ 290, 540, 10, 70, "red" ], // 47
    [ 290, 610, 10, 70, "red" ], // 48
    [ 290, 680, 10, 70, "red" ], // 49
    [ 20, 530, 60, 10, "red" ], // 50
    
    [ 0, 449, 900, 1, "black" ], 
    [ 449, 0, 1, 900, "black" ], 
    
    [ 20, 20, 60, 60, "yellow" ], // area top left
    [ 470, 20, 60, 60, "yellow" ], // area top right
    [ 470, 470, 60, 60, "yellow" ], // area bottom right
    [ 20, 470, 60, 60, "yellow" ], // area bottom left
  ],
  "players": [
    [ 390, 180, 20, 20 ], // player top left
    [ 840, 180, 20, 20 ], // player top right
    [ 840, 630, 20, 20 ], // player bottom right
    [ 390, 630, 20, 20 ], // player top left
  ]
};
