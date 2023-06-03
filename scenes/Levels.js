class CentralHub extends Phaser.Scene {
    constructor() {
        super('centralhub');
    }
    preload() {
      this.load.path = "./assets/";		
      this.load.image('Beta Apollo', 'BetaApollo.png');
      this.load.image('Top Wall', 'topWall.png');
      this.load.image('Bottom Wall', 'botWall.png');
      this.load.image('Right Wall', 'rightWall.png');
      this.load.image('Left Wall', 'leftWall.png');
      this.load.image('Pedestal', 'Pedestal.png')
      this.load.image('Floor', 'Floor.png');
      this.load.image('Dirt', 'Dirt.png');
      this.load.image('Door', 'Door.png');
      this.load.image('Lyre', 'Lyre.png');
      this.load.image('Bow', 'Bow.png');
      this.load.image('Scroll', 'Scroll.png');
    }
    create() {
        this.inventoryArtifact = this.add.sprite(450, 675, 'Lyre').setOrigin(0.5,1);
        this.inventoryArtifact.setDepth(objectDepth);
        if(inventory.length > 0) {
            this.inventoryArtifact.destroy();
        }

        // Make group for all collidable objects
        this.objects = this.add.group();

        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo').setOrigin(0.5);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(57,20);
        this.player.body.setOffset(7, 135);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(57,20);
        this.playerInteractBox.body.setOffset(7, 135);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(220, 50, wallSize * 8 * 12, wallSize * 12, 'Top Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.botWall.name = "botWall";
        this.physics.add.existing(this.botWall);
        this.botWall.body.setSize(wallSize * 94, 100);
        this.botWall.body.setOffset(0, 100);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(objectDepth);
        this.walls.add(this.botWall);
        this.objects.add(this.botWall);

        this.leftWall = this.add.sprite(100, 50, 'Left Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.sprite(1820 - (wallSize*SCALE), 50, 'Right Wall').setScale(1).setOrigin(1,0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(-3);

        // Created pedestals
        this.pedestals = this.add.group();

        this.pedestal1 = this.add.sprite(450,700,'Pedestal').setOrigin(0.5);
        this.pedestal1.name = "pedestal1";
        this.physics.add.existing(this.pedestal1);
        this.pedestal1.body.immovable = true;
        this.pedestal1.body.setSize(tileSize,tileSize/2 + 20);
        this.pedestal1.body.setOffset(0,tileSize/2 + 20);
        this.pedestal1.setDepth(objectDepth);
        this.pedestals.add(this.pedestal1);
        this.objects.add(this.pedestal1);

        this.pedestal2 = this.add.sprite(750,700,'Pedestal').setOrigin(0.5);
        this.pedestal2.name = "pedestal2";
        this.physics.add.existing(this.pedestal2);
        this.pedestal2.body.immovable = true;
        this.pedestal2.body.setSize(tileSize,tileSize/2 + 20);
        this.pedestal2.body.setOffset(0,tileSize/2 + 20);
        this.pedestal2.setDepth(objectDepth);
        this.pedestals.add(this.pedestal2);
        this.objects.add(this.pedestal2);

        this.pedestal3 = this.add.sprite(1050,700,'Pedestal').setOrigin(0.5);
        this.pedestal3.name = "pedestal3";
        this.physics.add.existing(this.pedestal3);
        this.pedestal3.body.immovable = true;
        this.pedestal3.body.setSize(tileSize,tileSize/2 + 20);
        this.pedestal3.body.setOffset(0,tileSize/2 + 20);
        this.pedestal3.setDepth(objectDepth);
        this.pedestals.add(this.pedestal3);
        this.objects.add(this.pedestal3);

        this.pedestal4 = this.add.sprite(1350,700,'Pedestal').setOrigin(0.5);
        this.pedestal4.name = "pedestal4";
        this.physics.add.existing(this.pedestal4);
        this.pedestal4.body.immovable = true;
        this.pedestal4.body.setSize(tileSize,tileSize/2 + 20);
        this.pedestal4.body.setOffset(0,tileSize/2 + 20);
        this.pedestal4.setDepth(objectDepth);
        this.pedestals.add(this.pedestal4);
        this.objects.add(this.pedestal4);


        // Created Puzzle Doors
        this.puzzledoors = this.add.group();

        this.puzzleDoor1 = this.physics.add.sprite(450, 157, 'Door').setOrigin(0.5).setScale(4);
        this.puzzleDoor1.body.immovable = true;
        this.puzzleDoor1.body.setSize(30,60);
        this.puzzleDoor1.body.setOffset(35, 17);
        this.puzzleDoor1.setDepth(envDepth);
        this.puzzledoors.add(this.puzzleDoor1);

        this.puzzleDoor2 = this.physics.add.sprite(750, 157, 'Door').setOrigin(0.5).setScale(4);
        this.puzzleDoor2.body.immovable = true;
        this.puzzleDoor2.body.setSize(30,60);
        this.puzzleDoor2.body.setOffset(35, 17);
        this.puzzleDoor2.setDepth(envDepth);
        this.puzzledoors.add(this.puzzleDoor2);

        this.puzzleDoor3 = this.physics.add.sprite(1050, 157, 'Door').setOrigin(0.5).setScale(4);
        this.puzzleDoor3.body.immovable = true;
        this.puzzleDoor3.body.setSize(30,60);
        this.puzzleDoor3.body.setOffset(35, 17);
        this.puzzleDoor3.setDepth(envDepth);
        this.puzzledoors.add(this.puzzleDoor3);

        this.puzzleDoor4 = this.physics.add.sprite(1350, 157, 'Door').setOrigin(0.5).setScale(4);
        this.puzzleDoor4.body.immovable = true;
        this.puzzleDoor4.body.setSize(30,60);
        this.puzzleDoor4.body.setOffset(35, 17);
        this.puzzleDoor4.setDepth(envDepth);
        this.puzzledoors.add(this.puzzleDoor4);

        // Created artifacts
        this.lyre = this.add.sprite(450, 650, 'Lyre').setOrigin(0.5,1);
        this.lyre.setDepth(objectDepth);
        this.lyre.visible = false;

        this.bow = this.add.sprite(750, 650, 'Bow').setOrigin(0.5,1);
        this.bow.setDepth(objectDepth);
        this.bow.visible = false;

        this.scroll = this.add.sprite(1050, 650, 'Scroll').setOrigin(0.5,1);
        this.scroll.setDepth(objectDepth);
        this.scroll.visible = false;
        
        // Created overlap hitboxes
        this.pedestal1OverlapBody = this.add.sprite(this.pedestal1.x, this.pedestal1.y,'Pedestal').setOrigin(0.5);
        this.physics.add.existing(this.pedestal1OverlapBody);
        this.pedestal1OverlapBody.body.immovable = true;
        this.pedestal1OverlapBody.visible = false;

        this.pedestal2OverlapBody = this.add.sprite(this.pedestal2.x, this.pedestal2.y,'Pedestal').setOrigin(0.5);
        this.physics.add.existing(this.pedestal2OverlapBody);
        this.pedestal2OverlapBody.body.immovable = true;
        this.pedestal2OverlapBody.visible = false;
        
        this.pedestal3OverlapBody = this.add.sprite(this.pedestal3.x, this.pedestal3.y,'Pedestal').setOrigin(0.5);
        this.physics.add.existing(this.pedestal3OverlapBody);
        this.pedestal3OverlapBody.body.immovable = true;
        this.pedestal3OverlapBody.visible = false;

        this.pedestal4OverlapBody = this.add.sprite(this.pedestal4.x, this.pedestal4.y,'Pedestal').setOrigin(0.5);
        this.physics.add.existing(this.pedestal4OverlapBody);
        this.pedestal4OverlapBody.body.immovable = true;
        this.pedestal4OverlapBody.visible = false;

        this.botWallOverlapBody = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.botWallOverlapBody);
        this.botWallOverlapBody.setDepth(-2);
        this.botWallOverlapBody.body.immovable = true;
        this.botWallOverlapBody.visible = false;

        // Inventory GUI
        this.updateInventory();
        let invRect = this.add.rectangle(1750, 950, 400, 300, 0x136207);
        invRect.setDepth(3);
        let invText = this.add.text(1570, 820, "Inventory", {fontSize: 40});
        invText.setDepth(4);

        // Physics stuff
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.pedestals);
        this.physics.add.overlap(this.player, this.puzzledoors, this.interactDoor, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.pedestals, this.interactPedestal, null, this);
    }
    update() {
        // Hacky overlap detection
        this.objects.children.each((object) => {
            
            // slap on OverlapBody to end of object (convention for overlap vs object collision)
            let dynamicVariableName = object.name + "OverlapBody";
            let dynamicVariable = this[dynamicVariableName];
            // check if its inside object using intersection area to prevent colliding triggers
            let intersection = Phaser.Geom.Rectangle.Intersection(this.player.body, dynamicVariable.body);
            let intersectionArea = Phaser.Geom.Rectangle.Area(intersection);
            // dynamically set depths
            if (intersectionArea > 0) {
                object.alpha = 0.7;
            } else{
                object.alpha = 1;
            }
        });

        if(pedestalArtifacts[0] == true) {
            this.lyre.visible = true;
        }
        if(pedestalArtifacts[1] == true) {
            this.bow.visible = true;
        }
        if(pedestalArtifacts[2] == true) {
            this.scroll.visible = true;
        }

        // Have interact hitbox follow player
        this.playerInteractBox.x = this.player.x;
        this.playerInteractBox.y = this.player.y;
        
        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(57,50);
            this.playerInteractBox.body.setOffset(7,85);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(57,50);
            this.playerInteractBox.body.setOffset(7,155);
        }
        else {
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,140);
            this.playerInteractBox.body.setOffset(-65,0);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,140);
            this.playerInteractBox.body.setOffset(65,0);
        }
        else {
            this.player.setVelocityX(0);
        }
    }

    interactDoor(player, door) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                if(door == this.puzzleDoor1) {
                    this.scene.start('musicpuzzle');
                }
                if(door == this.puzzleDoor2) {
                    this.scene.start('bowpuzzle');
                }
                if(door == this.puzzleDoor3) {
                    this.scene.start('riddlepuzzle');
                }
                if(door == this.puzzleDoor4) {
                    this.scene.start('mazepuzzle');
                }
            });
        }
    }

    interactPedestal(player, pedestal) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && (pedestal == this.pedestal1)) {
            if(inventory.length == 1 && inventory[0] == 'Lyre') {
                console.log("artifact placed on pedestal");
                pedestalArtifacts[0] = true;
                inventory.pop();
                this.updateInventory();
            }
            else if(inventory.length < 1) {
                console.log("You need to find something to place here");
            }
            else {
                console.log("You don't have the right artifact to place here");
            }
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && (pedestal == this.pedestal2)) {
            if(inventory.length == 1 && inventory[0] == 'Bow') {
                console.log("artifact placed on pedestal");
                pedestalArtifacts[1] = true;
                inventory.pop();
                this.updateInventory();
            }
            else if(inventory.length < 1) {
                console.log("You need to find something to place here");
            }
            else {
                console.log("You don't have the right artifact to place here");
            }
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && (pedestal == this.pedestal3)) {
            if(inventory.length == 1 && inventory[0] == 'Scroll') {
                console.log("artifact placed on pedestal");
                pedestalArtifacts[2] = true;
                inventory.pop();
                this.updateInventory();
            }
            else if(inventory.length < 1) {
                console.log("You need to find something to place here");
            }
            else {
                console.log("You don't have the right artifact to place here");
            }
        }
    }

    updateInventory() {
        if(inventory.length > 0) {
            this.inventoryArtifact = this.add.sprite(1700,960, inventory[0]).setScale(1.5);
            this.inventoryArtifact.setDepth(objectDepth);
            console.log(this.inventoryArtifact);
        } else {
            this.inventoryArtifact.destroy();
        }
    }
}

