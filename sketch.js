var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
 createCanvas(600, 200);

  
  monkey = createSprite(50,120,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(600,195 ,1200,7);
  ground.velocityX = -4
  ground.x = ground.width/2
  console.log(ground.x)
  
 invisibleGround = createSprite(200,200,400,10);
  invisibleGround.visible = false;
  
  
  FoodGroup = new Group();
  
  obstacleGroup = new Group();
  
  //trex.setCollider("circle",0,0, 40);
  //trex.debug = true
  
  score = 0;
  
}


function draw() {
 background("white")
  
   text("Score: "+ score, 500,50);
  camera.position.x = monkey.x
  camera.position.y = monkey.y
  
  if(gameState === PLAY){
    
    spawnBanana();
    spawnObstacle();
   // ground.velocityX = -(4 + 3* score/100)

    score = score + Math.round(getFrameRate()/60);
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 130) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
   
   if(FoodGroup.isTouching(monkey)){
      
      FoodGroup.destroyEach();
      
    }
    
    if(obstacleGroup.isTouching(monkey)) {
       gameState = END
       }
    
    
    
  }
   else if (gameState === END) {
    
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
     
     FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
   } 
  

  monkey.collide(invisibleGround);
  
  drawSprites();
  
}



function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana= createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacle(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(600,175,10,40);
    obstacle.addImage(obstacleImage); 
    obstacle.scale = 0.1
    obstacle.lifetime = 300;
   obstacle.velocityX = -3
   
    obstacleGroup.add(obstacle);
 }
}
