// look at lines 4, 83 

function gauntletLvl(){
  // LOAD INTO VERSION FROM HOME
    var angle;
    angle = atan2(mouseY - height/2, mouseX - width/2);
    angle = degrees(angle);
  character.rotation = angle;
  
  //generate enemyOne; PURSUE CHARACTER, utilize SETCOLLIDER FOR FIX HIT BOX FOR ALL 
    if(frameCount%enemyRateOne === 0){
    //make an enemy at the top, random X
    var enemyOne = createSprite(random(width), 0,40,40);
    enemyOne.scale = .25;
    enemyOne.addAnimation("wsprite", waterSprite);
    enemyOne.rotateToDirection = true;
    //set the speed and direction of the bullet
    //enemyOne.setSpeed(3,random(90 - enemyAngle,90 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    enemyOne.life = 10000;
    enemyOne.friction = .9;
    //we are going to store the enemy health in the .type parameter
    enemyOne.type = 1;
    enemyOne.attractionPoint(1, character.position.x, character.position.y)
    //add the singular bullet to the GROUP bullets
    enemiesOne.add(enemyOne);
  }
  for(var i = 0; i < enemiesOne.length;i ++){
    enemiesOne[i].attractionPoint(.2, character.position.x, character.position.y);
  }
  
//generate enemyTwo; RANDOM MOVEMENT
    if(frameCount%enemyRateTwo === 0 && frameCount > 1000){
    //make an enemy at the top, random X
    var enemyTwo = createSprite(random(width), 0,40,40);
    enemyTwo.scale = .25;
    enemyTwo.addAnimation("idle", windSprite);
    enemyTwo.rotateToDirection = true;
    //set the speed and direction of the bullet
    enemyTwo.setSpeed(1,random(90 - enemyAngle,90 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    enemyTwo.life = 10000;
    //we are going to store the enemy health in the .type parameter
    enemyTwo.type = 3;
    enemyTwo.shapeColor = 'red';
    //add the singular bullet to the GROUP bullets
    enemiesTwo.add(enemyTwo);
  }
  for(var j = 0; j < enemiesTwo.length; j ++){
  if(enemiesTwo[j].position.x > sceneWidth || enemiesTwo[j].position.x < 0){
    enemiesTwo[j].velocity.x *= -1;
  }
  if(enemiesTwo[j].position.y > sceneHeight || enemiesTwo[j].position.y < 0){
    enemiesTwo[j].velocity.y *= -1;
  }
}
  
    //generate enemyThree; PURSUE CHARACTER QUICKLY
    if(frameCount%enemyRateThree === 0 && frameCount > 20){
    //make an enemy at the top, random X
    var enemyThree = createSprite(random(width), 0,40,40);
    enemyThree.scale = .25;
    enemyThree.addAnimation("idle", energySprite);
    enemyThree.rotateToDirection = true;
    //set the speed and direction of the bullet
    enemyThree.setSpeed(10,random(90 - enemyAngle,90 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    enemyThree.life = 1000;
    enemyThree.friction = .98;
    //we are going to store the enemy health in the .type parameter
    enemyThree.type = 2;
    enemyThree.shapeColor = 'blue';
    //add the singular bullet to the GROUP bullets
    enemiesThree.add(enemyThree);
  }
  for(var k = 0; k < enemiesThree.length;k ++){
    enemiesThree[k].attractionPoint(.2, character.position.x, character.position.y);
    
    if(enemiesThree[k].position.x > sceneWidth || enemiesThree[k].position.x < 0){
      enemiesThree[k].velocity.x *= -1;
  }
   if(enemiesThree[k].position.y > sceneHeight || enemiesThree[k].position.y < 0){
      enemiesThree[k].velocity.y *= -1;
  }
  }
  //load background image here
  background('black');  
  // UPDATE ON HOME VERSION!!!
    image(playArea, 0,0, 1500, 1500);

  //camera zoom set
  //camera.zoom = .25;

  //set the camera position to the ghost position
  camera.position.x = character.position.x;
  camera.position.y = character.position.y;
  
  //limit the ghost movements
  if(character.position.x < 0)
    character.position.x = 0;
  if(character.position.y < 0)
    character.position.y = 0;
  if(character.position.x > sceneWidth)
    character.position.x = sceneWidth;
  if(character.position.y > sceneHeight)
    character.position.y = sceneHeight;
  
    enemiesOne.overlap(bullets,enemyHit);
    enemiesTwo.overlap(bullets,enemyHit);
    enemiesThree.overlap(bullets,enemyHit);
    enemiesOne.overlap(character,characterHit);
    enemiesTwo.overlap(character,characterHit);
    enemiesThree.overlap(character,characterHit);
  
  drawSprites();
  
  textSize(56);
  fill("white");
  text(" " + score, character.position.x - 170, character.position.y - 270);
  text(" " + characterHealth, character.position.x - 170, character.position.y - 330);
  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at 
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.off();
  image(frame,0,0);
}