class MusicPuzzle extends Phaser.Scene {
    constructor() {
        super('musicpuzzle');
    }
    preload() {
        this.load.path = "./assets/";		
        this.load.image('Play', 'Play.png');
        this.load.image('Reset', 'Reset.png');
        this.load.audio('audio1', '1.mp3');
        this.load.audio('audio2', '2.mp3');
        this.load.audio('audio3', '3.mp3');
        this.load.audio('audio4', '4.mp3');
        this.load.image('mn1', 'MN1.png');
        this.load.image('mn2', 'MN2.png');
        this.load.image('mn3', 'MN3.png');
        this.load.image('mn4', 'MN4.png');
        this.load.image('mb', 'Music Box.png')
    }
    create() {
        this.inventoryArtifact = this.add.sprite(450, 675, 'Lyre').setOrigin(0.5,1);
        // Create audio
        this.audio0 = this.sound.add('audio1');
        this.audio1 = this.sound.add('audio1');
        this.audio2 = this.sound.add('audio2');
        this.audio3 = this.sound.add('audio3');
        this.audio4 = this.sound.add('audio4');

        this.playing = false;
        this.musicSlots = ['audio0', 'audio0', 'audio0', 'audio0'];
        this.playedOrder = [];
        
        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, 800, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(57,20);
        this.player.body.setOffset(7, 135);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(57,20);
        this.playerInteractBox.body.setOffset(7, 135);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(220, 50, wallSize * 8 * 12, wallSize * 12, 'Top Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.botWall.name = "botWall";
        this.physics.add.existing(this.botWall);
        this.botWall.body.setSize(wallSize * 94, 100);
        this.botWall.body.setOffset(0, 100);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(envDepth);
        this.walls.add(this.botWall);
        // this.objects.add(this.botWall);

        this.leftWall = this.add.sprite(100, 50, 'Left Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.sprite(1820 - (wallSize*SCALE), 50, 'Right Wall').setScale(1).setOrigin(1,0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(-3);

        // Created music puzzle pieces
        this.pieces = this.add.group();

        this.piece1 = this.physics.add.sprite(450, 700, 'mn1').setOrigin(0.5);
        this.piece1.name = "audio1";
        this.piece1.setCollideWorldBounds(true);
        this.piece1.setDepth(objectDepth);
        this.pieces.add(this.piece1);

        this.piece2 = this.physics.add.sprite(750, 700, 'mn2').setOrigin(0.5);
        this.piece2.name = "audio2";
        this.piece2.setCollideWorldBounds(true);
        this.piece2.setDepth(objectDepth);
        this.pieces.add(this.piece2);

        this.piece3 = this.physics.add.sprite(1050, 700, 'mn3').setOrigin(0.5);
        this.piece3.name = "audio3";
        this.piece3.setCollideWorldBounds(true);
        this.piece3.setDepth(objectDepth);
        this.pieces.add(this.piece3);

        this.piece4 = this.physics.add.sprite(1350, 700, 'mn4').setOrigin(0.5).setScale(0.7);
        this.piece4.name = "audio4";
        this.piece4.setCollideWorldBounds(true);
        this.piece4.setDepth(objectDepth);
        this.pieces.add(this.piece4);

        // Create piece slots
        this.pieceSlots = this.add.group();

        this.pieceSlot1 = this.physics.add.sprite(735, 400, 'mb').setOrigin(0.5);
        this.pieceSlot1.body.immovable = true;
        this.pieceSlot1.setCollideWorldBounds(true);
        this.pieceSlot1.setDepth(envDepth);
        this.pieceSlots.add(this.pieceSlot1);

        this.pieceSlot2 = this.physics.add.sprite(885, 400, 'mb').setOrigin(0.5);
        this.pieceSlot2.body.immovable = true;
        this.pieceSlot2.setCollideWorldBounds(true);
        this.pieceSlot2.setDepth(envDepth);
        this.pieceSlots.add(this.pieceSlot2);

        this.pieceSlot3 = this.physics.add.sprite(1035, 400, 'mb').setOrigin(0.5);
        this.pieceSlot3.body.immovable = true;
        this.pieceSlot3.setCollideWorldBounds(true);
        this.pieceSlot3.setDepth(envDepth);
        this.pieceSlots.add(this.pieceSlot3);

        this.pieceSlot4 = this.physics.add.sprite(1185, 400, 'mb').setOrigin(0.5);
        this.pieceSlot4.body.immovable = true;
        this.pieceSlot4.setCollideWorldBounds(true);
        this.pieceSlot4.setDepth(envDepth);
        this.pieceSlots.add(this.pieceSlot4);

        // Create hub door
        this.hubDoor = this.physics.add.sprite(game.config.width/2, 950, 'Door').setOrigin(0.5).setScale(3);
        this.hubDoor.body.immovable = true;
        this.hubDoor.body.setSize(30,60);
        this.hubDoor.body.setOffset(35, 17);
        this.hubDoor.setAngle(180);
        this.hubDoor.setDepth(objectDepth);

        // Create play button
        this.playButton = this.physics.add.sprite(1400, 400, 'Play').setOrigin(0.5).setScale(3);
        this.playButton.body.immovable = true;
        
        // Create reset button
        this.resetButton = this.physics.add.sprite(550, 400, 'Reset').setOrigin(0.5).setScale(0.15);
        this.resetButton.body.immovable = true;

        // Create music play
        const playNextAudio = () => {
            console.log(this.musicSlots);
            console.log(this.playedOrder);
            if (this.musicSlots.length > 0) {
                let audioName = this.musicSlots.shift();
                if(audioName != 'audio0') {
                    let audio = this[audioName];
                    audio.play();
                    this.playedOrder.push(audioName);
                    audio.once('complete', () => {
                        playNextAudio(); // Call the local arrow function recursively
                    });
                } else {
                    playNextAudio();
                }
            } else {
                this.checkSuccess();
            }
        }

        this.playMusic = (player, button) => {
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && (this.playing === false) && (level1Complete == false) && (this.musicSlots.length > 0)) {
              playNextAudio(); // Call the local arrow function to start playing the audio
              this.playing = true;
            }
        };

        // Create Artifact (Level Complete)
        this.lyre = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Lyre').setOrigin(0.5);
        this.lyre.body.immovable = true;
        this.lyre.body.enable = false;
        this.lyre.visible = false;

        // Inventory GUI
        this.updateInventory();
        let invRect = this.add.rectangle(1750, 950, 400, 300, 0x000000);
        invRect.setDepth(envDepth);
        this.add.text(1570, 820, "Inventory", {fontSize: 40});

        // Player Physics
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.pieceSlots);
        this.physics.add.collider(this.player, this.playButton);
        this.physics.add.collider(this.player, this.resetButton);
        this.physics.add.collider(this.player, this.lyre);
        this.physics.add.collider(this.player, this.pieces, this.pushPiece, null, this);
        this.physics.add.overlap(this.player, this.hubDoor, this.interactDoor, null, this);

        // Piece Physics
        this.physics.add.collider(this.pieces, this.walls, this.stopPushing, null, this);
        this.physics.add.collider(this.pieces, this.pieces, this.pushPiece, null, this);
        this.physics.add.overlap(this.pieces, this.pieceSlots, this.slotPiece, null, this);

        // playerHitbox Physics
        this.physics.add.overlap(this.playerInteractBox, this.pieces, this.playFragment, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.playButton, this.playMusic, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.resetButton, this.resetPieces, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.lyre, this.pickUp, null, this);
    }

