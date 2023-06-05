class RiddlePuzzle extends Phaser.Scene {
    constructor() {
        super('riddlepuzzle');
    }

    preload() {
        this.load.path = "./assets/";		
        this.load.image('NpcR', 'NPC 2.png');
        this.load.image('A', 'A.png');
        this.load.image('S', 'S.png');
        this.load.image('D', 'D.png');
        this.load.image('F', 'F.png');
        this.load.image('LiarVision', 'LiarVision.png')
    }

    create() {
        // Create Dialogue System
        this.vision = false;
        this.leftButtonClicked = false;
        this.dialogueActive = false;
        this.dialogueRectangle = this.add.rectangle(220, 100, 1470, 200, 0x000000).setOrigin(0).setDepth(dialogueDepth).setAlpha(0.5);
        this.dialogueRectangle.visible = false;
        this.dialogueText = this.add.text(220, 100, '', {fontSize: 40, color: '#ffffff', wordWrap: { width: 1470 }}).setDepth(dialogueDepth);
        this.dialogueData = ["What's this vision that's coming to me?!\n\n\n\nClick to Proceed",
                             "*ANGEL*: Greek god Apollo never married. But he did inherit his father’s lustful ways, and had several love affairs with both men and women. He even fathered a large number of children out of marriage. Not all Apollo’s advances were well received, however, as we can see in the story between Apollo and Cassandra, daughter to King Priam of Troy. Apollo was quite taken with Cassandra, and he tried to win over her affection by gifting her the gift of prophecy. When she spurned his advances, Apollo’s infatuation quickly turned sour, and he made sure that no one would ever believe her predictions were true. Sadly, this meant when Cassandra predicted the fall of Troy and the death of Agamemnon, she was dismissed by everyone around her as a liar.\n\n\nClick to Proceed",
                             "It looks like that gift Apollo gave her is the same prophecy scroll this person gave me... Weird...\nWell I better put this back on the pedestal.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nClick to Proceed"];
        
        this.dialogueIndex = 0;
        this.bg = this.add.rectangle(0,0,1920,1080,0xF1EB9C).setOrigin(0).setDepth(visionDepth);
        this.bg.visible = false;
        this.visionPlayer = this.add.image(300, 780, 'Beta Apollo').setOrigin(1,0).setScale(5).setDepth(visionDepth);
        this.visionPlayer.visible = false;
        this.visionRectangle = this.add.rectangle(220, 100, 1470, 720, 0xffffff).setOrigin(0).setDepth(visionDepth).setAlpha(1);
        this.visionRectangle.visible = false;
        this.visionImage = this.add.image(1600, 100, 'LiarVision').setOrigin(0.5, 0).setScale(0.745).setDepth(visionDepth);
        this.visionImage.visible = false;

        this.internalRectangle = this.add.rectangle(220, 100, 1470, 200, 0x000000).setOrigin(0).setDepth(dialogueDepth).setAlpha(0.5);
        this.internalText = this.add.text(220, 100, 'I should talk to that person on the right.', {fontSize: 40, color: '#ffffff', wordWrap: { width: 1470 }}).setDepth(dialogueDepth);

        this.eKey = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E));
        this.inventoryArtifact = this.add.sprite(450, 675, 'Scroll').setOrigin(0.5,1);

        this.currentQuestion = 0;
        this.answerArray = [];
        this.canAnswer = false;

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
        
        // Create hub door
        this.hubDoor = this.physics.add.sprite(game.config.width/2, 940, 'Door').setOrigin(0.5).setScale(4);
        this.hubDoor.body.immovable = true;
        this.hubDoor.body.setSize(30,60);
        this.hubDoor.body.setOffset(35, 17);
        this.hubDoor.setDepth(objectDepth);

        // Create Artifact (Level Complete)
        this.scroll = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'Scroll').setOrigin(0.5);
        this.scroll.body.immovable = true;
        this.scroll.body.enable = false;
        this.scroll.visible = false;
        
        // Created Answer Buttons
        this.answerButtons = this.add.group();

        this.answerButtonA = this.physics.add.sprite(450, 700, 'A').setOrigin(0.5).setScale(3);
        this.answerButtonA.name = "A";
        this.answerButtonA.body.immovable = true; 
        this.answerButtons.add(this.answerButtonA);

        this.answerButtonB = this.physics.add.sprite(750, 700, 'S').setOrigin(0.5).setScale(3);
        this.answerButtonB.name = "B";
        this.answerButtonB.body.immovable = true; 
        this.answerButtons.add(this.answerButtonB);

        this.answerButtonC = this.physics.add.sprite(1050, 700, 'D').setOrigin(0.5).setScale(3);
        this.answerButtonC.name = "C";
        this.answerButtonC.body.immovable = true; 
        this.answerButtons.add(this.answerButtonC);

        this.answerButtonD = this.physics.add.sprite(1350, 700, 'F').setOrigin(0.5).setScale(3);
        this.answerButtonD.name = "D";
        this.answerButtonD.body.immovable = true; 
        this.answerButtons.add(this.answerButtonD);

        // Create NPC
        this.Npc = this.physics.add.sprite(1600, 700, 'NpcR').setOrigin(0.5).setScale(0.7);
        this.Npc.setFlipX(true);
        this.Npc.body.immovable = true;

        // Create riddles
        this.npcText = this.add.text(225, 220, "In order to complete this puzzle you must answer my riddles\nBy Interacting with the buttons that will be labeled answers\nto my riddles.", {
            fontSize: 40,
            fill: '#000000',
        });
        this.npcText.visible = false;
        this.npcText.setDepth(objectDepth);
        
        this.riddle1 = this.add.text(225, 220, "What musical instrument doesn't tell the truth? \nA. Lute \nS. Lyre \nD. Harp \nF. Piano", {
                fontSize: 40,
                fill: '#000000',
        });
        this.riddle1.visible = false;
        this.riddle1.setDepth(objectDepth);

        this.riddle2 = this.add.text(225, 220, "Though made of wood, I hold strength untold. \nWith tension and release, my purpose unfolds. \nA. Bow \nS. Spoon \nD. Chair \nF. Door", {
            fontSize: 40,
            fill: '#000000',
        });
        this.riddle2.visible = false;
        this.riddle2.setDepth(objectDepth);

        this.riddle3 = this.add.text(225, 220, "What can bring back the dead; make you cry, make you laugh, \nmake you young; is born in an instant, yet lasts a lifetime. \nA. Time \nS. Potion \nD. Memory \nF. Grim Reaper", {
            fontSize: 40,
            fill: '#000000',
        });
        this.riddle3.visible = false;
        this.riddle3.setDepth(objectDepth);

        this.victoryText = this.add.text(225, 220, "I can't believe you've done it. Take this scroll as a reward.", {
            fontSize: 40,
            fill: '#000000',
        });
        this.victoryText.visible = false;
        this.victoryText.setDepth(objectDepth);

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
        this.physics.add.collider(this.player, this.answerButtons);
        this.physics.add.collider(this.player, this.Npc);
        this.physics.add.collider(this.player, this.scroll);

        // Player hitbox physics
        this.physics.add.overlap(this.playerInteractBox, this.Npc, this.npcInteract, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.answerButtons, this.checkAnswer, null, this);
        this.physics.add.overlap(this.player, this.hubDoor, this.interactDoor, null, this);
        this.physics.add.overlap(this.playerInteractBox, this.scroll, this.pickUp, null, this);

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
            this.dialogueText.setDepth(visionDepth+1).setColor('#000000').setWordWrapWidth(1220);
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
        if(this.vision) {
            // destroy vision created things
            this.bg.destroy();
            this.visionPlayer.destroy();
            this.visionRectangle.destroy();
            this.visionImage.destroy();
            this.dialogueText.setText('');
            console.log(this.dialogueIndex);
        }
        this.events.emit('dialogueComplete');
        // Enable character movement or perform other actions as needed
    }

    npcInteract() {
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)) && this.currentQuestion == 0) {
            this.internalRectangle.visible = false;
            this.internalText.visible = false;
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
        let eKey = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E));
        //console.log(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)));
        if (eKey && this.currentQuestion == 1 && this.canAnswer == true) {
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
        else if (eKey && this.currentQuestion == 2 && this.canAnswer == true) {
            console.log("test");
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
        else if (eKey && this.currentQuestion == 3 && this.canAnswer == true) {
            this.answerArray.push(answer.name);
            this.riddle3.visible = false;
            this.canAnswer = false;
            if (this.answerArray[0] == 'B' && this.answerArray[1] == 'A' && this.answerArray[2] == 'C') {
                this.chatBubble = this.add.rectangle(205, tileSize*SCALE*2, 1490, 300, 0xFFF8DC).setOrigin(0);
                this.physics.add.existing(this.chatBubble);
                this.chatBubble.body.immovable = true;
                this.chatBubble.setDepth(envDepth);
                this.victoryText.visible = true;
                this.physics.add.collider(this.player, this.chatBubble);
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
            if(inventory[0] != 'Scroll') {
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
            this.events.on('dialogueComplete', () => {
                inventory.push('Scroll');
                this.scroll.body.enable = false;
                this.scroll.visible = false;
                this.updateInventory();
                level3Complete = true;
            });
        }
    }
}