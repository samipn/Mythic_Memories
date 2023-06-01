// Global variables
const SCALE = 0.5;
const tileSize = 209;
const MAX_VELOCITY = 300;
const objectDepth = 0;
const playerDepth = 1;
const envDepth = -1;
let inventory = [];
let pedastalArtifacts = [false, false, false, false];
let level1Complete = false;
let level2Complete = false;
let level3Complete = false;
let level4Complete = false;

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
    scene: [CentralHub, MusicPuzzle, BowPuzzle],
    title: "Mythic Memories"
});