    update() {
        // Have interact hitbox follow player
        this.playerInteractBox.x = this.player.x;
        this.playerInteractBox.y = this.player.y;

        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(57,50);
            this.playerInteractBox.body.setOffset(7,85);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(57,50);
            this.playerInteractBox.body.setOffset(7,155);
        }
        else {
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,140);
            this.playerInteractBox.body.setOffset(-65,0);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,140);
            this.playerInteractBox.body.setOffset(65,0);
        }
        else {
            this.player.setVelocityX(0);
        }

        this.pieces.children.each((piece) => {
            piece.setVelocityX(0);
            piece.setVelocityY(0);
        });
    }

    pushPiece(player, piece) {
        if (player.body.touching.left) {
            piece.setVelocityX(player.body.velocity.x);
        } else if (player.body.touching.right) {
            piece.setVelocityX(player.body.velocity.x);
        } else if (player.body.touching.up) {
            piece.setVelocityY(player.body.velocity.y);
        } else if (player.body.touching.down) {
            piece.setVelocityY(player.body.velocity.y);
        }
    }

    stopPushing(piece, wall) {
        piece.setPushable(false);
    }

    slotPiece(piece, slot) {
        piece.x = slot.body.x + 40;
        piece.y = slot.body.y + 50;
        piece.body.immovable = true;
        piece.body.enable = false;
        if(slot == this.pieceSlot1) {
            this.musicSlots[0] = piece.name;
        }
        else if(slot == this.pieceSlot2) {
            this.musicSlots[1] = piece.name;
        }
        else if(slot == this.pieceSlot3) {   
            this.musicSlots[2] = piece.name;  
        }
        else if(slot == this.pieceSlot4) {
            this.musicSlots[3] = piece.name;
        }
        console.log(this.musicSlots);
    }

    resetPieces() {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && level1Complete == false) {
            this.playedOrder = [];
            this.musicSlots = ['audio0', 'audio0', 'audio0', 'audio0'];
            this.playing = false;
            let pieceX = 450;
            let pieceY = 700;
            this.pieces.children.each((piece) => {
                piece.x = pieceX;
                piece.y = pieceY;
                piece.body.immovable = false;
                piece.body.enable = true;
                piece.setPushable(true);
                pieceX += 300;
            });
            this.audio0.stop();
            this.audio1.stop();
            this.audio2.stop();
            this.audio3.stop();
        }
    }

    playFragment(hitbox, piece) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.playing == false && level1Complete == false) {
            this.playing = true;
            let audio = this[piece.name];
            audio.play();
            audio.once('complete', () => {
                this.playing = false;
            });

        }
    }

    checkSuccess() {
        if(this.playedOrder.length == 4 && (this.playedOrder[0] == 'audio1' && this.playedOrder[1] == 'audio2' && this.playedOrder[2] == 'audio3' && this.playedOrder[3] == 'audio4')) {
            level1Complete = true;
            this.lyre.body.enable = true;
            this.lyre.visible = true;
            console.log("artifact piece spawns");
            console.log("on pickup dialogue appears and diff character screen");
            console.log("on exit of dialogue, player can walk back to central hub")
        } else {
            this.playedOrder = [];
            this.musicSlots = ['audio0', 'audio0', 'audio0', 'audio0'];
            this.playing = false;
            let pieceX = 450;
            let pieceY = 700;
            this.pieces.children.each((piece) => {
                piece.x = pieceX;
                piece.y = pieceY;
                piece.body.immovable = false;
                piece.body.enable = true;
                piece.setPushable(true);
                pieceX += 300;
            });
        }
    }

    pickUp () {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            inventory.push('Lyre');
            this.lyre.body.enable = false;
            this.lyre.visible = false;
            this.updateInventory();
        }
    }

    updateInventory() {
        if(inventory.length > 0) {
            this.inventoryArtifact = this.add.sprite(1700,960, inventory[0]).setScale(1.5);
            this.inventoryArtifact.setDepth(objectDepth);
            console.log(this.inventoryArtifact);
        } else {
            this.inventoryArtifact.destroy();
        }
    }

    interactDoor(player, door) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('centralhub');
            });
        }
    }

}

