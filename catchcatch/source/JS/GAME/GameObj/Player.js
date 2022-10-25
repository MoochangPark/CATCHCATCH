import { cursors, mapSize } from "../game.js";


export const Direction = Object.freeze({
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right'
});


export default class Player extends Phaser.Physics.Arcade.Sprite {

  maxHealth = 100;
  health = 100;
  dmgmul = 1;
  speed = 160;
  // 캐릭터 특수능력 일단 보류
  ablity;
  heal = 0;
  fairy;
  constructor(scene, dmgmul, maxHealth, health) {

    super(scene, mapSize/2, mapSize/2, "cat1");
    this.scale = 0.7;
    this.alpha = 1;
    this.dmgmul = dmgmul;
    this.maxHealth = maxHealth;
    this.health = health;
    scene.add.existing(this);
    scene.physics.add.existing(this);

  }

  changeFairy(fairy){
    this.fairy = fairy;
  }

  move(direction) {
    this.fairy.x = this.x - 20;
    this.fairy.y = this.y - 50;
    if (cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play("left", true);
      this.flipX = true;
    } else if (cursors.right.isDown) {
      this.setVelocityX(160);
      this.flipX = false;
      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);
    }
  
    if (cursors.up.isDown) {
      this.setVelocityY(-160);
  
      if (cursors.left.isDown) {
        this.anims.play("left", true);
      } else {
        this.anims.play("right", true);
      }
    } else if (cursors.down.isDown) {
      this.setVelocityY(+160);
  
      if (cursors.left.isDown) {
        this.anims.play("left", true);
      } else {
        this.anims.play("right", true);
      }
    } else {
      this.setVelocityY(0);
      if (!cursors.left.isDown && !cursors.right.isDown) {
        this.anims.play("turn", true);
      }
    }
  }

  hitByEnemy(damage) {

  }

  hitPlayer(player, alien) {
    console.log(alien);
    alien.destroy();
    player.health-=1;
    console.log(player.health);
    if (player.health <= 0) {
      console.log('Game Over!');
    }
    alien_count -= 1;
  }

  shootBeam() {

  }
}