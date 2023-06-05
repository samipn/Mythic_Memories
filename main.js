// Global variables
const SCALE = 0.5;
const tileSize = 209;
const wallSize = 16;
const MAX_VELOCITY = 300;
const visionDepth = 6;
const dialogueDepth = 5;
const invArtDepth = 4;
const invDepth = 3;
const objectDepth = 2;
const playerDepth = 1;
const envDepth = 0;
let inventory = [];
let pedestalArtifacts = [false, false, false, false];
let tutorialDone = false;
let gameDone = false;
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
            gravity: {
                x : 0,
                y : 0
            }
        }
    },
    backgroundColor: 0x000000,
    scene: [TitleScreen, CentralHub, MusicPuzzle, BowPuzzle, RiddlePuzzle, MazePuzzle, EndScreen],
    title: "Mythic Memories"
});