//Arrow Class
class Arrow extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y) {
		super(scene, x, y, 'Arrow');
	}

	fire(x, y) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);
        this.setDepth(objectDepth);
        this.setScale(0.3);
        this.setVelocityY(-400);
	}

}

//Arrow Group
class ArrowGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		super(scene.physics.world, scene);

        this.frameQuantity = 10;
		this.createMultiple({
			frameQuantity: this.frameQuantity,
			key: 'Arrow',
			active: false,
			visible: false,
			classType: Arrow
		});
	}

	fireArrow(x, y) {
		const arrow = this.getFirstDead(false);

		if(arrow) {
			arrow.fire(x, y);
            this.frameQuantity -= 1;
		}
	}

    getFrameQuantity() {
        return this.frameQuantity;
    }
}

class BowPuzzle extends Phaser.Scene {
    constructor() {
        super('bowpuzzle');
		this.ArrowGroup;
		this.inputKeys;
    }

    preload() {
        this.load.path = "./assets/";		
        this.load.image('Arrow', 'Arrow.png');
        this.load.image('Dummy', 'Target.png');
        this.load.image('Npc', 'NPC 1.png');
        this.load.image('Fence', 'Fence.png')
    }

    create() {
        this.inventoryArtifact = this.add.sprite(450, 675, 'Bow').setOrigin(0.5,1);

        this.targetsHit = 0;
        this.hasBow = false;
        
        //Create Arrow
        this.ArrowGroup = new ArrowGroup(this);
        this.addEvents();

        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, 800, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(57,20);
        this.player.body.setOffset(7, 135);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(57,20);
        this.playerInteractBox.body.setOffset(7, 135);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(220, 50, wallSize * 8 * 12, wallSize * 12, 'Top Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.setSize(wallSize * 94, 100);
        this.botWall.body.setOffset(0, 100);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(3);
        this.walls.add(this.botWall);

        this.leftWall = this.add.sprite(100, 50, 'Left Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.sprite(1820 - (wallSize*SCALE), 50, 'Right Wall').setScale(1).setOrigin(1,0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(envDepth);

        // Create fence
        this.fence = this.add.tileSprite(100 + (tileSize*SCALE), 750 - (tileSize*SCALE), tileSize * 14.25, tileSize, 'Fence').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.fence);
        this.fence.body.immovable = true;
        this.fence.setDepth(envDepth)

        // Create targets
        this.Targets = this.add.group();

        this.Target1 = this.physics.add.sprite(450, 300, 'Dummy').setOrigin(0.5).setScale(SCALE*0.9);
        this.Target1.body.immovable = true;
        this.Target1.setCollideWorldBounds(true);
        this.Targets.add(this.Target1);

        this.Target2 = this.physics.add.sprite(750, 300, 'Dummy').setOrigin(0.5).setScale(SCALE*0.9);
        this.Target2.body.immovable = true;
        this.Target2.setCollideWorldBounds(true);
        this.Targets.add(this.Target2);

        this.Target3 = this.physics.add.sprite(1050, 300, 'Dummy').setOrigin(0.5).setScale(SCALE*0.9);
        this.Target3.body.immovable = true;
        this.Target3.setCollideWorldBounds(true);
        this.Targets.add(this.Target3);

        this.Target4 = this.physics.add.sprite(1350, 300, 'Dummy').setOrigin(0.5).setScale(SCALE*0.9);
        this.Target4.body.immovable = true;
        this.Target4.setCollideWorldBounds(true);
        this.Targets.add(this.Target4);

        // Create hub door
        this.hubDoor = this.physics.add.sprite(game.config.width/2, 950, 'Door').setOrigin(0.5).setScale(3);
        this.hubDoor.body.immovable = true;
        this.hubDoor.body.setSize(30,60);
        this.hubDoor.body.setOffset(35, 17);
        this.hubDoor.setAngle(180);
        this.hubDoor.setDepth(objectDepth);

        // Create NPC
        this.Npc = this.physics.add.sprite(270, 800, 'Npc').setOrigin(0.5).setScale(0.7);
        this.Npc.setDepth(envDepth);
        this.Npc.body.immovable = true;

        // Inventory GUI
        this.updateInventory();
        let invRect = this.add.rectangle(1750, 950, 400, 300, 0x136207);
        invRect.setDepth(3);
        let invText = this.add.text(1570, 820, "Inventory", {fontSize: 40});
        invText.setDepth(4);

        // Player Physics
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.Npc);
        this.physics.add.collider(this.player, this.fence);
        this.physics.add.overlap(this.player, this.hubDoor, this.interactDoor, null, this);

        // Arrow Physics
        this.physics.add.collider(this.ArrowGroup, this.walls);
        this.physics.add.collider(this.ArrowGroup, this.Targets, this.destroyTarget, null, this);

        // Player hitbox physics
        this.physics.add.overlap(this.playerInteractBox, this.Npc, this.npcInteract, null, this);
    }

