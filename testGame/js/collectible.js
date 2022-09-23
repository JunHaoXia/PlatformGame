function Collectible (x, y, type) {
    this.x = x;
    this.y = y;
    this.width;
    this.height;
    this.xcoord = 0;
    this.ycoord = 0;   
    this.type = type;
    this.exists = true;
    this.root = document.querySelector("#score_board");

    this.draw = function() {
        if(this.exists) {
            switch (this.type) {
                case 1:
                    this.xcoord = 1;
                    this.ycoord = 10; 
                    this.width = 8;
                    this.height = 16;
                    ctx.fillStyle = "silver";
                    break;
                case 2:
                    this.xcoord = 2;
                    this.ycoord = 10;
                    this.width = 8;
                    this.height = 16;
                    ctx.fillStyle = "gold";
                    break;
                case 3:
                    this.ycoord = 10;
                    this.width = 8;
                    this.height = 16;
                    ctx.fillStyle = "chocolate";
                    break;
                default:
            }
            ctx.drawImage(textures,this.width * this.xcoord,this.ycoord , this.width, this.height, this.x,this.y, this.width, this.height);
            //ctx.fillRect(this.x, this.y, this.width, this.height);    
        }
        
    }
    this.collect = function() {
        switch (this.type) {   
            case 1:
                player.points += 5;
                break;
            case 2:
                player.points += 10;
                break;
            case 3:
                    player.points += 1;
                    break;
            default:
        }
        this.update();
    }
    this.delete = function() { 
        this.exists = false;
    }
    this.update = function() {
        this.root.querySelector(".player_board").textContent = player.points; 
    }
    this.respawn = function() {  
        this.exists = true;
        console.log(this.exists)
        console.log(this.type)
    }
}
