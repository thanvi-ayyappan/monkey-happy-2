var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,monkey_running;
var bg,bgImg;
var bananaImage,obstacleImage;
var ground;

var score=0;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bgImg= loadAnimation("jungle.png");
  bananaImg= loadImage("banana.png");
  obstacleImg= loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(380,200,10,10);
  monkey.addAnimation("standing", monkeyImg);
  monkey.velocityX=5;
  
  bg= createSprite(390,390,400,10);
  bg.addAnimation("bg", bgImg);
  
  ground= createSprite(200,190,400,10);
  ground.visible=false;
  ground.velocityX=-5;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score=0;
  
  bananaImg.addImage("banana",bananaImage);
  obstacleImg.addImage("obstacle",obstacleImage);
}

function draw() {
  background(220);
  
  if(gameState===PLAY){
    if(keyDown("space")){
       monkey.velocityY=-10;
 }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  if(ground.x<0){
   ground.x=ground.width/2;
 }

 if(foodGroup.isTouching(monkey)){
   score=score+2;
   foodGroup=destroyEach;
 }
  
  switch (score){
    case 10:
      player.scale=0.12;
    break;
    case 20:
      player.scale=0.14;
    break;
    case 30:
      player.scale=0.16;
    break;
    case 40:
      player.scale=0.18;
    break;
    default:break;
 }
  if(obstaclesGroup.isTouching(monkey)){
   monkey.scale=0.2;
 }
    
    if(obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.10;
    }
    
    if(gameState===END){
      monkey.velocityX=0;
      monkey.velocityY=0;
      ground.velocityX=0;      
    }
} 
  banana();
  obstacles();
 
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
}

 function banana(){
  if(World.frameCount % 80 === 0) {
  var banana=createSprite(190,20,5,5);
  banana.scale=0.08;
  banana.velocityX=-5;
  banana.lifetime=140;
  banana.y=randomNumber(120,200);
  banana.x=randomNumber(52,346);
  foodGroup.add(banana);
  }
}

function obstacle(){
  if(World.frameCount % 60 === 0) {
    var obstacles=createSprite(400,356,10,40);
    obstacles.scale=0.15;
    obstacle.velocityX = - (6 + 3*count/100);
    obstacles.lifetime =150;
    obstaclesGroup.add(obstacle);
  }
}