import Explosion from "./Explosion";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  maxHealth;
  health;
  velo;
  invincible = false;
  monSpiece;
  constructor(scene, maxHealth, velo, randomX, randomY, monSpiece, anim,type) {
    scene.time.addEvent({delay:400, callback:()=>{this.invincible=false}, loop: true});
    super(scene, randomX, randomY, monSpiece);
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.velo = velo;
    this.alpha = 1;
    this.anim = anim;
    this.monSpiece = monSpiece;
    this.type = type;
    scene.add.existing(this);
    scene.physics.add.existing(this);

  }

  anime(){
    if (this.monSpiece == 'alien'){
      this
      .setTint(0xff0000)
    }
    else if (this.monSpiece == 'worm'){
      this
      .setTint(0x00ff00);}

    else if (this.monSpiece == 'sonic'){
      this
      .setTint(0x0000ff)
    }

    else if (this.monSpiece == 'turtle'){
      this
      .setTint(0xac28f6)
    }
    this
    .play(this.anim);
    // .setTint(Phaser.Display.Color.RandomRGB().color)

  }

  update(time,delta){
    if(!this.body){
      return;
    }
    if (this.body.velocity.x > 0) this.flipX = true;
    else this.flipX = false;
  }

  die_anim(){
    new Explosion(this.scene, this.x, this.y);
    // this.scene.m_explosionSound.play();  몬스터 폭발 사운드
  }
}
