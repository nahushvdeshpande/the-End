var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,ground,groundimage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,background,backgroundimage;

function preload(){
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  backgroundimage=loadImage("jungle.jpg")
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-30);
  
  background=createSprite(0,0,displayWidth-20,displayHeight-30);
  background.addImage(backgroundimage);
  background.scale=1.5
  background.y=background.height/2;
  background.velocityX=-4;
  
  monkey=createSprite(100,340,20,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(1000,650,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  score=0;
  
  obstacleGroup=new Group();
  FoodGroup=new Group();
}

function draw() {
 
   if(gameState==PLAY){ 
 if(ground.x<0){
 ground.x=ground.width/2;
 }
   
 if(background.x<100){
   background.x=background.width/2
 }  
   
    }
  if(FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
  }
  switch(score){
    
    case 10:monkey.scale=0.12;
    break;  
    case 20:monkey.scale=0.14;
    break;
    case 30:monkey.scale=0.16;
    break;  
    case 40:monkey.scale=0.18;
    break;  
    default:break;  
  }
 
  if(keyDown("space")){
  monkey.velocityY=-12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
 
  
  if(obstacleGroup.isTouching(monkey)){
   monkey.scale=0.08;
   score=0
  } 
  
  if (background.x<0) {
    background.x=0
  }
  if (monkey.scale==0.08&&score==0) {
    gameState=END
  }
  camera.position.x = displayWidth/2;
  monkey.collide(ground);
  spawnObstacles();
  banana();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,450,250);
  if (gameState === END){
    obstacleGroup.velocityX=0
    FoodGroup.velocityX=0
    ground.velocity=0
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 450,300)
    }
 
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
  var obstacle = createSprite(800,650,10,40);
    obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6 ;
  obstacle.scale = 0.4;
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
 }
}

function banana(){
  if(frameCount%100==0){
    
   var banana=createSprite(600,250,40,10)
   banana.addImage(bananaImage)
    banana.scale=0.1;
   banana.y=random(520,600);
    banana.velocityX=-5;
    banana.lifetime=300;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    FoodGroup.add(banana)
}
}