    addEvents() {
		// Clicking the mouse should fire an arrow
		this.input.on('pointerdown', (pointer) => {
			this.fireArrow();
		});

		this.inputKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
		];
	}

	fireArrow() {
        if(this.hasBow == true) {
		    this.ArrowGroup.fireArrow(this.player.x, this.player.y - 20);
        }
	}

    
    update() {
        // Have interact hitbox follow player
        this.playerInteractBox.x = this.player.x;
        this.playerInteractBox.y = this.player.y;

        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(57,50);
            this.playerInteractBox.body.setOffset(7,85);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(57,50);
            this.playerInteractBox.body.setOffset(7,155);
        }
        else {
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,140);
            this.playerInteractBox.body.setOffset(-65,0);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,140);
            this.playerInteractBox.body.setOffset(65,0);
        }
        else {
            this.player.setVelocityX(0);
        }
        
        //Arrow Check
		this.inputKeys.forEach(key => {
			if(Phaser.Input.Keyboard.JustDown(key)) {
				this.fireArrow();
			}
		});
    }

    // If press E on npc
    npcInteract() {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.hasBow == false) {
            this.hasBow = true;
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.targetsHit == 4) {
            this.targetsHit += 1;
            inventory.push('Bow');
            this.updateInventory();
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.ArrowGroup.getFrameQuantity() == 0){
            this.ArrowGroup = new ArrowGroup(this);
            this.physics.add.collider(this.ArrowGroup, this.walls, this.destroyArrow, null, this);
            this.physics.add.collider(this.ArrowGroup, this.Targets, this.destroyTarget, null, this);
            console.log("ur bad here are some more arrows");
        }
    }

    destroyTarget(target, arrow) {
        arrow.destroy();
        target.destroy();
        this.targetsHit += 1;
    }

    updateInventory() {
        if(inventory.length > 0) {
            this.inventoryArtifact = this.add.sprite(1700,960, inventory[0]).setScale(1.5);
            this.inventoryArtifact.setDepth(objectDepth);
            console.log(this.inventoryArtifact);
        } else {
            this.inventoryArtifact.destroy();
        }
    }

    interactDoor(player, door) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('centralhub');
            });
        }
    }
}

