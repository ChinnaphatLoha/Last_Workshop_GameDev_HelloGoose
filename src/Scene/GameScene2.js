import Phaser, { Game, Utils } from "phaser";
import * as Initialize from "../utils/Initialize";

class GameScene2 extends Phaser.Scene {
  constructor() {
    super("GameScene2");
    this.score = 0;
    this.coinsRequire = 15;
    this.coins;
  }

  preload() {
    Initialize.preload.call(this); //! ignore initialize preload
    //* start coding here

    this.load.image("coin", "assets/image/game-scene/components/milk.png");
  }

  collectCoin(player, coin) {
    // * This function will be called when the player overlaps with the coin
    coin.destroy(); // Remove the coin sprite
    console.log("Coin collected!");

    // * Trigger a custom event when a coin is collected
    this.events.emit("coinCollected", 1); // You can pass additional data, such as the number of coins collected
    this.events.emit("createCoin", 1);
  }

  initCoins(numberOfCoins = 1) {
    // ? looping for adding coins
    for (let i = 0; i < numberOfCoins; i++) {
      //random position
      const fence = 100;
      const randomX = Phaser.Math.Between(fence, 1280 - fence);
      const randomY = Phaser.Math.Between(fence, 720 - fence);
      //create coin in group coins
      this.coins.create(randomX, randomY, "coin");
    }
  }

  initUI() {
    //  Display the game stats
    this.info = this.add
      .text(10, 10, "", { font: "52px Arial", fill: "#000000" })
      .setDepth(10);
  }

  createEvents() {
    // TODO Create an event listener for listen coin collected
    this.events.on("coinCollected", (numCoins) => {
      this.score += numCoins;
      console.log(`Score: ${this.score}`);
    });

    // TODO Create an event listener for create new coins
    this.events.on("createCoin", this.initCoins, this);

    // TODO Create an event listener for game over
    this.events.on("gameOver", () => {
      this.add
        .text(720, 420, "Game Over", { font: "52px Arial", fill: "#000000" })
        .setDepth(10);
      this.scene.pause();
      this.events.off("coinCollected");
      this.events.off("createCoin");
    });

    // TODO Create a timer for game over
    this.timeLimit = this.time.addEvent({
      delay: 20000,
      callback: () => {
        if (this.score < this.coinsRequire) {
          console.log("Emit event Game Over!");
          this.events.emit("gameOver");
        } else {
          this.coinsRequire += 15;
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  create() {
    Initialize.create.call(this); //! ignore initialize create
    //* start coding here
    this.initUI();
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // * Create a group for all coins
    this.coins = this.physics.add.staticGroup();
    this.initCoins(3);
    // * if player overlaps with a coin, call collectCoin function
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    );

    this.createEvents();
  }

  playerMovement() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-400);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(400);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-400);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(400);
    } else {
      this.player.setVelocityY(0);
    }
  }

  update(time, delta) {
    Initialize.update.call(this); //! ignore initialize update
    //* start coding here
    this.playerMovement();

    this.info.setText(
      `Score: ${this.score}/${this.coinsRequire}\nTime left : ${Math.floor(
        this.timeLimit.getRemainingSeconds()
      )}`
    );
  }
}

export default GameScene2;
