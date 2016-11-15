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
    [ 20, 10, 70, 10, "red" ], // 1 top left
    [ 90, 10, 70, 10, "white" ], // 2
    [ 160, 10, 70, 10, "white" ], // 3
    [ 230, 10, 70, 10, "white" ], // 4
    [ 300, 10, 70, 10, "red" ], // 5
    [ 360, 20, 10, 70, "white" ], // 6
    [ 370, 80, 70, 10, "white" ], // 7
    [ 430, 90, 10, 70, "white" ], // 8
    [ 430, 160, 10, 70, "red" ], //9
    [ 430, 230, 10, 70, "white" ], // 10
    [ 360, 290, 70, 10, "white" ], // 11
    [ 290, 290, 70, 10, "white" ],  // 12
    [ 220, 290, 70, 10, "red" ], // 13
    [ 220, 220, 10, 70, "white" ], // 14
    [ 150, 220, 70, 10, "white" ], // 15
    [ 80, 220, 70, 10, "white" ], // 16
    [ 150, 150, 10, 70, "red" ], // 17
    [ 150, 80, 10, 70, "white" ], // 18
    [ 80, 80, 70, 10, "white" ], // 19
    [ 300, 220, 70, 10, "white" ], // 20
    [ 360, 150, 10, 70, "red" ], // 21
    [ 290, 150, 70, 10, "white" ], // 22
    [ 290, 160, 10, 70, "white" ], // 23
    [ 290, 90, 10, 60, "white" ], // 24
    [ 220, 150, 70, 10, "red" ], // 25
    [ 220, 80, 10, 70, "white" ], // 26
    [ 230, 80, 70, 10, "white" ], // 27
    [ 150, 290, 70, 10, "white" ], // 28
    [ 80, 290, 70, 10, "red" ], // 29
    [ 10, 290, 70, 10, "white" ], // 30
    [ 10, 220, 10, 70, "white" ], // 31
    [ 10, 150, 10, 70, "white" ], // 32
    [ 20, 150, 70, 10, "red" ], // 33
    [ 10, 80, 10, 70, "white" ], // 34
    [ 10, 10, 10, 70, "white" ], // 35
    [ 470, 10, 70, 10, "white" ], // 1 top right
    [ 540, 10, 70, 10, "red" ], // 2
    [ 610, 10, 70, 10, "white" ], // 3
    [ 680, 10, 70, 10, "white" ], // 4
    [ 750, 10, 70, 10, "white" ], // 5
    [ 810, 20, 10, 70, "red" ], // 6
    [ 820, 80, 70, 10, "white" ], // 7
    [ 880, 90, 10, 70, "white" ], // 8
    [ 880, 160, 10, 70, "white" ], //9
    [ 880, 230, 10, 70, "red"], // 10
    [ 810, 290, 70, 10, "white" ], // 11
    [ 740, 290, 70, 10, "white" ],  // 12
    [ 670, 290, 70, 10, "white" ], // 13
    [ 670, 220, 10, 70, "red" ], // 14
    [ 600, 220, 70, 10, "white" ], // 15
    [ 530, 220, 70, 10, "white" ], // 16
    [ 600, 150, 10, 70, "white" ], // 17
    [ 600, 80, 10, 70, "red" ], // 18
    [ 530, 80, 70, 10, "white" ], // 19
    [ 750, 220, 70, 10, "white" ], // 20
    [ 810, 150, 10, 70, "white" ], // 21
    [ 740, 150, 70, 10, "red" ], // 22
    [ 740, 160, 10, 70, "white" ], // 23
    [ 740, 90, 10, 60, "white" ], // 24
    [ 670, 150, 70, 10, "white" ], // 25
    [ 670, 80, 10, 70, "red" ], // 26
    [ 680, 80, 70, 10, "white" ], // 27
    [ 600, 290, 70, 10, "white" ], // 28
    [ 530, 290, 70, 10, "white" ], // 29
    [ 460, 290, 70, 10, "red" ], // 30
    [ 460, 220, 10, 70, "white" ], // 31
    [ 460, 150, 10, 70, "white" ], // 32
    [ 470, 150, 70, 10, "white" ], // 33
    [ 460, 80, 10, 70, "red" ], // 34
    [ 460, 10, 10, 70, "white" ], // 35
    [ 470, 320, 70, 10, "white" ], // 1 bottom right
    [ 540, 320, 70, 10, "white" ], // 2
    [ 610, 320, 70, 10, "red" ], // 3
    [ 680, 320, 70, 10, "white" ], // 4
    [ 750, 320, 70, 10, "white" ], // 5
    [ 810, 330, 10, 70, "white" ], // 6
    [ 820, 390, 70, 10, "red" ], // 7
    [ 880, 400, 10, 70, "white" ], // 8
    [ 880, 470, 10, 70, "white" ], //9
    [ 880, 540, 10, 70, "white" ], // 10
    [ 810, 600, 70, 10, "red" ], // 11
    [ 740, 600, 70, 10, "white" ],  // 12
    [ 670, 600, 70, 10, "white" ], // 13
    [ 670, 530, 10, 70, "white" ], // 14
    [ 600, 530, 70, 10, "red" ], // 15
    [ 530, 530, 70, 10, "white" ], // 16
    [ 600, 460, 10, 70, "white" ], // 17
    [ 600, 390, 10, 70, "white" ], // 18
    [ 530, 390, 70, 10, "red" ], // 19
    [ 750, 530, 70, 10, "white" ], // 20
    [ 810, 460, 10, 70, "white" ], // 21
    [ 740, 460, 70, 10, "white" ], // 22
    [ 740, 470, 10, 70, "red" ], // 23
    [ 740, 400, 10, 60, "white" ], // 24
    [ 670, 460, 70, 10, "white" ], // 25
    [ 670, 390, 10, 70, "white" ], // 26
    [ 680, 390, 70, 10, "red" ], // 27
    [ 600, 600, 70, 10, "white" ], // 28
    [ 530, 600, 70, 10, "white" ], // 29
    [ 460, 600, 70, 10, "white" ], // 30
    [ 460, 530, 10, 70, "red" ], // 31
    [ 460, 460, 10, 70, "white" ], // 32
    [ 470, 460, 70, 10, "white" ], // 33
    [ 460, 390, 10, 70, "white" ], // 34
    [ 460, 320, 10, 70, "red" ], // 35
    [ 20, 320, 70, 10, "white" ], // 1 bottom left
    [ 90, 320, 70, 10, "white" ], // 2
    [ 160, 320, 70, 10, "white" ], // 3
    [ 230, 320, 70, 10, "red" ], // 4
    [ 300, 320, 70, 10, "white" ], // 5
    [ 360, 330, 10, 70, "white" ], // 6
    [ 370, 390, 70, 10, "white" ], // 7
    [ 430, 400, 10, 70, "red" ], // 8
    [ 430, 470, 10, 70, "white" ], //9
    [ 430, 540, 10, 70, "white" ], // 10
    [ 360, 600, 70, 10, "white" ], // 11
    [ 290, 600, 70, 10, "red" ],  // 12
    [ 220, 600, 70, 10, "white" ], // 13
    [ 220, 530, 10, 70, "white" ], // 14
    [ 150, 530, 70, 10, "white" ], // 15
    [ 80, 530, 70, 10, "red" ], // 16
    [ 150, 460, 10, 70, "white" ], // 17
    [ 150, 390, 10, 70, "white" ], // 18
    [ 80, 390, 70, 10, "white" ], // 19
    [ 300, 530, 70, 10, "red" ], // 20
    [ 360, 460, 10, 70, "white" ], // 21
    [ 290, 460, 70, 10, "white" ], // 22
    [ 290, 470, 10, 70, "white" ], // 23
    [ 290, 400, 10, 60, "red" ], // 24
    [ 220, 460, 70, 10, "white" ], // 25
    [ 220, 390, 10, 70, "white" ], // 26
    [ 230, 390, 70, 10, "white" ], // 27
    [ 150, 600, 70, 10, "red" ], // 28
    [ 80, 600, 70, 10, "white" ], // 29
    [ 10, 600, 70, 10, "white" ], // 30
    [ 10, 530, 10, 70, "white" ], // 31
    [ 10, 460, 10, 70, "red" ], // 32
    [ 20, 460, 70, 10, "white" ], // 33
    [ 10, 390, 10, 70, "white" ], // 34
    [ 10, 320, 10, 70, "white" ], // 35
    
    [ 0, 305, 900, 10, "red" ], 
    [ 445, 0, 10, 620, "red" ], 
    
    [ 160, 230, 60, 60, "yellow" ], // area top left
    [ 610, 230, 60, 60, "yellow" ], // area top right
    [ 610, 540, 60, 60, "yellow" ], // area bottom right
    [ 160, 540, 60, 60, "yellow" ], // area bottom left
  ],
  "players": [
    [ 390, 250, 20, 20 ], // player top left
    [ 840, 250, 20, 20 ], // player top right
    [ 840, 560, 20, 20 ], // player bottom right
    [ 390, 560, 20, 20 ], // player top left
  ]
};
