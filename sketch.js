// Look at lines 111, 128

var fireElement = [
  {'fire':'flame', "frame":{'x':0, 'y': 0, 'width': 200, 'height': 200}},
  {'fire':'flame', "frame":{'x':200, 'y': 0, 'width': 200, 'height': 200}},
  {'fire':'flame', "frame":{'x':400, 'y': 0, 'width': 200, 'height': 200}},
  {'fire':'flame', "frame":{'x':600, 'y': 0, 'width': 200, 'height': 200}},
  {'fire':'flame', "frame":{'x':800, 'y': 0, 'width': 200, 'height': 200}},
  {'fire':'flame', "frame":{'x':1000, 'y': 0, 'width': 200, 'height': 200}},
  ];
  var fireSprite;
  var fireAnimation;
var waterElement = [
  {'water':'ocean', "frame":{'x':1200, 'y': 0, 'width': 200, 'height': 200}},
  {'water':'ocean', "frame":{'x':1400, 'y': 0, 'width': 200, 'height': 200}},
  {'water':'ocean', "frame":{'x':1600, 'y': 0, 'width': 200, 'height': 200}},
  {'water':'ocean', "frame":{'x':1800, 'y': 0, 'width': 200, 'height': 200}},
  ];
  var waterSprite;
  var waterAnimation;
var energyElement = [
  {'void':'darkhole', "frame":{'x':0, 'y':200, 'width': 200, 'height': 200}},
  {'void':'darkhole', "frame":{'x':200, 'y':200, 'width': 200, 'height': 200}},
  {'void':'darkhole', "frame":{'x':400, 'y':200, 'width': 200, 'height': 200}},
  {'void':'darkhole', "frame":{'x':600, 'y':200, 'width': 200, 'height': 200}},
  ];
  var energySprite;
  var energyAnimation;
var windElement = [
  {'wind':'tornado', "frame":{'x':800, 'y':200, 'width': 200, 'height': 200}},
  {'wind':'tornado', "frame":{'x':1000, 'y':200, 'width': 200, 'height': 200}},
  {'wind':'tornado', "frame":{'x':1200, 'y':200, 'width': 200, 'height': 200}},
  {'wind':'tornado', "frame":{'x':1400, 'y':200, 'width': 200, 'height': 200}},
  ];
  var windSprite;
  var energyAnimation;
var fireBullet = [
  {'bullet':'shot','frame':{'x':1600, 'y':200, 'width': 200, 'height': 200}},
  {'bullet':'shot','frame':{'x':1800, 'y':200, 'width': 200, 'height': 200}},
  {'bullet':'shot','frame':{'x':0, 'y':400, 'width': 200, 'height': 200}},
  {'bullet':'shot','frame':{'x':200, 'y':400, 'width': 200, 'height': 200}}
  ];
  var bulletSprite;
  var bulletAnimation;

  
// preset variables
var character;
var frame;
//the scene is twice the size of the canvas
var sceneWidth = 1500;
var sceneHeight = 1500;
var gameState = 'startUp';
//misc
var explosionDensity = 10;
var score = 0;
//groups
var enemiesOne;
var enemiesTwo;
var enemiesThree;
var enemiesBoss;
var bullets;
var terrain;
//character and enemy stats
var heroSpeed = 8;
var enemyRateOne = 80;
var enemyRateTwo = 100;
var enemyRateThree = 120;
var enemyAngle = 80;
var characterHealth = 5;

var enemyOne;
var enemyTwo;
var enemyThree;
// UPDATE ON HOME VERSION!!!
var playArea;
var backImage;
var loseImage;
function preload() {

  fireSprite = loadSpriteSheet('assets/Sprite_elements-01.png', fireElement);
  fireAnimation = loadAnimation(fireSprite);
  
  waterSprite = loadSpriteSheet('assets/Sprite_elements-01.png', waterElement);
  waterAnimation = loadAnimation(waterSprite);
  
  energySprite = loadSpriteSheet('assets/Sprite_elements-01.png', energyElement);
  energyAnimation = loadAnimation(energySprite);

  windSprite = loadSpriteSheet('assets/Sprite_elements-01.png', windElement);
  windAnimation = loadAnimation(windSprite);
  
  bulletSprite = loadSpriteSheet('assets/Sprite_elements-01.png', fireBullet);
  bulletAnimation = loadAnimation(bulletSprite);
  
  
  
  // UPDATE ON HOME VERSION!!!
  playArea = loadImage("assets/terrain-01.png");
}
function setup() {
  // viewable terrain
  createCanvas(800,800);
  //create a sprite and add the 3 animations
  character = createSprite(400, 200, 50, 100);
     character.setCollider = ('rectangle', 0,0,100,1000);
  character.scale = .25;
  //character.rotateToDirection = true;
  var myAnimation = character.addAnimation("idle", fireSprite);
   character.friction = .95;
  // character.debug = true;


  bullets = new Group();
  //terrain = new Group();
  enemiesOne = new Group();
  enemiesTwo = new Group();
  enemiesThree = new Group();
  enemiesBoss = new Group();
  
  //create some background for visual reference

  // set visual frame that is set around the character
  frame = loadImage("assets/Element_frame-01-01.png");
  backImage = loadImage("assets/mainMenu-01-01.png");
  loseImage = loadImage("assets/loseScreen-01.png");
}

function draw() {
  
  switch(gameState){
    case 'startUp':
      text('Press X to START',width/2,height/2);
      background(backImage);
      break;
      
    case 'lose':
      background(200);
      text('Game Over Man',width/2,height/2);
      background(loseImage);
      break;
      
    case 'win':
      background(100);
      text("You're Awesome",width/2,height/2);
      break;
      
    case 'gauntlet':
      gauntletLvl();
      
      break;
  }
}
  
function keyPressed(){
 
 if (key === 'D') {
    //provide a burst of speed right
    character.setSpeed(heroSpeed,0);
  } else if (key == 'A') {
   //provide a burst of speed left
    character.setSpeed(heroSpeed,180);
  } else if (key == 'W') {
   //provide a burst of speed up
    character.setSpeed(heroSpeed,270);
  } else if (key == 'S') {
   //provide a burst of speed down
    character.setSpeed(heroSpeed,90);
  }
}

function mouseClicked(){
  //create bullet at the location of the hero and set the size
    var bullet = createSprite(character.position.x, character.position.y,5,5);
    bullet.addAnimation("shoot", bulletSprite);
    bullet.scale = .15;
    var angle;
    angle = atan2(mouseY - height/2, mouseX - width/2);
    angle = degrees(angle);
    //set the speed and direction of the bullet
    bullet.setSpeed(20, angle);
    //make the bullet dissappear after a certain number of frames
    bullet.life = 2000;
    bullet.shapeColor = 'black';
    //add the singular bullet to the GROUP bullets
    bullets.add(bullet);
}

function keyTyped(){
  if(key === 'x'){
     gameState = 'gauntlet';
  }
}