class RiddlePuzzle extends Phaser.Scene {
    constructor() {
        super('riddlepuzzle');
    }

    preload() {
        this.load.path = "./assets/";	
        this.load.image('Npc', 'BetaApollo.png');	
    }

    create() {     
        this.currentQuestion = 0;
        this.answerArray = [];
        this.canAnswer = false;

        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(57,20);
        this.player.body.setOffset(7, 135);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(57,20);
        this.playerInteractBox.body.setOffset(7, 135);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(220, 50, wallSize * 8 * 12, wallSize * 12, 'Top Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.setSize(wallSize * 94, 100);
        this.botWall.body.setOffset(0, 100);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(3);
        this.walls.add(this.botWall);

        this.leftWall = this.add.sprite(100, 50, 'Left Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.sprite(1820 - (wallSize*SCALE), 50, 'Right Wall').setScale(1).setOrigin(1,0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(envDepth);
        
        // Create hub door
        this.hubDoor = this.physics.add.sprite(game.config.width/2, 950, 'Door').setOrigin(0.5).setScale(3);
        this.hubDoor.body.immovable = true;
        this.hubDoor.body.setSize(30,60);
        this.hubDoor.body.setOffset(35, 17);
        this.hubDoor.setAngle(180);
        this.hubDoor.setDepth(objectDepth);

        // Create Artifact (Level Complete)
        this.scroll = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Scroll').setOrigin(0.5);
        this.scroll.body.immovable = true;
        this.scroll.body.enable = false;
        this.scroll.visible = false;
        
        // Created Answer Buttons
        this.answerButtons = this.add.group();

        this.answerButtonA = this.physics.add.sprite(450, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.answerButtonA.name = "A";
        this.answerButtonA.body.immovable = true; 
        this.answerButtons.add(this.answerButtonA);

        this.answerButtonB = this.physics.add.sprite(750, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.answerButtonB.name = "B";
        this.answerButtonB.body.immovable = true; 
        this.answerButtons.add(this.answerButtonB);

        this.answerButtonC = this.physics.add.sprite(1050, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.answerButtonC.name = "C";
        this.answerButtonC.body.immovable = true; 
        this.answerButtons.add(this.answerButtonC);

        this.answerButtonD = this.physics.add.sprite(1350, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.answerButtonD.name = "D";
        this.answerButtonD.body.immovable = true; 
        this.answerButtons.add(this.answerButtonD);

        // Create NPC
        this.Npc = this.physics.add.sprite(1600, 700, 'Npc').setOrigin(0.5).setScale(1);
        this.Npc.body.immovable = true;

        // Create riddles
        this.npcText = this.add.text(225, 220, "In order to complete this puzzle you must answer my riddles", {
            fontSize: 40,
            fill: '#000000',
        });
        this.npcText.visible = false;
        this.npcText.setDepth(objectDepth);
        
        this.riddle1 = this.add.text(225, 220, "What musical instrument doesn't tell the truth? \nA. Lute \nB. Lyre \nC. Harp \nD. Piano", {
                fontSize: 40,
                fill: '#000000',
        });
        this.riddle1.visible = false;
        this.riddle1.setDepth(objectDepth);

        this.riddle2 = this.add.text(225, 220, "Though made of wood, I hold strength untold. \nWith tension and release, my purpose unfolds. \nA. Bow \nB. Spoon \nC. Chair \nD. Door", {
            fontSize: 40,
            fill: '#000000',
        });
        this.riddle2.visible = false;
        this.riddle2.setDepth(objectDepth);

        this.riddle3 = this.add.text(225, 220, "What can bring back the dead; make you cry, make you laugh, \nmake you young; is born in an instant, yet lasts a lifetime. \nA. Time \nB. Potion \nC. Memory \nD. Grim Reaper", {
            fontSize: 40,
            fill: '#000000',
        });
        this.riddle3.visible = false;
        this.riddle3.setDepth(objectDepth);

        // Inventory GUI
        //this.updateInventory();
        let invRect = this.add.rectangle(1750, 950, 400, 300, 0x000000);
        invRect.setDepth(envDepth);
        this.add.text(1570, 820, "Inventory", {fontSize: 40});

        //Player physics
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.answerButtons);
        this.physics.add.collider(this.player, this.Npc);

        // Player hitbox physics
        this.physics.add.overlap(this.playerInteractBox, this.Npc, this.npcInteract, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.answerButtons, this.checkAnswer, null, this);
        this.physics.add.overlap(this.player, this.hubDoor, this.interactDoor, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.scroll, this.pickUp, null, this);
    }

    update() {
        // Have interact hitbox follow player
        this.playerInteractBox.x = this.player.x;
        this.playerInteractBox.y = this.player.y;

        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,50);
            this.playerInteractBox.body.setOffset(0,50);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,50);
            this.playerInteractBox.body.setOffset(0,120);
        }
        else {
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,120);
            this.playerInteractBox.body.setOffset(-70,0);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,120);
            this.playerInteractBox.body.setOffset(70,0);
        }
        else {
            this.player.setVelocityX(0);
        }    
    }

