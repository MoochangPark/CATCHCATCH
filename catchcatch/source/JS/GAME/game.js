import Fairy from './GameObj/fairy.js';
import Magic from './GameObj/magic.js';
import Player from './GameObj/player.js';
import Enemy from './GameObj/enemy.js';
import Boss from './GameObj/boss.js';

export const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    scene: {
        //scene 제어에
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            fixedStep: false,
        },
    },
};

//player start
// 고양이 json
let cats;
// 플레이어 객체
let player;
// 캐릭터 선택 시 변경될 변수
let catNumber = 0;
// 요정
var nowFairy = 0;
var fairySet = [, , , , ,];
var fairy;
global.thisScene = "";
// 공격 및 공격 딜레이 관련
global.control = false;
global.normalAttackTimer = 0;
var normalAttackAS = 20;
var magic;
global.magics = "";
export var cursors;
var gameOver = false;
var scoreText;
// 마우스 포인터 관련
export var input;
var mouse;
//player end

//map start
var map;
export var mapSize = 16000;
export var camera;
var backgroundLayer;
var portalLayer;
var wallLayer;
var stage1Layer;
var stage2Layer;
var stage3Layer;
var stage4Layer;
let controls;
//map end

//enemy start


// 몬스터 변수 선언
export var monsterSet;
var monster;

export var bossSet;
// 1번 몬스터: alien
var alien;

// 2번 몬스터: worm
var worm;

// 3번 몬스터: sonic
var sonic;

// 4번 몬스터: turtle
var turtle; 

// 5번 몬스터: alien_plus
var alien_plus;

// 6번 몬스터: worm_plus
var worm_plus;

var cursors;


// 보스
var slime_king;

// 보스 활성 확인
var slime_king_active;

// 몬스터 생성주기
var mon1Delay = 0;
var mon2Delay = 0;
var mon3Delay = 0;
var mon4Delay = 0;

var monX;
var monY;
global.monsterCount = 0;
var randomLocation = 0;
var timer;
var random_monster = 0;


// 임시 구멍
var hole;

// 몬스터 이미지

//enemy end

