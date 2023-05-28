// Global variables
const SCALE = 0.5;
const tileSize = 209;
const MAX_VELOCITY = 300;
const objectDepth = 2;
const playerDepth = 1;
const envDepth = 0;

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x : 0,
                y : 0
            }
        }
    },
    backgroundColor: 0x87CEEB,
    scene: [CoreGameplay],
    title: "Mythic Memories"
});