    npcInteract() {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.currentQuestion == 0) {
            this.chatBubble = this.add.rectangle(205, tileSize*SCALE*2, 1490, 300, 0xFFF8DC).setOrigin(0);
            this.physics.add.existing(this.chatBubble);
            this.chatBubble.body.immovable = true;
            this.chatBubble.setDepth(envDepth);
            this.npcText.visible = true;
            this.physics.add.collider(this.player, this.chatBubble);
            this.time.delayedCall(5000, () => {
                this.currentQuestion = 1;
                this.canAnswer = true;
                this.npcText.destroy();
                this.riddle1.visible = true;
            });
            // npcInteract FINSIHED DEAD FIRST QUESTION IS DONE
        }
    }

    checkAnswer(hitbox, answer) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.currentQuestion == 1 && this.canAnswer == true) {
            this.answerArray.push(answer.name);
            this.riddle1.visible = false;
            this.canAnswer = false;
            this.time.delayedCall(500, () => {
                this.currentQuestion = 2;
                this.canAnswer = true;
                this.riddle2.visible = true;
            });
            console.log(this.answerArray);
            // SECOND
        } 
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.currentQuestion == 2 && this.canAnswer == true) {
            this.answerArray.push(answer.name);
            this.riddle2.visible = false;
            this.canAnswer = false;
            this.time.delayedCall(500, () => {
                this.currentQuestion = 3;
                this.canAnswer = true;
                this.riddle3.visible = true;
            });
            console.log(this.answerArray);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.currentQuestion == 3 && this.canAnswer == true) {
            this.answerArray.push(answer.name);
            this.riddle3.visible = false;
            this.canAnswer = false;
            if (this.answerArray[0] == 'B' && this.answerArray[1] == 'A' && this.answerArray[2] == 'C') {
                console.log("npc dialogue, create artifact, spawn artifact, look musicpuzzle");
                console.log("flashback, exit room");
                this.scroll.body.enable = true;
                this.scroll.visible = true;
            }
            else {
                // retry bozo
                console.log("You FAILED");
                this.time.delayedCall(500, () => {
                    this.currentQuestion = 1;
                    this.riddle1.visible = true;
                    this.canAnswer = true;
                    this.answerArray = [];
                });
            }
            console.log(this.answerArray);
        }
    }

    interactDoor(player, door) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('centralhub');
            });
        }
    }

    updateInventory() {
        if(inventory.length > 0) {
            this.inventoryArtifact = this.add.sprite(1700,960, inventory[0]).setScale(1.5);
            this.inventoryArtifact.setDepth(objectDepth);
            console.log(this.inventoryArtifact);
        } else {
            this.inventoryArtifact.destroy();
        }
    }

    pickUp () {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            inventory.push('Scroll');
            this.scroll.body.enable = false;
            this.scroll.visible = false;
            this.updateInventory();
        }
    }
}

