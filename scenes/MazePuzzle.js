class MazePuzzle extends Phaser.Scene {
    constructor() {
        super('mazepuzzle');
        this.dialogueActive = false;
    }

    preload() {
        this.load.path = "./assets/";		
        this.load.image('Fire', 'Fire.png');
        this.load.image('Milf', 'Milf.png');
        this.load.image('Baby', 'Baby.png');
        this.load.image('Crow', 'Crow.png');
        this.load.image('CrowVision', 'CrowVision.png');
    }
    
    create() {
        this.internalRectangle = this.add.rectangle(220, 100, 1470, 200, 0x000000).setOrigin(0).setDepth(dialogueDepth).setAlpha(0.5);
        this.internalText = this.add.text(220, 100, 'I should talk to that mom in distress.', {fontSize: 40, color: '#ffffff', wordWrap: { width: 1470 }}).setDepth(dialogueDepth);

        // Puzzle things (timer + condition)
        this.timer;
        this.countdownTime = 40;
        this.timerRect = this.add.rectangle(game.config.width/2, 100, 300, 70, 0x000000).setOrigin(0.5);
        this.timerRect.setDepth(invArtDepth);
        this.timerRect.visible = false;
        this.timerText = this.add.text(game.config.width/2, 100, '40.000', { fontFamily: 'Arial', fontSize: '60px', color: '#ffffff', align: 'center'}).setOrigin(0.5);
        this.timerText.setDepth(invArtDepth);
        this.timerText.visible = false;
        this.startedPuzzle = false;
        this.endedPuzzle = false;
        

        this.inventoryArtifact = this.add.sprite(450, 675, 'Crow').setOrigin(0.5,1);

        // Create Dialogue System
        this.vision = false;
        this.leftButtonClicked = false;
        this.dialogueActive = false;
        this.dialogueRectangle = this.add.rectangle(640, 400, 410, 200, 0xffffff).setOrigin(0).setDepth(dialogueDepth);
        this.dialogueRectangle.visible = false;
        this.dialogueText = this.add.text(650, 410, '', {fontSize: 24, color: '#000000', wordWrap: { width: 400 }}).setDepth(dialogueDepth);
        this.dialogueData = [
            "HELP! My Baby is stuck in the fire!\n\n\n\n\n\nClick to proceed",
            "Please traverse the fire path and bring him back before its too late!\n\n\n\n\nClick to proceed",
            "**WHEN YOU CLICK** the time trial will start and you will have to retrive the baby and bring it back to me",
            // Add more dialogue messages as needed
        ];
        this.dialogueIndex = 0;
        this.bg = this.add.rectangle(0,0,1920,1080,0xF1EB9C).setOrigin(0).setDepth(visionDepth);
        this.bg.visible = false;
        this.visionPlayer = this.add.image(300, 780, 'Beta Apollo').setOrigin(1,0).setScale(5).setDepth(visionDepth);
        this.visionPlayer.visible = false;
        this.visionRectangle = this.add.rectangle(220, 100, 1470, 720, 0xffffff).setOrigin(0).setDepth(visionDepth).setAlpha(1);
        this.visionRectangle.visible = false;
        this.visionImage = this.add.image(game.config.width/2, 600, 'CrowVision').setOrigin(0.5, 0).setScale(0.5).setDepth(visionDepth);
        this.visionImage.visible = false;

          
        // Created Player
        this.player = this.physics.add.sprite(400, 800, 'Beta Apollo');
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

        // Create baby
        this.baby = this.physics.add.sprite(1200, 400, 'Baby').setOrigin(0.5).setScale(0.4);
        this.baby.body.immovable = true;
        this.baby.setDepth(invArtDepth);

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

        // Create hub door
        this.hubDoor = this.physics.add.sprite(400, 940, 'Door').setOrigin(0.5).setScale(4);
        this.hubDoor.body.immovable = true;
        this.hubDoor.body.setSize(30,60);
        this.hubDoor.body.setOffset(35, 17);
        this.hubDoor.setDepth(objectDepth);

        // Create Crow Artifact
        this.crow = this.physics.add.sprite(670, 500, 'Crow').setOrigin(0.5).setScale(0.4);
        this.crow.body.immovable = true;
        this.crow.body.enable = false;
        this.crow.visible = false;

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

        //Player physics
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.fires, this.resetPlayer, null, this);
        this.physics.add.collider(this.player, this.Npc);
        this.physics.add.collider(this.player, this.baby);
        this.physics.add.collider(this.player, this.crow);

        // Player hitbox physics
        this.physics.add.overlap(this.playerInteractBox, this.Npc, this.npcInteract, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.baby, this.pickUpBaby, null, this);
        this.physics.add.overlap(this.player, this.hubDoor, this.interactDoor, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.crow, this.pickUp, null, this);
        //let upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        //this.input.once('pointerdown', this.handleDialogueInteraction);

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

        if(this.startedPuzzle == true) {
            this.updateTimer();
        }
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
        if(this.vision) {
            if(this.dialogueIndex > 0) {
                this.bg.visible = true;
                this.visionPlayer.visible = true;
                this.visionRectangle.visible = true;
                this.visionImage.visible = true;
                this.dialogueText.setDepth(visionDepth+1).setColor('#000000');
            } else {
                this.dialogueRectangle.destroy();
                this.dialogueText.destroy();
                this.dialogueRectangle = this.add.rectangle(220, 100, 1470, 200, 0x000000).setOrigin(0).setDepth(dialogueDepth).setAlpha(0.5);
                this.dialogueText = this.add.text(220, 100, '', {fontSize: 40, color: '#ffffff', wordWrap: { width: 1470 }}).setDepth(dialogueDepth);
                this.dialogueText.setText(this.dialogueData[this.dialogueIndex]);
            }
        }
    }

    startDialogue() {
        this.dialogueActive = true;
        this.dialogueRectangle.visible = true;
        this.dialogueIndex = 0;
        if(this.vision) {
            this.dialogueData = [
                "What's this vision that's coming to me?!\n\n\n\nClick to Proceed",
                "*ANGEL*: One of Greek god Apollo’s best-known sons is Asclepius, the god of medicine and healing. Asclepius was conceived during an affair between Apollo and Princess Coronis. Apollo sent a white crow to keep watch over Coronis while she was carrying his child. But unfortunately, Apollo found out through the crow that Coronis was having an affair with another man. Apollo was so angry that he told his sister Artemis to kill Coronis and burn the crow on her funeral fire. Just as the flames crept over her dead body, Apollo rescued his unborn son Asclepius from the flames. Meanwhile the crow’s feathers were permanently blackened by the fire for all of eternity.\n\n\n\n\n\n\nClick to Proceed",
                "The crow the mom gave me looks like the same one that was burned and blackened from the fire... Weird...\nWell I better put this back on the pedestal.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nClick to Proceed"
            ];
        }
        this.displayNextMessage();
        // Disable character movement or perform other actions as needed
        this.player.body.enable = false;
    }

    finishDialogue() {
        this.dialogueActive = false;
        this.player.body.enable = true;
        this.dialogueRectangle.visible = false;
        this.dialogueText.setText('');
        if(this.vision) {
            // destroy vision created things
            this.bg.destroy();
            this.visionPlayer.destroy();
            this.visionRectangle.destroy();
            this.visionImage.destroy();
            this.dialogueText.setText('');
            console.log(this.dialogueIndex);
            this.events.emit('dialogueCompleteDone');
        }
        else if(this.startedPuzzle == false) {
            this.events.emit('dialogueCompleteStarted');
        } 
        else if(this.endedPuzzle == true) {
            this.events.emit('dialogueCompleteFinished');
        }
        // Enable character movement or perform other actions as needed
    }

    // Reset player when they touch the fire
    resetPlayer() {
        this.player.x = 400;
        this.player.y = 800;
        this.baby.visible = true;
        this.baby.body.enable = true;
        inventory.pop();
        this.inventoryArtifact.destroy();
        this.updateInventory();
    }

    npcInteract() {
        let eKey = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E));
        if (eKey && this.startedPuzzle == false) {
            this.internalRectangle.visible = false;
            this.internalText.visible = false;
            this.startDialogue();
            this.events.on('dialogueCompleteStarted', () => {
                // Handle actions after dialogue is completed
                this.startedPuzzle = true;
                this.timerText.visible = true;
                this.timerRect.visible = true;
                this.timer = this.time.addEvent({
                    delay: 40000, // delay of 1 second (1000 milliseconds)
                    callback: () => {this.scene.start('mazepuzzle')},
                    callbackScope: this,
                });
                this.dialogueData = ["Wow! Thank you for saving my baby!\n\nClick to Proceed", "It isn't much but here's a Crow in return\n\nClick to Proceed"];
            });
            
        }
        else if(eKey && inventory.length > 0) {
            this.startDialogue();
            this.timer.remove(false);
            this.endedPuzzle = true;
            this.timerText.visible = false;
            this.timerRect.visible = false;
            this.Npc.body.enable = false;
            this.events.on('dialogueCompleteFinished', () => {
                this.crow.body.enable = true;
                this.crow.visible = true;
                inventory.pop();
                this.updateInventory();
                this.startedPuzzle = false;
            });
        }
    }

    updateTimer() {
        const elapsedMilliseconds = this.timer.getElapsed();
        const milliseconds = Math.floor(elapsedMilliseconds) % 1000;
        const seconds = Math.floor(elapsedMilliseconds / 1000);

        // Format the time components with leading zeros
        const formattedTime = `${String(39-seconds).padStart(2, '0')}.${String(1000-milliseconds).padStart(3, '0')}`;

        this.timerText.setText(formattedTime);
    }
    
    pickUpBaby() {
        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)) && this.startedPuzzle == true) {
            this.baby.visible = false;
            this.baby.body.enable = false;
            inventory.push('Baby');
            this.updateInventory();
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

    updateInventory() {
        if(inventory.length > 0) {
            this.inventoryArtifact = this.add.sprite(1700,960, inventory[0]);
            if(inventory[0] != 'Baby') {
                this.inventoryArtifact.setScale(1.5);
            }
            this.inventoryArtifact.setDepth(invArtDepth);
            console.log(this.inventoryArtifact);
        } else {
            this.inventoryArtifact.destroy();
        }
    }

    pickUp () {
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
            this.vision = true;
            this.startDialogue();
            this.events.on('dialogueCompleteDone', () => {
                inventory.push('Crow');
                this.crow.body.enable = false;
                this.crow.visible = false;
                this.updateInventory();
                level4Complete = true;
            });
        }
    }
}