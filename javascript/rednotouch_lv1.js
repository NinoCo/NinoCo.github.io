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
    window.location.href = "https://ninoco.github.io/rednotouch_lv2.html";
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
    [ 860, 80, 10, 130, "white" ],  // 1 Area top right
    [ 860, 80, 10, 60, "red" ], // 1.1
    [ 860, 140, 10, 70, "white" ], // 1.2
    [ 800, 70, 70, 10, "red" ],  // 2
    [ 790, 10, 10, 70, "red" ],  // 3
    [ 540, 10, 250, 10, "white" ], // 4
    [ 720, 10, 80, 10, "red" ], // 4.1
    [ 610, 10, 120, 10, "white" ], // 4.2
    [ 540, 10, 70, 10, "red" ], // 4.3
    [ 540, 20, 10, 130, "white" ], // 5
    [ 540, 20, 10, 70, "red" ], // 5.1
    [ 540, 80, 10, 70, "red" ], // 5.2
    [ 450, 150, 210, 10, "white" ], // 6
    [ 610, 150, 50, 10, "white" ], // 6.1
    [ 540, 150, 70, 10, "red" ], // 6.2
    [ 450, 150, 90, 10, "red" ], // 6.3
    [ 610, 80, 120, 10, "white" ], // 7
    [ 610, 80, 50, 10, "red" ], // 7.1
    [ 660, 80, 70, 10, "white" ], // 7.2
    [ 720, 10, 10, 210, "white" ], // 8
    [ 720, 10, 10, 80, "red" ], // 8.1
    [ 720, 90, 10, 60, "red" ], // 8.2
    [ 720, 140, 10, 80, "red" ], // 8.3
    [ 450, 160, 10, 130, "white" ], // 9
    [ 450, 160, 10, 60, "white" ], // 9.1
    [ 450, 220, 10, 70, "red" ], // 9.2
    [ 520, 220, 210, 10, "white" ], // 10
    [ 520, 220, 70, 10, "red" ], // 10.1
    [ 590, 220, 70, 10, "red" ], // 10.2
    [ 660, 220, 70, 10, "white" ], // 10.3
    [ 460, 280, 340, 10, "white" ], // 11
    [ 460, 280, 70, 10, "red" ], // 11.1
    [ 530, 280, 70, 10, "red" ], // 11.2
    [ 600, 280, 70, 10, "red" ], // 11.3
    [ 670, 280, 60, 10, "white" ], // 11.4
    [ 730, 280, 70, 10, "red" ], // 11.5
    [ 790, 200, 10, 90, "red" ], // 12
    [ 800, 200, 60, 10, "red" ], // 13
    [ 730, 140, 70, 10, "white" ], // 14
    [ 860, 380, 10, 130, "white" ], // 1 Area bottom right
    [ 860, 380, 10, 60, "red" ], // 1.1
    [ 860, 440, 10, 70, "red" ], // 1.2
    [ 800, 370, 70, 10, "white" ],  // 2
    [ 790, 310, 10, 70, "red" ],  // 3
    [ 540, 310, 250, 10, "white" ], // 4
    [ 720, 310, 80, 10, "red" ], // 4.1
    [ 610, 310, 120, 10, "red" ], // 4.2
    [ 540, 310, 70, 10, "white" ], // 4.3
    [ 540, 320, 10, 130, "white" ], // 5
    [ 540, 320, 10, 70, "red" ], // 5.1
    [ 540, 380, 10, 80, "red" ], // 5.2
    [ 610, 450, 50, 10, "red" ], // 6.1
    [ 550, 450, 60, 10, "white" ], // 6.2
    [ 450, 450, 90, 10, "red" ], // 6.3
    [ 610, 380, 120, 10, "white" ], // 7
    [ 610, 380, 50, 10, "red" ], // 7.1
    [ 660, 380, 70, 10, "red" ], // 7.2
    [ 720, 320, 10, 60, "white" ], // 8.1
    [ 720, 390, 10, 60, "red" ], // 8.2
    [ 720, 440, 10, 80, "red" ], // 8.3
    [ 450, 460, 10, 130, "white" ], // 9
    [ 450, 460, 10, 60, "red" ], // 9.1
    [ 450, 520, 10, 70, "white" ], // 9.2
    [ 520, 520, 210, 10, "white" ], // 10
    [ 520, 520, 70, 10, "red" ], // 10.1
    [ 590, 520, 70, 10, "red" ], // 10.2
    [ 660, 520, 70, 10, "red" ], // 10.3
    [ 460, 580, 340, 10, "white" ], // 11
    [ 460, 580, 70, 10, "white" ], // 11.1
    [ 530, 580, 70, 10, "red" ], // 11.2
    [ 600, 580, 70, 10, "red" ], // 11.3
    [ 670, 580, 60, 10, "red" ], // 11.4
    [ 730, 580, 70, 10, "white" ], // 11.5
    [ 790, 500, 10, 90, "red" ], // 12
    [ 800, 500, 60, 10, "red" ], // 13
    [ 730, 440, 70, 10, "red" ], // 14
    [ 420, 380, 10, 130, "white" ], // 1 Area bottom left
    [ 420, 380, 10, 60, "red" ], // 1.1
    [ 420, 440, 10, 70, "red" ], // 1.2
    [ 360, 370, 70, 10, "red" ],  // 2
    [ 350, 310, 10, 70, "white" ],  // 3
    [ 100, 310, 250, 10, "white" ], // 4
    [ 280, 310, 80, 10, "red" ], // 4.1
    [ 170, 310, 120, 10, "red" ], // 4.2
    [ 100, 310, 70, 10, "red" ], // 4.3
    [ 100, 320, 10, 130, "white" ], // 5
    [ 100, 320, 10, 70, "white" ], // 5.1
    [ 100, 380, 10, 70, "red" ], // 5.2
    [ 10, 450, 210, 10, "white" ], // 6
    [ 170, 450, 50, 10, "red" ], // 6.1
    [ 100, 450, 70, 10, "red" ], // 6.2
    [ 10, 450, 90, 10, "white" ], // 6.3
    [ 170, 380, 120, 10, "white" ], // 7
    [ 170, 380, 50, 10, "red"], // 7.1
    [ 220, 380, 70, 10, "red" ], // 7.2
    [ 280, 310, 10, 210, "white" ], // 8
    [ 280, 310, 10, 80, "red" ], // 8.1
    [ 280, 390, 10, 60, "white" ], // 8.2
    [ 280, 440, 10, 80, "red" ], // 8.3
    [ 10, 460, 10, 130, "white" ], // 9
    [ 10, 460, 10, 60, "red" ], // 9.1
    [ 10, 520, 10, 70, "red" ], // 9.2
    [ 80, 520, 210, 10, "white" ], // 10
    [ 80, 520, 70, 10, "white" ], // 10.1
    [ 150, 520, 70, 10, "red" ], // 10.2
    [ 220, 520, 70, 10, "red" ], // 10.3
    [ 20, 580, 340, 10, "white" ], // 11
    [ 20, 580, 70, 10, "red" ], // 11.1
    [ 90, 580, 70, 10, "white" ], // 11.2
    [ 160, 580, 70, 10, "red" ], // 11.3
    [ 230, 580, 60, 10, "red" ], // 11.4
    [ 290, 580, 70, 10, "red" ], // 11.5
    [ 350, 500, 10, 90, "white" ], // 12
    [ 360, 500, 60, 10, "red" ], // 13
    [ 290, 440, 70, 10, "red" ], // 14
    
    [ 0, 295, 880, 10, "red" ], 
    [ 435, 0, 10, 600, "red" ], 
    
    [ 290, 20, 60, 60, "yellow" ], // goal top left
    [ 730, 20, 60, 60, "yellow" ], // goal top right
    [ 730, 320, 60, 60, "yellow" ], // goal bottom right
    [ 290, 320, 60, 60, "yellow" ], // goal bottom left
  ],
  "players": [
    [ 240, 40, 20, 20 ],
    [ 680, 40, 20, 20 ],
    [ 680, 340, 20, 20 ],
    [ 240, 340, 20, 20 ]
  ]
};
