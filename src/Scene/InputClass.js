import Phaser, { Utils } from "phaser";
import * as Initialize from "../utils/Initialize";

class InputClass extends Phaser.Scene {
  constructor() {
    super("InputClass");
  }

  preload() {
    Initialize.preload.call(this); //! ignore initialize preload
    //* start coding here
  }

  create() {
    Initialize.create.call(this, true); //! ignore initialize create | true = apply physics
    //* start coding here

    //* pointer track
    // this.input.on("pointermove", () => {
    //   this.player.x = this.input.x;
    //   this.player.y = this.input.y;
    // });

    //* use pointerdown with player
    this.input.on("pointerdown", () => {
      this.player.setVelocityY(-100);
    });

    //* use pointerup with player
    this.input.on("pointerup", () => {
      this.player.setVelocityY(100);
    });

    //* use pointerover with player
    this.input.on("pointerover", () => {
      this.player.setVelocityY(-100);
    });

    //* create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    //* create custom key
    this.W = this.input.keyboard.addKey("W");
    this.A = this.input.keyboard.addKey("A");
    this.S = this.input.keyboard.addKey("S");
    this.D = this.input.keyboard.addKey("D");

    //* button interaction
    this.button.on("pointerdown", () => {
      this.player.setVelocityY(-300);
    });
  }

  update() {
    Initialize.update.call(this); //! ignore initialize update
    //* start coding here

    //* use pointerdown with player but update
    if (this.input.activePointer.isDown) {
      this.player.setVelocityY(-100);
    }

    //* use cursor keys with player
    if (this.cursors.up.isDown || this.W.isDown) {
      this.player.setVelocityY(-100);
    } else if (this.cursors.down.isDown || this.S.isDown) {
      this.player.setVelocityY(100);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.left.isDown || this.A.isDown) {
      this.player.setVelocityX(-100);
    } else if (this.cursors.right.isDown || this.D.isDown) {
      this.player.setVelocityX(100);
    } else {
      this.player.setVelocityX(0);
    }

    // //* use custom key with player
    // if (this.W.isDown) {
    //   this.player.setVelocityY(-100);
    // } else if (this.S.isDown) {
    //   this.player.setVelocityY(100);
    // } else {
    //   this.player.setVelocityX(0);
    // }

    // if (this.A.isDown) {
    //   this.player.setVelocityX(-100);
    // } else if (this.D.isDown) {
    //   this.player.setVelocityX(100);
    // } else {
    //   this.player.setVelocityX(0);
    // }
  }
}

export default InputClass;
