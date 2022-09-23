function Structure (x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;   
    this.type = type;
    this.size = 10;
    this.xcoord = 0;
    this.ycoord = 0;

    this.draw = function() {
        switch (this.type) {
            case 1:
                this.xcoord = 5;
                break;
            case 2:
                this.xcoord = 2;
                break;
            case 3:
                this.xcoord = 1;
                break;
            case 4:
                this.xcoord = 7;
                break;
            case 5:
                this.xcoord = 4;
                break;
            default:
        }
        ctx.drawImage(textures,this.size * this.xcoord, this.size * this.ycoord , this.size, this.size, this.x,this.y, this.size, this.size);
    }
}