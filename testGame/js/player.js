function Player(x, y) {
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.6;  //if set to 0, player stops instantly
    this.maxSpeed = 10;
    this.points = 0;
    //able to change player dimensions if not using player.png
    this.width = 32;
    this.height = 32;
    this.active = true; //if player can move or not
    //player actions
    this.isFaceRight = true;
    this.canJump = false;
    this.step = function(){
        if (this.active) {
            //horizontal
            
            if(!leftKey && !rightKey || leftKey && rightKey){
                //slow down
                this.xspeed *= this.friction;
            }
            else if(rightKey){
                //move right
                this.xspeed ++;
            }
            else if(leftKey){
                //move left
                this.xspeed --;
            }
            //vertical
            //gravity
            if(upKey){
                if(this.canJump){
                    this.yspeed -= 10;
                }
                this.canJump = false;
            }
            this.yspeed += 1;
            
            //correct speed
            if (this.xspeed > this.maxSpeed ){ 
                this.xspeed = this.maxSpeed;
            }
            else if(this.xspeed < -this.maxSpeed){
                this.xspeed = -this.maxSpeed;
            }
            if (this.yspeed > this.maxSpeed ){ 
                this.yspeed = this.maxSpeed;
            }
            else if(this.yspeed < -this.maxSpeed){
                this.yspeed = -this.maxSpeed;
            }
            //make the xspeed values into whole numbers
            if(this.xspeed > 0){
                this.xspeed = Math.floor(this.xspeed);
            }else{
                this.xspeed = Math.ceil(this.xspeed);
            }
            if(this.yspeed > 0){
                this.yspeed = Math.floor(this.yspeed);
            }else{
                this.yspeed = Math.ceil(this.yspeed);
            }
            //horizontal collision detection
            let horizontalRect = {
                x: this.x + this.xspeed,
                y: this.y,
                width: this.width,
                height: this.height
            }
            //vertical collision detection
            let verticalRect = {
                x: this.x,
                y: this.y + this.yspeed,
                width: this.width,
                height: this.height
            }
            //check for intersection
            for (let i = 0; i < floors.length; i++) {
                let floorRect = {
                    x: floors[i].x,
                    y: floors[i].y,
                    width: floors[i].width,
                    height: floors[i].height
                }
                if(checkIntersection(verticalRect,floorRect)){
                    this.canJump = true;
                }
            }
            for (let i = 0; i < structures.length; i++) {
                let structureRect = {
                    x: structures[i].x,
                    y: structures[i].y,
                    width: structures[i].width,
                    height: structures[i].height
                }
                if(checkIntersection(horizontalRect,structureRect)){
                    while(checkIntersection(horizontalRect,structureRect)){
                        horizontalRect.x -= Math.sign(this.xspeed);
                    }
                    this.x = horizontalRect.x;
                    this.xspeed = 0;
                }
                if(checkIntersection(verticalRect,structureRect)){
                    while(checkIntersection(verticalRect,structureRect)){
                        verticalRect.y -= Math.sign(this.yspeed);
                    }
                    this.y = verticalRect.y;
                    this.yspeed = 0;
                }
            }
            for (let i = 0; i < collectibles.length; i++) {
                let collectibleRect = {
                    x: collectibles[i].x,
                    y: collectibles[i].y,
                    width: collectibles[i].width,
                    height: collectibles[i].height
                }
                if(checkIntersection(verticalRect,collectibleRect)){
                    if(collectibles[i].exists){
                        collectibles[i].collect();
                        collectibles[i].delete();
                        setTimeout(function(){collectibles[i].respawn();},5000);
                        console.log(collectibles);
                    }
                }
            }
            for (let i = 0; i < enemies.length; i++) {
                let enemyRect = {
                    x: enemies[i].x,
                    y: enemies[i].y,
                    width: enemies[i].width,
                    height: enemies[i].height
                }
                if(checkIntersection(horizontalRect,enemyRect)){
                    this.reset();
                }
                if(checkIntersection(verticalRect,enemyRect)){
                    this.reset();
                }
            }
            //finailze speed
            this.x += this.xspeed;
            this.y += this.yspeed;
            //check boundary conditions and set starting point
            if(this.y < 0){
                this.y = 300;
                this.x = 100;
            }
            if(this.x < 0){
                this.x = 0;
            }
            if(this.y >= canvas.height-this.height){
                this.y = 300;
                this.x = 100;
            }
            if(this.x >= canvas.width-this.width){
                this.x = canvas.width-this.width;
            }
            //console.log(this.x + this.width, this.y + this.height);
        }
    }
    this.reset = function() {
        location.reload();
    }
    //code for player.png sprite
    const spriteWidth = 32;
    const spriteHeight = 32;
    let frameX = 1;
    let frameY = 0;
    let gameFrame = 0;
    const stagFrame = 70;
    //draw function
    this.draw = function(){
        if (upKey) {
            if(this.isFaceRight){
                frameY = 0;
                if (gameFrame % stagFrame == 0){
                    frameX++;
                    if (frameX > 2) {
                    frameX = 1;
                    }
                }
            }
            else if(!this.isFaceRight){
                frameY = 1;
                if (gameFrame % stagFrame == 0){
                    frameX++;
                    if (frameX > 2) {
                    frameX = 1;
                    }
                }
            }
        }
        
        else if (rightKey) {
            frameY = 0;
            if (gameFrame % stagFrame == 0){
                frameX++;
                if (frameX > 2) {
                frameX = 1;
                }
            }
            this.isFaceRight = true;      
        }
        else if (leftKey) {
            frameY = 1;
            if (gameFrame % stagFrame == 0){
                frameX++;
                if (frameX > 2) {
                frameX = 1;
                }
            }
            this.isFaceRight = false;   
        }
        else if (downKey) {
            frameY = 2;
            if (gameFrame % stagFrame == 0){
                frameX++;
                if (frameX > 2) {
                frameX = 1;
                }
            }
        }
        else {
            if(this.isFaceRight){
                frameY = 0;
                if (gameFrame % stagFrame == 0){
                    frameX++;
                    if (frameX > 2) {
                    frameX = 1;
                    }
                }
            }
            else if(!this.isFaceRight){
                frameY = 1;
                if (gameFrame % stagFrame == 0){
                    frameX++;
                    if (frameX > 2) {
                    frameX = 1;
                    }
                }
            }
        }
        ctx.drawImage(playerImage,frameX * spriteWidth, frameY * spriteHeight , spriteWidth, spriteHeight, this.x,this.y, spriteWidth, spriteHeight);
        gameFrame++;
    }

}