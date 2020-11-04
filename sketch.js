
var monkey , monkey_running, monkeyStop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground 
var END=0;
var PLAY=1;
var gameState=PLAY;
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkeyStop = loadAnimation("sprite_0.png");
 
}



function setup() {
 createCanvas(500,400); 
  
  score=0;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",monkeyStop);
  monkey.scale=0.1;

  ground=createSprite(400,350,1000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);

 FoodGroup=new Group();
 obstacleGroup=new Group(); 
  
}


function draw() {
background(255);
  if(gameState===PLAY){
  
    if(ground.x<0){
      ground.x=ground.width/2;
    }

    if(keyDown("space")&&monkey.y>=314){
      monkey.velocityY=-15;
    }

    monkey.velocityY=monkey.velocityY+0.8;
    
    console.log(monkey.y);

    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score=score+2;
    }
    
    spawnBananas();
    spawnObstacles();
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
    
  }
  if(gameState===END){
    monkey.changeAnimation("stop",monkeyStop);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.velocityX=0;
    ground.velocityX=0;
  }

  monkey.collide(ground);
  
  drawSprites();
  
  fill("black");
  text("SCORE: "+score,400,50);
}


function spawnBananas(){
 if (frameCount % 150 === 0) {
    banana = createSprite(600,120);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 200;
   FoodGroup.add(banana);
   banana.depth=monkey.depth;
   monkey.depth=banana.depth+1;
    
  }
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(600,326);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   obstacle.velocityX=-4;
   obstacleGroup.add(obstacle);

 }
}






