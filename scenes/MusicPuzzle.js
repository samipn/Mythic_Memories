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
        this.load.image('BirthVision', 'BirthVision.png')
    }
    create() {
        //this.visionPlayer = this.add.image();
        this.eKey = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E));
        this.inventoryArtifact = this.add.sprite(450, 675, 'Lyre').setOrigin(0.5,1);

        // Create Dialogue System
        this.vision = false;
        this.leftButtonClicked = false;
        this.dialogueActive = false;
        this.dialogueRectangle = this.add.rectangle(220, 100, 1470, 200, 0x000000).setOrigin(0).setDepth(dialogueDepth).setAlpha(0.5);
        //this.dialogueRectangle.visible = false;
        this.dialogueText = this.add.text(220, 100, '', {fontSize: 40, color: '#ffffff', wordWrap: { width: 1470 }}).setDepth(dialogueDepth);
        this.dialogueData = [
            "Hmm, a music puzzle, I may have to put these notes in order.\n\n\n\nClick to Proceed",
            "Push the notes to the boxes. If they are in the correct left to right play order you complete the puzzle.\nPress E on the music notes to hear it individually.\n\nClick to Dismiss"
            // Add more dialogue messages as needed
        ];
        this.dialogueIndex = 0;
        this.bg = this.add.rectangle(0,0,1920,1080,0xF1EB9C).setOrigin(0).setDepth(visionDepth);
        this.bg.visible = false;
        this.visionPlayer = this.add.image(300, 780, 'Beta Apollo').setOrigin(1,0).setScale(5).setDepth(visionDepth);
        this.visionPlayer.visible = false;
        this.visionRectangle = this.add.rectangle(220, 100, 1470, 720, 0xffffff).setOrigin(0).setDepth(visionDepth).setAlpha(1);
        this.visionRectangle.visible = false;
        this.visionImage = this.add.image(game.config.width/2, 600, 'BirthVision').setOrigin(0.5, 0).setScale(0.5).setDepth(visionDepth);
        this.visionImage.visible = false;
        

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

        // Make group for all collidable objects
        this.objects = this.add.group();

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

        this.floor = this.add.tileSprite(220, 50 + wallSize * 12, 1455, 700, 'Floor').setScale(1.02).setOrigin(0);
        this.floor.setDepth(-3);

        // Created music puzzle pieces
        this.pieces = this.add.group();

        this.piece1 = this.physics.add.sprite(750, 700, 'mn1').setOrigin(0.5);
        this.piece1.name = "audio1";
        this.piece1.setCollideWorldBounds(true);
        this.piece1.setDepth(envDepth);
        this.pieces.add(this.piece1);

        this.piece2 = this.physics.add.sprite(1350, 700, 'mn2').setOrigin(0.5);
        this.piece2.name = "audio2";
        this.piece2.setCollideWorldBounds(true);
        this.piece2.setDepth(envDepth);
        this.pieces.add(this.piece2);

        this.piece3 = this.physics.add.sprite(1050, 700, 'mn3').setOrigin(0.5);
        this.piece3.name = "audio3";
        this.piece3.setCollideWorldBounds(true);
        this.piece3.setDepth(envDepth);
        this.pieces.add(this.piece3);

        this.piece4 = this.physics.add.sprite(450, 700, 'mn4').setOrigin(0.5).setScale(0.7);
        this.piece4.name = "audio4";
        this.piece4.setCollideWorldBounds(true);
        this.piece4.setDepth(envDepth);
        this.pieces.add(this.piece4);

        // Create piece slots
        this.pieceSlots = this.add.group();

        this.pieceSlot1 = this.physics.add.sprite(735, 400, 'mb').setOrigin(0.5);
        this.pieceSlot1.body.immovable = true;
        this.pieceSlot1.setCollideWorldBounds(true);
        this.pieceSlot1.setDepth(-1);
        this.pieceSlots.add(this.pieceSlot1);

        this.pieceSlot2 = this.physics.add.sprite(885, 400, 'mb').setOrigin(0.5);
        this.pieceSlot2.body.immovable = true;
        this.pieceSlot2.setCollideWorldBounds(true);
        this.pieceSlot2.setDepth(-1);
        this.pieceSlots.add(this.pieceSlot2);

        this.pieceSlot3 = this.physics.add.sprite(1035, 400, 'mb').setOrigin(0.5);
        this.pieceSlot3.body.immovable = true;
        this.pieceSlot3.setCollideWorldBounds(true);
        this.pieceSlot3.setDepth(-1);
        this.pieceSlots.add(this.pieceSlot3);

        this.pieceSlot4 = this.physics.add.sprite(1185, 400, 'mb').setOrigin(0.5);
        this.pieceSlot4.body.immovable = true;
        this.pieceSlot4.setCollideWorldBounds(true);
        this.pieceSlot4.setDepth(-1);
        this.pieceSlots.add(this.pieceSlot4);

        // Create Text
        this.playerText = this.add.text(225, 245, "Hmm, a music puzzle, I may have to put these notes in order.", {
            fontSize: 40,
            fill: '#000000',
        });
        this.playerText.setDepth(objectDepth);
        this.playerText.visible = false;

        // Create Hint
        this.hintText = this.add.text(225, 450, "Hint:  Push the notes to the boxes, if they are in the correct left to right play order you complete the puzzle\nPress E on the \nmusic notes", {
            fontSize: 40,
            fill: '#000000',
        });
        this.hintText.setDepth(objectDepth);
        this.hintText.visible = false;

        // Create hub door
        this.hubDoor = this.physics.add.sprite(game.config.width/2, 940, 'Door').setOrigin(0.5).setScale(4);
        this.hubDoor.body.immovable = true;
        this.hubDoor.body.setSize(30,60);
        this.hubDoor.body.setOffset(35, 17);
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
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)) && (this.playing === false) && (level1Complete == false) && (this.musicSlots.length > 0)) {
              playNextAudio(); // Call the local arrow function to start playing the audio
              this.playing = true;
            }
        };

        // Create Artifact (Level Complete)
        this.lyre = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Lyre').setOrigin(0.5);
        this.lyre.body.immovable = true;
        this.lyre.body.enable = false;
        this.lyre.visible = false;
        
        // Create overlap hitboxes 
        this.botWallOverlapBody = this.add.tileSprite(220, 819, wallSize * 94, wallSize * 12 + 9, 'Bottom Wall').setScale(1).setOrigin(0);
        this.physics.add.existing(this.botWallOverlapBody);
        this.botWallOverlapBody.setDepth(-2);
        this.botWallOverlapBody.body.immovable = true;
        this.botWallOverlapBody.visible = false;

        // Inventory GUI
        this.updateInventory();
        let invRect = this.add.rectangle(1750, 950, 400, 300, 0x136207);
        let invText = this.add.text(1570, 820, "Inventory", {fontSize: 40});
        invRect.setDepth(invDepth);
        invText.setDepth(invDepth);

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
        this.dialogueActive = true;
        this.startDialogue();

        // Animation stuff
        this.anims.create({
            key: 'LeftAnimation',
            frames: [
                { key: 'sll' },
                { key: 'slr' },
            ],
            frameRate: 2.2, // frames per second
            repeat: -1
        });

        this.anims.create({
            key: 'RightAnimation',
            frames: [
                { key: 'srl' },
                { key: 'srr' },
            ],
            frameRate: 2.2, // frames per second
            repeat: -1
        });

        this.anims.create({
            key: 'FrontAnimation',
            frames: [
                { key: 'fl' },
                { key: 'fr' },
            ],
            frameRate: 2.2, // frames per second
            repeat: -1
        });

        this.anims.create({
            key: 'BackAnimation',
            frames: [
                { key: 'bl' },
                { key: 'br' },
            ],
            frameRate: 2.2, // frames per second
            repeat: -1
        });
    }

    update() {
        if (this.input.activePointer.leftButtonDown() && !this.leftButtonClicked) {
            this.leftButtonClicked = true;
            this.handleDialogueInteraction();
        }
        if (this.input.activePointer.leftButtonReleased()) {
            this.leftButtonClicked = false;
        }
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
                object.setDepth(objectDepth);
            } else{
                object.alpha = 1;
                object.setDepth(envDepth);
            }
        });

        // Have interact hitbox follow player
        this.playerInteractBox.x = this.player.x;
        this.playerInteractBox.y = this.player.y;

        // Y Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            // W key is currently being pressed
            this.player.setVelocityY(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(57,50);
            this.playerInteractBox.body.setOffset(7,85);
            if(this.animationPlayingX == false) {
                this.player.play('BackAnimation', true);
            }
            this.animationPlayingY = true;
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            // S key is currently being pressed
            this.player.setVelocityY(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(57,50);
            this.playerInteractBox.body.setOffset(7,155);
            if(this.animationPlayingX == false) {
                this.player.play('FrontAnimation', true);
            }
            this.animationPlayingY = true;
        }
        else {
            this.animationPlayingY = false;
            if(this.animationPlayingY == false && this.animationPlayingX == false) {
                this.player.setTexture('Beta Apollo');
            }
            this.player.setVelocityY(0);
        }
        
        // X Movement
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // A key is currently being pressed
            this.player.setVelocityX(-MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,140);
            this.playerInteractBox.body.setOffset(-65,0);
            this.player.play('LeftAnimation', true);
            this.animationPlayingX = true;
        }
        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // D key is currently being pressed
            this.player.setVelocityX(MAX_VELOCITY);
            this.playerInteractBox.body.setSize(70,140);
            this.playerInteractBox.body.setOffset(65,0);
            this.player.play('RightAnimation', true);
            this.animationPlayingX = true;

        }
        else {
            this.animationPlayingX = false;
            if(this.animationPlayingY == false && this.animationPlayingX == false) {
                this.player.setTexture('Beta Apollo');
            }
            this.player.setVelocityX(0);
        }

        this.pieces.children.each((piece) => {
            piece.setVelocityX(0);
            piece.setVelocityY(0);
        });
    }

    handleDialogueInteraction() {
        if (this.dialogueActive) {
            // Check if there are more dialogue messages to display
            if (this.dialogueIndex < this.dialogueData.length - 1) {
                this.dialogueIndex++;
                this.displayNextMessage();
            } else {
                // All dialogue messages have been displayed
                this.finishDialogue();
            }
        }
    }

    displayNextMessage() {
        this.dialogueText.setText(this.dialogueData[this.dialogueIndex]);
        if(this.vision && this.dialogueIndex > 0) {
            // spawn head, blank background, pic, text
            this.bg.visible = true;
            this.visionPlayer.visible = true;
            this.visionRectangle.visible = true;
            this.visionImage.visible = true;
            this.dialogueText.setDepth(visionDepth+1).setColor('#000000');
            // this.bg = this.add.rectangle(0,0,1920,1080,0xF1EB9C).setOrigin(0).setDepth(visionDepth);
            // this.visionPlayer = this.add.image(300, 780, 'Beta Apollo').setOrigin(1,0).setScale(5).setDepth(visionDepth);
            // this.visionRectangle = this.add.rectangle(220, 100, 1470, 720, 0xffffff).setOrigin(0).setDepth(visionDepth).setAlpha(1);
            // this.visionImage = this.add.image(game.config.width/2, 600, 'BirthVision').setOrigin(0.5, 0).setScale(0.5).setDepth(visionDepth);
            // this.dialogueText.setDepth(visionDepth+1).setColor('#000000');
            console.log("it works");
        }
    }

    startDialogue() {
        this.dialogueActive = true;
        this.dialogueRectangle.visible = true;
        this.dialogueIndex = 0;
        this.displayNextMessage();
        // Disable character movement or perform other actions as needed
        this.player.body.enable = false;
    }

    finishDialogue() {
        this.dialogueActive = false;
        this.player.body.enable = true;
        this.dialogueRectangle.visible = false;
        this.dialogueText.setText('');
        this.dialogueData = ["What's this vision that's coming to me?!\n\n\n\nClick to Proceed",
        "*ANGEL*: From the day he was born, Greek god Apollo led a life of adventure. He was the son of Zeus and his mistress, the Titaness Leto. When Zeus’s jealous wife Hera found out about the pregnancy, she punished Leto, forbidding her from giving birth on land, and sending the deadly Python to chase her away. Leto found refuge on the floating island of Ortygia. Hera then forced Eileithyia, the goddess of childbirth, to prolong Leto’s labor for an agonizing 9 days. Eventually Leto gave birth to twins: Artemis, and her twin brother Apollo. Thus the great Greek god Apollo entered the world, fully grown, carrying a golden sword. The island around him burst into life, filled with lush plants, fragrant flowers and beautiful music.\n\n\n\n\n\nClick to Proceed",
        "It looks like some ceremonial and beautiful birth with the same heavenly melody I just heard using this Lyre too...\nWhy would I randomly see some Greek God's Birth?... Weird... Well I better get back and put this on the pedestal.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nClick to Proceed",
        "It looks like that person killed the Python with the same bow I used... Weird...\nWell I better give this bow back to him.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nClick to Proceed"];
        if(this.vision) {
            // destroy vision created things
            this.bg.destroy();
            this.visionPlayer.destroy();
            this.visionRectangle.destroy();
            this.visionImage.destroy();
            this.dialogueText.setText('');
            this.vision = false;
            console.log(this.dialogueIndex);
        }
        // Enable character movement or perform other actions as needed
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
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)) && level1Complete == false) {
            this.playedOrder = [];
            this.musicSlots = ['audio0', 'audio0', 'audio0', 'audio0'];
            this.playing = false;
            let pieceY = 700;
            this.pieces.children.each((piece) => {
                piece.y = pieceY;
                piece.body.immovable = false;
                piece.body.enable = true;
                piece.setPushable(true);
            });
            this.piece1.x = 750;
            this.piece2.x = 1350;
            this.piece3.x = 1050;
            this.piece4.x = 450;
            this.audio0.stop();
            this.audio1.stop();
            this.audio2.stop();
            this.audio3.stop();
        }
    }

    playFragment(hitbox, piece) {
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)) && this.playing == false && level1Complete == false) {
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
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.vision = true;
            this.startDialogue();
            inventory.push('Lyre');
            this.lyre.body.enable = false;
            this.lyre.visible = false;
            this.updateInventory();
        }
    }

    updateInventory() {
        if(inventory.length > 0) {
            this.inventoryArtifact = this.add.sprite(1700,960, inventory[0]).setScale(1.5);
            this.inventoryArtifact.setDepth(invDepth);
            console.log(this.inventoryArtifact);
        } else {
            this.inventoryArtifact.destroy();
        }
    }

    interactDoor(player, door) {
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('centralhub');
            });
        }
    }

}