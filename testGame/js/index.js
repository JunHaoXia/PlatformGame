//Create drawing variables
var canvas;
var ctx;
const background = new Image();
background.src = 'background.png';
const playerImage = new Image();
playerImage.src = 'player.png';
const enemy1 = new Image();
enemy1.src = 'henry.png';
const textures = new Image();
textures.src = 'textures.png';
//Create game variables
var gameLoop;
var player;
var structures = [];
var floors = [];
var collectibles = [];
var enemies = [];
//create input variables
var upKey = false;
var downKey = false;
var rightKey = false;
var leftKey = false;
//Runs once page has loaded
window.onload = function() {
    canvas = document.getElementById("gameArea");
    ctx = canvas.getContext("2d");
    //setup key listeners
    setupInputs();
    //create new player
    //player = new Player(600,310); spawn on pole
    player = new Player(100,310);

    //create new enemies
    enemies.push(new Enemy(110,602,1));

    //create new collectibles
    collectibles.push(new Collectible(320,480,3));
    collectibles.push(new Collectible(400,480,1));
    collectibles.push(new Collectible(480,480,2));

    //create new structures
    for(let i = 0; i < 100; i++) {
        structures.push(new Structure(10*i, 625,10,10,1)); //grass
    }
    for(let i = 0; i < 100; i++) {
        for(let j = 0; j < 10; j++) {
        structures.push(new Structure(10*i, 10*j+635,10,10,5)); //dirt
        }
    }
    floors.push(new Structure(0,625,1000,1,4)); //grass_soil
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 4; j++) {
        structures.push(new Structure(10*i, 10*j+585,10,10,2)); //left block
        }
    }
    floors.push(new Structure(0,585,100,1,4)); //left block
    for(let i = 0; i < 30; i++) {
        structures.push(new Structure(10*i+300, 500,10,10,3)); //other platform
    }
    floors.push(new Structure(300,500,300,1,4)); //other platform
    for(let i = 0; i < 10; i++) {
        structures.push(new Structure(10*i+100, 380,10,10,3)); //spawn platform
    }
    floors.push(new Structure(100,380,100,1,4)); //spawn platform
    for(let i = 0; i < 30; i++) {
        for(let j = 0;j < 6;j++){
            structures.push(new Structure(10*j+600, 10*i+420,10,10,2)); //right pole
        }
    }
    floors.push(new Structure(600,420,50,1,4)); //right pole
    for(let i = 0; i < 10; i++) {
        structures.push(new Structure(10*i+150, 540,10,10,3)); //middle platform
    }
    floors.push(new Structure(150,540,100,1,4)); //middle platform
    
    //start game loop
    gameLoop = setInterval(step, 1000/50); //calls step function 50 times per sec
}
////////////////////STEP FUNCTION////////////////
function step() {   
    //Step player
    player.step();
    //step enemies
    for (let i = 0; i< enemies.length;i++){
        enemies[i].step();
    }
    //draw everything onto canvas
    draw();
}
///////////////////////DRAW FUNCTION//////////////
function draw(){
    //clear canvas
    //draw on canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    //draw collectibles
    for (let i = 0; i< collectibles.length;i++){
        collectibles[i].draw();
    }
    //draw the player
    player.draw();
    //draw the enemies
    for (let i = 0; i< enemies.length;i++){
        enemies[i].draw();
    }
    //draw structures
    for (let i = 0; i< structures.length;i++){
        structures[i].draw();
    }
    //draw the floors //dont really need this
    //for (let i = 0; i< floors.length;i++){
    //    floors[i].draw();
    //}
}
//////////////////////INPUTS //////////////////////////////////
function setupInputs(){
    document.addEventListener("keydown", function(event){
        if (event.key === "w" || event.key === "ArrowUp"){
            upKey = true;
        }
        else if(event.key === "a" || event.key === "ArrowLeft"){
            leftKey = true;
        }
        else if(event.key === "d" || event.key === "ArrowRight"){
            rightKey = true;
        }
        else if(event.key === "s" || event.key === "ArrowDown"){
            downKey = true;
        }
    });
    document.addEventListener("keyup", function(event){
        if (event.key === "w" || event.key === "ArrowUp"){
            upKey = false;
        }
        else if(event.key === "a" || event.key === "ArrowLeft"){
            leftKey = false;
        }
        else if(event.key === "d" || event.key === "ArrowRight"){
            rightKey = false;
        }
        else if(event.key === "s" || event.key === "ArrowDown"){
            downKey = false;
        }
    });
}
/////////////////////INTERSECTION FUNCTION //////////////////////
function checkIntersection(r1,r2){
    if(r1.x >= r2.x + r2.width){
        return false;
    }
    else if (r1.x + r1.width <= r2.x){
        return false;
    }
    else if(r1.y >= r2.y + r2.height){
        return false;
    }
    else if(r1.y + r1.height <= r2.y){
        return false;
    }
    else{
        return true;
    }
}