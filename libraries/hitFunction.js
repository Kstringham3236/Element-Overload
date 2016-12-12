function enemyHit(enemy,bullet){
  if(enemy.type > 0){
    //get rid of the bullet
    bullet.remove();
    //change color
    enemy.shapeColor = 'yellow';
    //subtract health
    enemy.type--;
  }else if(enemy.type === 0){
    //create explosion when bullet hits enemy
    for(var i=0; i<explosionDensity; i++) {
      var p = createSprite(bullet.position.x, bullet.position.y,2,2);
      
      p.setSpeed(random(3,5), random(360));
      p.friction = 0.95;
      p.life = 200;
    }
  
  enemy.remove();
  bullet.remove();
   score++;
   if(score > 0 && score < 99){
    gameState = 'gauntlet';
  }else if (score == 100){
    gameState = 'win';
    }
    
  }
}

function characterHit(enemy,character){
  characterHealth--;
  if(characterHealth <= 0){
    gameState = 'lose';
  }
  enemy.remove();
  character.shapeColor = 'red';
  
}

