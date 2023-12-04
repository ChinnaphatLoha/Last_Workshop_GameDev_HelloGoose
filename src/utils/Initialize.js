export function preload() {
  //background
  this.load.image(
    "background",
    "assets/image/game-scene/background/background-dark.png"
  );
  this.load.image(
    "background_Layer2",
    "assets/image/game-scene/background/bg-dark-layer2.png"
  );
  this.load.image(
    "background_Layer1",
    "assets/image/game-scene/background/bg-dark-layer1.png"
  );

  //clouds
  this.load.image("cloud1", "assets/image/game-scene/platforms/cl-long.png");
  this.load.image("cloud2", "assets/image/game-scene/platforms/cl.png");
  this.load.image("cloud3", "assets/image/game-scene/platforms/cl-long2.png");

  //sakura animation
  this.load.spritesheet(
    "sakuraAnim",
    "assets/image/game-scene/spritesheets/sakuraAnim.png",
    {
      frameWidth: 888,
      frameHeight: 627,
    }
  );

  //platforms
  this.load.image(
    "platform-base",
    "assets/image/game-scene/platforms/platform-long4.png"
  );

  //player
  this.load.image("player", "assets/image/_dev/ufo.png");

  //button
  this.load.image("button", "assets/ui/up.png");
}

export function create(applyPhysics) {
  // Background
  this.bg = this.add.tileSprite(0, 0, 1280, 720, "background").setOrigin(0, 0);
  this.bgLayer1 = this.add
    .tileSprite(0, 0, 1280, 720, "background_Layer1")
    .setOrigin(0, 0);
  this.bgLayer2 = this.add
    .tileSprite(0, 0, 1280, 720, "background_Layer2")
    .setOrigin(0, 0);

  // Cloud Group with clouds
  this.cloudGroup = this.physics.add.staticGroup();

  this.cloud1 = this.cloudGroup
    .create(100, 500, "cloud1")
    .setOrigin(0, 1)
    .setScale(0.6);
  this.cloud2 = this.cloudGroup
    .create(1240, 330, "cloud2")
    .setOrigin(1, 1)
    .setScale(0.6);
  this.cloud3 = this.cloudGroup
    .create(200, 200, "cloud3")
    .setOrigin(0, 1)
    .setScale(0.6);

  // Sakura with animation
  this.sakura = this.add
    .sprite(890, 660, "sakuraAnim")
    .setOrigin(0.5, 1)
    .setScale(0.6);
  this.anims.create({
    key: "sakuraAnim",
    frames: this.anims.generateFrameNumbers("sakuraAnim", {
      start: 0,
      end: 5,
    }),
    frameRate: 5,
    repeat: -1,
  });
  this.sakura.anims.play("sakuraAnim");

  // Platforms
  this.platformBase = this.physics.add
    .sprite(640, 730, "platform-base")
    .setOrigin(0.5, 1)
    .setImmovable(true); // * this line

  this.platformBase.body.allowGravity = false; //! no gravity

  // Player
  this.player = this.physics.add
    .sprite(460, 360, "player")
    .setOrigin(0.5, 0.5)
    .setCollideWorldBounds(true)
    .setScale(0.05)
    .setSize(2000, 1000);

  this.button = this.add.image(1200, 600, "button").setScale(5).setDepth(1);

  if (applyPhysics) {
    this.player.setGravityY(300);
    this.player.setInteractive();
    this.physics.add.collider(this.player, this.platformBase);
    this.platformBase.body.immovable = true;
    this.platformBase.body.allowGravity = false;
  }
}

export function update() {
  // Background movement
  this.bg.tilePositionX += 0.03;
  this.bgLayer1.tilePositionX += 0.07;
  this.bgLayer2.tilePositionX += 0.1;
}
