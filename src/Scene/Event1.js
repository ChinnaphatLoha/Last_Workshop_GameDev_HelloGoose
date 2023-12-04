import Phaser from "phaser";

class Event1 extends Phaser.Scene {
  constructor() {
    super({
      key: "Event1",
    });
    this.bg;
    this.platforms;
    this.score = 0;
  }

  preload() {
    this.load.image("key", "assets/image/game-scene/components/key.png");
  }

  collectCoin(player, coin) {
    coin.destroy()
    console.log('Coin collected!')
    // ? sending event
    // Trigger a custom event when a coin is collected
    this.events.emit('collectedCoin', 1, 'Bobby')
  }

  initScene() {
    this.bg = this.add
      .tileSprite(0, 0, 1500, 720, "bg-pink") // x, y, width, height, key
      .setOrigin(0, 0); // set origin to // ! top left

    this.platform = this.add
      .tileSprite(0, 600, 1500, 100, "platform")
      .setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.platform);

    this.player = this.physics.add.sprite(700, 350, "goose").setScale(0.5);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.world.enable(this.player);
    this.physics.add.collider(this.player, this.platform);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  initCoins() {
    this.coins = this.physics.add.group({
      key: "key",
      repeat: 4,
      setXY: { x: 50, y: 0, stepX: 280 },
    });

    this.coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(this.coins, this.platform);
    this.physics.add.overlap(
      this.player, // ? object 1
      this.coins, // ? object 2
      this.collectCoin, // * callback function
      null,
      this
    );
  }

  create() {
    this.initScene();
    this.initCoins();

    // ! set event listener
    this.events.on(
      'collectedCoin', // listener event
      function (score1, name) { // funciton that you need to execute.
        this.score += score1
        console.log(`Score : ${this.score}`)
        console.log(name)
      },
      this //scope
    )
    this.events.on(
      'endGame',
      function () {
        // TODO closing all event before load another scene.
        this.events.off('collectedCoin')
        this.events.off('endGame')
        this.scene.start('Event2')
      },
      this
    )
  }

  playerMove() {
    // Check for keyboard input and update player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-400);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(400);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      console.log("jump");
      // Allow the player to jump only if touching the ground
      this.player.setVelocityY(-200);
    }
  }

  update() {
    this.playerMove();

    // ! Endgame
    if(this.score === 0) {
      // start another scene.
      this.events.emit('endGame')
    }
  }
}

export default Event1;
