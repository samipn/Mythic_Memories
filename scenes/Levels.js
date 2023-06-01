class CentralHub extends Phaser.Scene {
    constructor() {
        super('centralhub');
    }
    preload() {
      this.load.path = "./assets/";		
      this.load.image('Beta Apollo', 'BetaApollo.png');
      this.load.image('Dirt', 'Dirt.png');
      this.load.image('Door', 'Door.png');
      this.load.image('Lyre', 'pizzarolls.png');
      this.load.image('Bow', 'pizzarolls.png');
    }
    create() {
        this.inventoryArtifact = this.add.sprite(450, 675, 'Lyre').setOrigin(0.5,1);
        this.inventoryArtifact.setDepth(objectDepth);
        if(inventory.length > 0) {
            this.inventoryArtifact.destroy();
        }

        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(70,20);
        this.player.body.setOffset(0, 100);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(70,50);
        this.playerInteractBox.body.setOffset(0,120);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(0, (tileSize*SCALE), tileSize * 20, tileSize, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(0, 1000 - (tileSize*SCALE), tileSize * 20, tileSize, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(envDepth);
        this.walls.add(this.botWall);

        this.leftWall = this.add.tileSprite(100, (tileSize*SCALE), tileSize, tileSize * 20, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.tileSprite(1800 - (tileSize*SCALE), (tileSize*SCALE), tileSize, tileSize * 20, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        // Make group for all collidable objects
        this.objects = this.add.group();

        // Created pedastals
        this.pedastals = this.add.group();
        this.pedastal1 = this.add.tileSprite(450,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.pedastal1.name = "pedastal1";
        this.physics.add.existing(this.pedastal1);
        this.pedastal1.body.immovable = true;
        this.pedastal1.body.setSize(tileSize,tileSize);
        this.pedastal1.body.setOffset(0,tileSize);
        this.pedastal1.setDepth(envDepth);
        this.pedastals.add(this.pedastal1);
        this.objects.add(this.pedastal1);

        this.pedastal2 = this.add.tileSprite(750,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.pedastal2.name = "pedastal2";
        this.physics.add.existing(this.pedastal2);
        this.pedastal2.body.immovable = true;
        this.pedastal2.body.setSize(tileSize,tileSize);
        this.pedastal2.body.setOffset(0,tileSize);
        this.pedastal2.setDepth(envDepth);
        this.pedastals.add(this.pedastal2);
        this.objects.add(this.pedastal2);

        this.pedastal3 = this.add.tileSprite(1050,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.pedastal3.name = "pedastal3";
        this.physics.add.existing(this.pedastal3);
        this.pedastal3.body.immovable = true;
        this.pedastal3.body.setSize(tileSize,tileSize);
        this.pedastal3.body.setOffset(0,tileSize);
        this.pedastal3.setDepth(envDepth);
        this.pedastals.add(this.pedastal3);
        this.objects.add(this.pedastal3);

        this.pedastal4 = this.add.tileSprite(1350,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.pedastal4.name = "pedastal4";
        this.physics.add.existing(this.pedastal4);
        this.pedastal4.body.immovable = true;
        this.pedastal4.body.setSize(tileSize,tileSize);
        this.pedastal4.body.setOffset(0,tileSize);
        this.pedastal4.setDepth(envDepth);
        this.pedastals.add(this.pedastal4);
        this.objects.add(this.pedastal4);


        // Created Puzzle Doors
        this.puzzledoors = this.add.group();

        this.puzzleDoor1 = this.physics.add.sprite(450, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor1.body.immovable = true;
        this.puzzleDoor1.body.setSize(30,60);
        this.puzzleDoor1.body.setOffset(35, 17);
        this.puzzleDoor1.setDepth(objectDepth);
        this.puzzledoors.add(this.puzzleDoor1);

        this.puzzleDoor2 = this.physics.add.sprite(750, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor2.body.immovable = true;
        this.puzzleDoor2.body.setSize(30,60);
        this.puzzleDoor2.body.setOffset(35, 17);
        this.puzzleDoor2.setDepth(objectDepth);
        this.puzzledoors.add(this.puzzleDoor2);

        this.puzzleDoor3 = this.physics.add.sprite(1050, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor3.body.immovable = true;
        this.puzzleDoor3.body.setSize(30,60);
        this.puzzleDoor3.body.setOffset(35, 17);
        this.puzzleDoor3.setDepth(objectDepth);
        this.puzzledoors.add(this.puzzleDoor3);

        this.puzzleDoor4 = this.physics.add.sprite(1350, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor4.body.immovable = true;
        this.puzzleDoor4.body.setSize(30,60);
        this.puzzleDoor4.body.setOffset(35, 17);
        this.puzzleDoor4.setDepth(objectDepth);
        this.puzzledoors.add(this.puzzleDoor4);

        // Created artifacts
        this.lyre = this.add.sprite(450, 675, 'Lyre').setOrigin(0.5,1);
        this.lyre.setDepth(objectDepth);
        this.lyre.visible = false;

        this.bow = this.add.sprite(750, 675, 'Bow').setOrigin(0.5,1);
        this.bow.setDepth(objectDepth);
        this.bow.visible = false;
        
        // Created overlap hitboxes
        this.pedastal1OverlapBody = this.add.tileSprite(this.pedastal1.x, this.pedastal1.y, tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.physics.add.existing(this.pedastal1OverlapBody);
        this.pedastal1OverlapBody.body.immovable = true;
        this.pedastal1OverlapBody.visible = false;

        this.pedastal2OverlapBody = this.add.tileSprite(this.pedastal2.x, this.pedastal2.y, tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.physics.add.existing(this.pedastal2OverlapBody);
        this.pedastal2OverlapBody.body.immovable = true;
        this.pedastal2OverlapBody.visible = false;
        
        this.pedastal3OverlapBody = this.add.tileSprite(this.pedastal3.x, this.pedastal3.y, tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.physics.add.existing(this.pedastal3OverlapBody);
        this.pedastal3OverlapBody.body.immovable = true;
        this.pedastal3OverlapBody.visible = false;

        this.pedastal4OverlapBody = this.add.tileSprite(this.pedastal4.x, this.pedastal4.y, tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.physics.add.existing(this.pedastal4OverlapBody);
        this.pedastal4OverlapBody.body.immovable = true;
        this.pedastal4OverlapBody.visible = false;

        // Inventory GUI
        this.updateInventory();
        let invRect = this.add.rectangle(1750, 950, 400, 300, 0x000000);
        invRect.setDepth(envDepth);
        this.add.text(1570, 820, "Inventory", {fontSize: 40});

        // Physics stuff
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.pedastals);
        this.physics.add.overlap(this.player, this.puzzledoors, this.interactDoor, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.pedastals, this.interactPedastal, null, this);
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
                object.setDepth(1);
                this.player.setDepth(0);
                object.alpha = 0.7;
            } else{
                object.setDepth(envDepth);
                this.player.setDepth(playerDepth);
                object.alpha = 1;
                this.player.alpha = 1;
            }
        });

        if(pedastalArtifacts[0] == true) {
            this.lyre.visible = true;
        }

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

    interactPedastal(player, pedastal) {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && (pedastal == this.pedastal1)) {
            if(inventory.length == 1) {
                console.log("artifact placed on pedastal");
                pedastalArtifacts[0] = true;
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
            this.inventoryArtifact = this.add.sprite(1700,950, inventory[0]).setScale(3);
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
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(70,20);
        this.player.body.setOffset(0, 100);
        this.player.setDepth(playerDepth);

        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(70,50);
        this.playerInteractBox.body.setOffset(0,120);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(0, (tileSize*SCALE), tileSize * 20, tileSize, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(0, 1000 - (tileSize*SCALE), tileSize * 20, tileSize, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(envDepth);
        this.walls.add(this.botWall);

        this.leftWall = this.add.tileSprite(100, (tileSize*SCALE), tileSize, tileSize * 20, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.tileSprite(1800 - (tileSize*SCALE), (tileSize*SCALE), tileSize, tileSize * 20, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        // Created music puzzle pieces
        this.pieces = this.add.group();

        this.piece1 = this.physics.add.sprite(450, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.piece1.name = "audio1";
        this.piece1.setCollideWorldBounds(true);
        this.pieces.add(this.piece1);

        this.piece2 = this.physics.add.sprite(750, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.piece2.name = "audio2";
        this.piece2.setCollideWorldBounds(true);
        this.pieces.add(this.piece2);

        this.piece3 = this.physics.add.sprite(1050, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.piece3.name = "audio3";
        this.piece3.setCollideWorldBounds(true);
        this.pieces.add(this.piece3);

        this.piece4 = this.physics.add.sprite(1350, 700, 'Dirt').setOrigin(0.5).setScale(SCALE);
        this.piece4.name = "audio4";
        this.piece4.setCollideWorldBounds(true);
        this.pieces.add(this.piece4);

        // Create piece slots
        this.pieceSlots = this.add.group();

        this.pieceSlot1 = this.physics.add.sprite(735, 400, 'EmptySlot').setOrigin(0.5);
        this.pieceSlot1.body.immovable = true;
        this.pieceSlot1.setCollideWorldBounds(true);
        this.pieceSlots.add(this.pieceSlot1);

        this.pieceSlot2 = this.physics.add.sprite(885, 400, 'EmptySlot').setOrigin(0.5);
        this.pieceSlot2.body.immovable = true;
        this.pieceSlot2.setCollideWorldBounds(true);
        this.pieceSlots.add(this.pieceSlot2);

        this.pieceSlot3 = this.physics.add.sprite(1035, 400, 'EmptySlot').setOrigin(0.5);
        this.pieceSlot3.body.immovable = true;
        this.pieceSlot3.setCollideWorldBounds(true);
        this.pieceSlots.add(this.pieceSlot3);

        this.pieceSlot4 = this.physics.add.sprite(1185, 400, 'EmptySlot').setOrigin(0.5);
        this.pieceSlot4.body.immovable = true;
        this.pieceSlot4.setCollideWorldBounds(true);
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
        this.lyre = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Bow').setOrigin(0.5);
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
        piece.x = slot.body.x;
        piece.y = slot.body.y;
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
            this.inventoryArtifact = this.add.sprite(1700,950, inventory[0]).setScale(3);
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
        this.load.image('Arrow', 'BetaApollo.png');
        this.load.image('Dummy', 'BetaApollo.png');
        this.load.image('Npc', 'BetaApollo.png')
    }

    create() {
        this.targetsHit = 0;
        this.hasBow = false;
        
        //Create Arrow
        this.ArrowGroup = new ArrowGroup(this);
        
        this.addEvents();

        // Created Player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(70,20);
        this.player.body.setOffset(0, 100);
        this.player.setDepth(playerDepth);
    
        this.playerInteractBox = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Beta Apollo');
        this.playerInteractBox.body.setSize(70,50);
        this.playerInteractBox.body.setOffset(0,120);
        this.playerInteractBox.visible = false;
        this.playerInteractBox.body.immovable = true;

        // Created Room walls
        this.walls = this.add.group();
        this.topWall = this.add.tileSprite(0, (tileSize*SCALE), tileSize * 20, tileSize, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.topWall);
        this.topWall.body.immovable = true;
        this.topWall.setDepth(envDepth);
        this.walls.add(this.topWall);

        this.botWall = this.add.tileSprite(0, 1000 - (tileSize*SCALE), tileSize * 20, tileSize, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.botWall);
        this.botWall.body.immovable = true;
        this.botWall.setDepth(envDepth);
        this.walls.add(this.botWall);

        this.leftWall = this.add.tileSprite(100, (tileSize*SCALE), tileSize, tileSize * 20, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.leftWall);
        this.leftWall.body.immovable = true;
        this.leftWall.setDepth(envDepth);
        this.walls.add(this.leftWall);

        this.rightWall = this.add.tileSprite(1800 - (tileSize*SCALE), (tileSize*SCALE), tileSize, tileSize * 20, 'Dirt').setScale(SCALE).setOrigin(0);
        this.physics.add.existing(this.rightWall);
        this.rightWall.body.immovable = true;
        this.rightWall.setDepth(envDepth);
        this.walls.add(this.rightWall);

        // Create targets
        this.Targets = this.add.group();

        this.Target1 = this.physics.add.sprite(735, 400, 'Dummy').setOrigin(0.5);
        this.Target1.body.immovable = true;
        this.Target1.setCollideWorldBounds(true);
        this.Targets.add(this.Target1);

        this.Target2 = this.physics.add.sprite(885, 400, 'Dummy').setOrigin(0.5);
        this.Target2.body.immovable = true;
        this.Target2.setCollideWorldBounds(true);
        this.Targets.add(this.Target2);

        this.Target3 = this.physics.add.sprite(1035, 400, 'Dummy').setOrigin(0.5);
        this.Target3.body.immovable = true;
        this.Target3.setCollideWorldBounds(true);
        this.Targets.add(this.Target3);

        this.Target4 = this.physics.add.sprite(1185, 400, 'Dummy').setOrigin(0.5);
        this.Target4.body.immovable = true;
        this.Target4.setCollideWorldBounds(true);
        this.Targets.add(this.Target4);

        // Create NPC
        this.Npc = this.physics.add.sprite(1400, 700, 'Npc').setOrigin(0.5).setScale(1);
        this.Npc.body.immovable = true;

        // Player Physics
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.Npc);

        // Arrow Physics
        this.physics.add.collider(this.ArrowGroup, this.walls, this.destroyArrow, null, this);
        this.physics.add.collider(this.ArrowGroup, this.Targets, this.destroyTarget, null, this);

        // Player hitbox physics
        this.physics.add.overlap(this.playerInteractBox, this.Npc, this.npcInteract, null, this);

        this.updateInventory;
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
            console.log("getting bow dialogue");
            this.hasBow = true;
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.targetsHit == 4) {
            console.log("finishing dialogue");
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown && this.ArrowGroup.getFrameQuantity() == 0){
            this.ArrowGroup = new ArrowGroup(this);
            this.physics.add.collider(this.ArrowGroup, this.walls, this.destroyArrow, null, this);
            this.physics.add.collider(this.ArrowGroup, this.Targets, this.destroyTarget, null, this);
            console.log("ur bad here are some more arrows");
        }
    }
    //if E is down && hasBow == false
    //  give bow
    //else if E is down && 4 targets killed
    //  level done
    //else
    //  give arrows

    destroyArrow(wall, arrow) {
        arrow.destroy();
    }

    destroyTarget(target, arrow) {
        arrow.destroy();
        target.destroy();
        this.targetsHit += 1;
    }
}