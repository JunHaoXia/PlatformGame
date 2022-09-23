function Enemy(x,y,type){
    this.x = x;
    this.y = y;
    this.speed;
    this.height;
    this.width;
    this.type = type;
    this.leftBorder;
    this.rightBorder;
    this.upCounter = 0;
    this.goingUp = false;
    this.goingRight = true;
    switch(this.type){
        case 1: //set y to 598 and x in between 100 and 500
            this.height = 22;
            this.width = 30;
            this.speed = 4;
            break;
        default:
    }
    this.step = function() {
        switch(this.type){
            case 1: 
                this.leftBorder = 100;
                this.rightBorder = 600;
                break;
            default:
        }
        if(this.goingRight){
            if(this.x + this.width + this.speed >= this.rightBorder){
                this.goingRight = false;
                this.x -= this.speed;
            }
            else{
                this.x += this.speed;
            }
        }
        else{
            if(this.x - this.speed <= this.leftBorder){
                this.goingRight = true;
                this.x += this.speed;
            }
            else{
                this.x -= this.speed;
            }
        }
        if(this.goingUp){
            if(this.upCounter < 20){
                this.y -=.7;
                this.upCounter++;
            }
            else{
                this.goingUp = false;
            }
        }
        else if(!this.goingUp){
            if(this.upCounter >= 0){
                this.y +=.7;
                this.upCounter -= 1;
            }
            else{
                this.goingUp = true;
            }
        }
    }
    var spriteWidth = this.width;
    var spriteHeight = this.height;
    let frameX;
    let frameY;
    //draw function
    this.draw = function(){
        switch(this.type){
            case 1:
                frameY = 0;
                if (this.goingRight) {
                    frameX = 0; 
                }
                else{
                    frameX = 1;
                }
                break;
            default:
        }
        ctx.drawImage(enemy1,spriteWidth * frameX, spriteHeight * frameY , spriteWidth, spriteHeight, this.x,this.y, spriteWidth, spriteHeight);
    }

}