function preload() {
    //map start
    this.load.image("tiles", "images/map/tiles.png");
    this.load.image("tiles2", "images/map/tiles2.png");
    this.load.tilemapTiledJSON("map", "images/map/resources.tmj");
    this.load.image("j1", "images/mine/j1.png");
    this.load.image("j2", "images/mine/j2.png");
    this.load.image("j3", "images/mine/j3.png");
    //map end

    //player start
    // 플레이어 스프라이트
    this.load.spritesheet("cat1", "images/cat/cat1.png", {
        frameWidth: 96,
        frameHeight: 100,
    });

  // 공격 스프라이트
  this.load.spritesheet(
    "magic1",
    "images/attack/weapon/16_sunburn_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );

  this.load.spritesheet(
    "magic2",
    "images/attack/weapon/7_firespin_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );

  this.load.spritesheet(
    "magic3",
    "images/attack/weapon/18_midnight_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );

  this.load.spritesheet(
    "magic4",
    "images/attack/weapon/2_magic8_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );

  this.load.spritesheet(
    "magic5",
    "images/attack/weapon/8_protectioncircle_spritesheet.png",
    { frameWidth: 100, frameHeight: 100, endFrame: 61 }
  );

  this.load.spritesheet(
    "magic5_1",
    "images/attack/weapon/13_vortex_spritesheet.png",
    { frameWidth: 100, frameHeight: 100, endFrame: 61 }
  );

  // 요정 스프라이트
  this.load.spritesheet("fairy1", "images/fairy/fairy1.png", {
    frameWidth: 150,
    frameHeight: 142,
  });

  this.load.spritesheet("fairy2", "images/fairy/fairy2.png", {
    frameWidth: 230,
    frameHeight: 210,
  });

  this.load.spritesheet("fairy3", "images/fairy/fairy3.png", {
    frameWidth: 134,
    frameHeight: 158,
  });

  this.load.spritesheet("fairy4", "images/fairy/fairy4.png", {
    frameWidth: 136,
    frameHeight: 170,
  });

  this.load.spritesheet("fairy5", "images/fairy/fairy5.png", {
    frameWidth: 160,
    frameHeight: 190,
  });

  //player end

    //enemy start

    // 몬스터
    this.load.spritesheet(
        "alien",
        "http://labs.phaser.io/assets/tests/invaders/invader1.png",
        {frameWidth: 32, frameHeight: 32}
    );

    // 보스
    
    //enemy end
}

function create() {
  thisScene = this;
  //map start
  this.cameras.main.setBounds(0, 0, mapSize, mapSize);
  this.physics.world.setBounds(0, 0, mapSize, mapSize);
  map = this.make.tilemap({ key: "map" }); //map을 키로 가지는 JSON 파일 가져와 적용하기
  const tileset = map.addTilesetImage("Tiles", "tiles"); //그릴떄 사용할 타일 이미지 적용하기
  const tileset2 = map.addTilesetImage("tiles2", "tiles2"); //그릴떄 사용할 타일 이미지 적용하기
  backgroundLayer = map.createDynamicLayer("background", tileset); //레이어 화면에 뿌려주기
  portalLayer = map.createDynamicLayer("portal", tileset2); //레이어 화면에 뿌려주기
  wallLayer = map.createDynamicLayer("wall", tileset2);
  stage1Layer = map.createDynamicLayer("stage1", tileset2);
  stage2Layer = map.createDynamicLayer("stage2", tileset);
  stage3Layer = map.createDynamicLayer("stage3", tileset2);
  stage4Layer = map.createDynamicLayer("stage4", tileset2);

    stage3Layer.setCollisionByProperty({collides: true});
    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // stage3Layer.renderDebug(debugGraphics, {
    //   tileColor: null,
    // })

  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    slot1: Phaser.Input.Keyboard.KeyCodes.ONE,
    slot2: Phaser.Input.Keyboard.KeyCodes.TWO,
    slot3: Phaser.Input.Keyboard.KeyCodes.THREE,
    slot4: Phaser.Input.Keyboard.KeyCodes.FOUR,
    slot5: Phaser.Input.Keyboard.KeyCodes.FIVE,
    skill: Phaser.Input.Keyboard.KeyCodes.SPACE
  });
  // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);

    //map end

    //player start
    cats = require('./jsons/cats.json');
    fairySet = require('./jsons/fairys.json');
    console.log(cats);
    player = cats[catNumber];
    player = new Player(this, 1, 100, 100);
    console.log(player);
    console.log(player)
    camera = this.cameras.main;
    input = this.input;
    mouse = input.mousePointer;
    this.input.on(
        "pointermove",
        function (pointer) {
            let cursor = pointer;
            let angle = Phaser.Math.Angle.Between(
                player.x,
                player.y,
                cursor.x + this.cameras.main.scrollX,
                cursor.y + this.cameras.main.scrollY
            );
        },
        this
    );

  // 플레이어, 요정 로딩
  fairySet[0] = new Fairy(this, 100, 4, 1, 1, 60, 10, 500, 1, player);
  fairySet[0].initFairy1(2, 2);
  fairySet[1] = new Fairy(this,100, 10, 1, 1, 70, 10, 160, 2, player);
  fairySet[2] = new Fairy(this,100, 0, 1, 3, 80, 10, 300, 3, player);
  fairySet[3] = new Fairy(this,100, 10, 1, 4, 90, 10, 400, 4, player);
  fairySet[4] = new Fairy(this, 100, 10, 1, 5, 100, 10, 500, 5, player);
  player.changeFairy(fairySet[0]);
  normalAttackAS = fairySet[0].as;
  // animation
  this.anims.create({
    key: "fairy1_idle",
    frames: this.anims.generateFrameNumbers("fairy1", { start: 12, end: 21 }),
    frameRate: 8,
    repeat: -1,
  });

    this.anims.create({
        key: "fairy1_attack",
        frames: this.anims.generateFrameNumbers("fairy1", {start: 6, end: 10}),
        frameRate: 12,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy2_idle",
        frames: this.anims.generateFrameNumbers("fairy2", {start: 10, end: 19}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy2_attack",
        frames: this.anims.generateFrameNumbers("fairy2", {start: 0, end: 8}),
        frameRate: 14,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy3_idle",
        frames: this.anims.generateFrameNumbers("fairy3", {start: 11, end: 19}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy3_attack",
        frames: this.anims.generateFrameNumbers("fairy3", {start: 0, end: 9}),
        frameRate: 14,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy4_idle",
        frames: this.anims.generateFrameNumbers("fairy4", {start: 7, end: 14}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy4_attack",
        frames: this.anims.generateFrameNumbers("fairy4", {start: 0, end: 5}),
        frameRate: 10,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy5_idle",
        frames: this.anims.generateFrameNumbers("fairy5", {start: 15, end: 24}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy5_attack",
        frames: this.anims.generateFrameNumbers("fairy5", {start: 0, end: 13}),
        frameRate: 17,
        repeat: 0,
    });

    this.anims.create({
        key: "turn",
        frames: this.anims.generateFrameNumbers("cat1", {start: 0, end: 0}),
        frameRate: 10,
    });
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("cat1", {start: 1, end: 7}),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("cat1", {start: 1, end: 7}),
        frameRate: 10,
        repeat: -1,
    });


  // 공격 애니메이션
  this.anims.create({
    key: "magic1",
    frames: this.anims.generateFrameNumbers("magic1", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  this.anims.create({
    key: "magic2",
    frames: this.anims.generateFrameNumbers("magic2", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  this.anims.create({
    key: "magic3",
    frames: this.anims.generateFrameNumbers("magic3", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  this.anims.create({
    key: "magic4",
    frames: this.anims.generateFrameNumbers("magic4", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  this.anims.create({
    key: "magic5",
    frames: this.anims.generateFrameNumbers("magic5", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  this.anims.create({
    key: "magic5_1",
    frames: this.anims.generateFrameNumbers("magic5_1", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  fairySet[nowFairy].play("fairy" + (nowFairy + 1) + "_idle", true);

    //player end

    //map start
    let j1;

    for (let i = 0; i < 5; i++) {
        let x = Phaser.Math.Between(400, 600);
        let y = Phaser.Math.Between(400, 600);

        j1 = this.physics.add.sprite(x, y, "j1");
        j1.body.immovable = true;

        this.physics.add.collider(player, j1);
    }

    console.log(j1);

    // this.physics.add.overlap(player, portalLayer);

    player.setPosition(8000, 8000); //width, height
    this.physics.add.collider(player, stage3Layer);
    camera.startFollow(player, false);
    //map end

    //enemy start


    // 임시 구멍
    hole = this.physics.add.sprite(8000,8100,'fairy4')
    hole.hp = 100;

    // 그룹셋
    monsterSet = this.physics.add.group();
    bossSet = this.physics.add.group();
    magics = this.physics.add.group();


  this.physics.add.collider(player, bossSet, player.hitPlayer);
  thisScene.physics.add.overlap(magics, bossSet, attack);

  // 만약 유저와 몬스터가 닿았다면 (hitplayer 함수 실행)
  this.physics.add.collider(player, monsterSet, player.hitPlayer);
  thisScene.physics.add.overlap(magics, monsterSet, attack);
  
  // 만약 몬스터와 구멍이 닿았다면 (hithole 함수 실행)
  thisScene.physics.add.overlap(hole,monsterSet,hithole)

  // 플레이어가 공격 맞은 후 일시 무적에 사용
      timer = this.time.addEvent({
        delay: 2000, callback: () => {
            player.invincible = false
        }, loop: true
    });

    // ============== 몬스터 스프라이트 애니메이션 목록 ==================
    this.anims.create({
        key: 'swarm',
        frames: this.anims.generateFrameNumbers('alien', {start: 0, end: 1}),
        frameRate: 2,
        repeat: -1
    })
  //enemy end

    // ##보스 생성, 나중에 타이머 조건 넣고 업데이트에 넣기 ##
    if  (!slime_king_active){
      slime_king = new Boss(this,300,80,player.x+300,player.y+300,'slime_king','swarm',5,1)
      slime_king.anime()
      slime_king_active = true
      bossSet.add(slime_king)
    }
}

function update(time, delta) {
    //player start
    changeSlot();
  if (normalAttackTimer > normalAttackAS) {
    control = false;
  } else {
    normalAttackTimer++;
  }
    //mouse clicked
  if (mouse.leftButtonDown() && !control) {
    magic = new Magic(this, fairySet[nowFairy]);
    this.physics.add.overlap(magic, monsterSet, fairySet[nowFairy].attack, null, this);
    
    fairySet[nowFairy].normalAttack(magic);
  }

  player.move();
  //player end

    //map start

    // let tile = map.getTileAt(map.worldToTileX(player.x), map.worldToTileY(player.y));

    // if (tile) {
    //   console.log('' + JSON.stringify(tile.properties))
    // }

    //map end

    //enemy start


    // 몬스터가 유저 따라가게함
    if (monsterCount !== 0) {
        for (let i = 0; i < monsterSet.children.entries.length; i++) {
          if (monsterSet.children.entries[i].type == 'follower'){
            this.physics.moveToObject(monsterSet.children.entries[i], player, monsterSet.children.entries[i].velo);}
            // #홀에 따라가게 하는 코드 작성하기#
          else if (monsterSet.children.entries[i].type == 'siege'){
            this.physics.moveToObject(monsterSet.children.entries[i], hole, monsterSet.children.entries[i].velo);}
        }
    }

    if (slime_king_active){
    this.physics.moveToObject(slime_king,player,80);
    if(slime_king.health <= 100){
      slime_king.destroy()
      slime_king_active = false
    }
    }

    mon1Delay++;
    mon2Delay++;
    
    // 만약 특정 시간 이후에 소환하려면 조건문 생성
    mon3Delay++;
    mon4Delay++;

    // 플레이어 기준랜덤 위치에 몬스터 생성
    // 생성규칙: 몬스터이름, 애니메이션, 체력, 속도, x,y,타입,딜레이
    if (mon1Delay > 300) {
      // 1번 zombie
      enemySpawn(randomLocation)
      
      // #### if문으로 특정 시간 이후면 강화몹 소환으로 변경하기 ###
      addMonster(this, 'alien', 'swarm',10,100,monX,monY,'follower')
      // addMonster(this, 'alien_plus', 'alien_plus_anim',20,100,monX,monY,'follower')

      mon1Delay = 0};

    
    if (mon2Delay > 1200){
      // 2번 worm
      enemySpawn(randomLocation)
      addMonster(this, 'worm', 'swarm', 10,70,monX,monY, 'siege')

      // #### if문으로 특정 시간 이후면 강화몹 소환으로 변경하기 ###
      // addMonster(this, 'worm_plus', 'worm_plus_anim',20,100,monX,monY,'follower')

      mon2Delay = 0};
    
    if (mon3Delay > 1500){
      enemySpawn(randomLocation)
      addMonster(this, 'sonic', 'swarm', 5,200,monX,monY,'follower')
      mon3Delay = 0};

    
    if (mon4Delay > 3000){
      enemySpawn(randomLocation)
      addMonster(this, 'turtle', 'swarm', 100,30,monX,monY,'siege')
      mon4Delay = 0};
    
      for(let i = magics.length-1; i>=0;i--){
    magics[i].timer++;
    if(magics[i].timer == magics[i].lifetime){
      magics[i].destroy();
      magics.splice(i,1);
    }
  }
  //enemy end

}

//player start

// 플레이어 공격
var magicFire = function (game) {
  // 게임에서 외부 UI 연관 테스트
  //for fire again
  magic = new Magic(game, fairySet[nowFairy].range, fairySet[nowFairy]);
  magics.push(magic);
  // console.log(magic);
  // console.log(magic.body);
  game.physics.add.overlap(magic, monsterSet, attack, null, this);
  // magic.body.setCircle(45);

  /*충돌관련 하드코딩 된 부분 나중에 수정 */
    magic.body.width = 50;
    magic.body.height = 50;
    magic.body.offset.x = 25;
    magic.body.offset.y = 25;
    normalAttackTimer = 0;

    let angle = Phaser.Math.Angle.Between(
        fairySet[nowFairy].x,
        fairySet[nowFairy].y,
        input.x + camera.scrollX,
        input.y + camera.scrollY
    );

    // 각도 계산 공식
    angle = ((angle + Math.PI / 2) * 180) / Math.PI + 90;
    magic.rotation += (angle - 180) / 60 - 1.5;
    magic.anims.play("magic" + (nowFairy + 1), true);

    //move to mouse position
    game.physics.moveTo(
        magic,
        input.x + camera.scrollX,
        input.y + camera.scrollY,
        fairySet[nowFairy].velo
    );
    control = true;
};

function changeSlot() {
    if (
        cursors.slot1.isDown &&
        nowFairy !== 0 &&
        /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
    ) {
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
        nowFairy = 0;
        player.changeFairy(fairySet[nowFairy]);
        normalAttackAS = fairySet[nowFairy].as;
        fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
    }

    if (
        cursors.slot2.isDown &&
        nowFairy !== 1 &&
        /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
    ) {
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
        nowFairy = 1;
        player.changeFairy(fairySet[nowFairy]);
        normalAttackAS = fairySet[nowFairy].as;
        fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
    }

    if (
        cursors.slot3.isDown &&
        nowFairy !== 2 &&
        /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
    ) {
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
        nowFairy = 2;
        player.changeFairy(fairySet[nowFairy]);
        normalAttackAS = fairySet[nowFairy].as;
        fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
    }

    if (
        cursors.slot4.isDown &&
        nowFairy !== 3 &&
        /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
    ) {
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
        nowFairy = 3;
        player.changeFairy(fairySet[nowFairy]);
        normalAttackAS = fairySet[nowFairy].as;
        fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
    }

    if (
        cursors.slot5.isDown &&
        nowFairy !== 4 &&
        /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
    ) {
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
        nowFairy = 4;
        player.changeFairy(fairySet[nowFairy]);
        normalAttackAS = fairySet[nowFairy].as;
        fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
    }

    if (!fairySet[nowFairy].anims.isPlaying) {
        fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
    }
}

function attack(magic, monster) {
  if (!monster.invincible) {
    if (magic.pierceCount > 0) {
      magic.pierceCount--;
    } else {
      magic.destroy();
    }

    if (nowFairy === 2) { //  && fairys[nowFairy].level === 9 (추후에 레벨업 생길 때 추가)
      let num = Math.floor(Math.random() * 100);
      if (num <= 9) {
        monster.destroy();
      }
    }

    monster.health -= fairySet[nowFairy].dmg;
    monster.invincible = true;
    if (monster.health <= 0){
      monster.destroy();
      monsterCount -= 1;
    }
  }
}


// 임시 구멍 구현 
function hithole(hole,monster){
  hole.hp -= 1
  monster.destroy()

  if (hole.hp <= 0){
    console.log('game over')
  }
  
}


function addMonster(scene,mon_name, mon_anime,hp,velo,x,y,type){
  monster = new Enemy(scene, hp, velo, x, y, mon_name, mon_anime,type);
  monsterCount += 1;
  monsterSet.add(monster);
  scene.physics.add.collider(monsterSet, monster);
  monster.anime();
}




function enemySpawn(scene){
  randomLocation = Math.floor(Math.random() * 4) + 1
  if (randomLocation === 1) {
    monX = Phaser.Math.Between(player.x - 1000, player.x + 1000);
    monY = Phaser.Math.Between(player.y + 1000, player.y + 1010);
  }

  else if (randomLocation === 2) {
    monX = Phaser.Math.Between(player.x - 1000, player.x + 1000);
    monY = Phaser.Math.Between(player.y - 1000, player.y - 1010);
  }

  else if (randomLocation === 3) {
    monX = Phaser.Math.Between(player.x - 1000, player.x - 1000);
    monY = Phaser.Math.Between(player.y - 1000, player.y + 1000);
  }

  else if (randomLocation === 4) {
    monX = Phaser.Math.Between(player.x + 1000, player.x + 1000);
    monY = Phaser.Math.Between(player.y - 1000, player.y + 1000);}
}




// slime_pattern(){
//   if(this.pt == 1){
//       bossSet[0].destory()
//       for (let i; i<10; i++){
//           slime_king_copy = new Boss(scene,50,100,boss.x,boss.y,'slime_king_2','swarm',5,2)
//           slime_king.anime()
//           bossSet.add(slime_king_copy)
//       }
      
//   }
// }
//enemy end