//[0, 0, 0],
//[0, 1, 0],
//[0, 0, 0]
class MazePuzzle extends Phaser.Scene {
    constructor() {
        super('mazepuzzle');
    }

    preload() {
        this.load.path = "./assets/";		
        this.load.image('Fire', 'Fire.png');
        this.load.image('Milf', 'Milf.png');
    }
    
    create() {
        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(57,20);
        this.player.body.setOffset(7, 135);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(57,20);
        this.playerInteractBox.body.setOffset(7, 135);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(220, 50, wallSize * 8 * 12, wallSize * 12, 'Top Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.setSize(wallSize * 94, 100);
        this.botWall.body.setOffset(0, 100);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(3);
        this.walls.add(this.botWall);

        this.leftWall = this.add.sprite(100, 50, 'Left Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.sprite(1820 - (wallSize*SCALE), 50, 'Right Wall').setScale(1).setOrigin(1,0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(envDepth);

        // Created Floor
        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(envDepth);

        // Create NPC
        this.Npc = this.physics.add.sprite(600, 500, 'Milf').setOrigin(0.5).setScale(0.45);
        this.Npc.setDepth(envDepth);
        this.Npc.body.immovable = true;

        // Created Fire
        // 120 wide 180 tall
        this.fires = this.add.group();
        this.fire1 = this.add.tileSprite(300, 470, 120, 905, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire1);
        this.fire1.body.immovable = true;
        this.fires.add(this.fire1);

        this.fire2 = this.add.tileSprite(440, 490, 120, 805, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire2);
        this.fire2.body.immovable = true;
        this.fires.add(this.fire2);

        this.fire3 = this.add.tileSprite(650, 334, 725, 180, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire3);
        this.fire3.body.immovable = true;
        this.fires.add(this.fire3);

        this.fire4 = this.add.tileSprite(800, 550, 120, 875, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire4);
        this.fire4.body.immovable = true;
        this.fires.add(this.fire4);

        this.fire5 = this.add.tileSprite(1265, 725, 1750, 180, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire5);
        this.fire5.body.immovable = true;
        this.fires.add(this.fire5);

        this.fire6 = this.add.tileSprite(940, 445, 120, 785, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire6);
        this.fire6.body.immovable = true;
        this.fires.add(this.fire6);

        this.fire7 = this.add.tileSprite(1550, 465, 120, 700, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire7);
        this.fire7.body.immovable = true;
        this.fires.add(this.fire7);

        this.fire8 = this.add.tileSprite(1245, 596, 1100, 180, 'Fire').setScale(.5);
        this.physics.add.existing(this.fire8);
        this.fire8.body.immovable = true;
        this.fires.add(this.fire8);

        //Player physics
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.fires, this.resetPlayer, null, this);
        this.physics.add.collider(this.player, this.Npc);
    }

    update() {
        // Have interact hitbox follow player
        this.playerInteractBox.x = this.player.x;
        this.playerInteractBox.y = this.player.y;

        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,50);
            this.playerInteractBox.body.setOffset(0,50);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,50);
            this.playerInteractBox.body.setOffset(0,120);
        }
        else {
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,120);
            this.playerInteractBox.body.setOffset(-70,0);
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,120);
            this.playerInteractBox.body.setOffset(70,0);
        }
        else {
            this.player.setVelocityX(0);
        }    
    }

    // Reset player when they touch the fire
    resetPlayer() {
        this.player.x = 400;
        this.player.y = 800;
    }
}