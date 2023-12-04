import 'phaser';
import Phaser from 'phaser';
import GameScene from './Scene/GameScene';
import Event1 from './Scene/Event1';
import Event2 from './Scene/Event2';
import InputClass from './Scene/InputClass';

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    width: 1280,
    height: 720,
    parent: 'content',
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300}, // ! Global gravity
            debug: false
        }
    },
    scene: [
        GameScene,
        Event1,
        Event2,
        InputClass,
    ]
}
let game = new Phaser.Game(config);