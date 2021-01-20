//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running;
var backGround, backGroundImage;
var bananasGroup, bananasImage;
var obstaclesGroup, obstaclesImage;

var survivalTime = 0;

var gameOver, gameOverImg;

function preload(){
backGroundImage = loadImage("jungle.jpg");

  player_running = loadImage("Monkey_01.png","Monkey_2.png","Monkey_3.png","Monkey_4.png","Monkey_5.png","Monkey_6.png","Monkey_7.png","Monkey_8.png","Monkey_9.png","Monkey_10.png"); 
  
bananasImage = loadImage("banana.png");
obstaclesImage = loadImage("stone.png");  

}

function setup() {
  createCanvas(400, 400);
  
 player = createSprite(100,340,20,50);
player.addImage("running",player_running);
player.scale = 0.1;
  
backGround = createSprite(400,370,800,10);
backGround.velocityX = -10;
backGround.addImage("backGround",backGroundImage);
backGround.x = backGround.width/2;

//create obstacles and bananas group
bananasGroup = new Group();
 obstaclesGroup = new Group(); 
  
survivalTime = 0;  
}

function draw() {
  background(220);
  
  text("survival Time:"+survivalTime, 500,50);


//make the player collide with the ground
player.collide(ground);
  
 if (gameState === PLAY) {
  //spawn the obstacles
    obstacles();
  
    //spawn bananas
    bananas();
    
    if (bananasGroup.isTouching(player)) {
    bananasGroup.destroyEach();
      
    }
    
 
 //scoring
 survivalTime = survivalTime+Math.round(World.frameRate/60);
      
       if (backGround.x < 0){
      backGround.x = backGround.width/2;
         
       }
      
    //jump when the space key is pressed
    if(keyDown("space") && player.y >= 314){
      player.velocityY = -12 ;
    }
  
    }
  
   if (obstaclesGroup.isTouching(player)) {
gameState = END;
   
 player.scale = 0.2;  
     
//make velocity of every object in the program 0

player.velocityY = 0;
backGround.velocityX = 0;
bananasGroup.setVelocityXEach(0); 
obstaclesGroup.setVelocityXEach(0);

bananasGroup.setLifetimeEach(-1);
obstaclesGroup.setLifetimeEach(-1);

//game over
text("GAME OVER", 155,195);
 textSize(30);
 }
  
   //add gravity
    player.velocityY = player.velocityY + 0.8;
       
drawSprites();       
  
}

function obstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,340,10,40);
    obstacle.velocityX = -7;
    obstacle.addImage("obstaclesGroup",obstacleImage); 
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function bananas() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var bananas = createSprite(400,270,40,10);
    bananas.addImage("bananasGroup",bananasImage);
    bananas.scale = 0.05;
    bananas.velocityX = -4;
    
    
    
     //assign lifetime to the variable
    bananas.lifetime = 134;
    
     //add each cloud to the group
    bananasGroup.add(bananas);
  }
  
}

switch(survivalTime){
  case 10: player.scale = 0.12;
           break;
case 20: player.scale = 0.14;
         break;
case 30: player.scale = 0.16;
         break;    
case 40: player.scale = 0.18;
         break;
default: break;       
    
}   