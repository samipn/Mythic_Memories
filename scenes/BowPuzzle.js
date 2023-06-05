//Arrow Class
class Arrow extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y) {
		super(scene, x, y, 'Arrow');
        this.scene = scene;
	}

	fire(x, y) {
        if(this.scene.vision == false) {
            this.body.reset(x, y);
            this.setActive(true);
            this.setVisible(true);
            this.setDepth(objectDepth);
            this.setScale(0.3);
            this.setVelocityY(-400);
        }
		
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
        this.load.image('NpcB', 'NPC 1.png');
        this.load.image('Fence', 'Fence.png');
        this.load.image('bowApollo', 'holding bow.png');
        this.load.image('PythonVision', 'PythonVision.png')
    }

    create() {
        this.internalRectangle = this.add.rectangle(220, 100, 1470, 200, 0x000000).setOrigin(0).setDepth(dialogueDepth).setAlpha(0.5);
        this.internalText = this.add.text(220, 100, 'I should talk to that guy on the left.', {fontSize: 40, color: '#ffffff', wordWrap: { width: 1470 }}).setDepth(dialogueDepth);
        
        // Create Dialogue System
        this.vision = false;
        this.leftButtonClicked = false;
        this.dialogueActive = false;
        this.dialogueRectangle = this.add.rectangle(220, 100, 1470, 200, 0x000000).setOrigin(0).setDepth(dialogueDepth).setAlpha(0.5);
        this.dialogueRectangle.visible = false;
        this.dialogueText = this.add.text(220, 100, '', {fontSize: 40, color: '#ffffff', wordWrap: { width: 1470 }}).setDepth(dialogueDepth);
        this.dialogueData = ["What's this vision that's coming to me?!\n\n\n\nClick to Proceed",
                             "*ANGEL*: At just four days old, Apollo went on a hunt to avenge the Python who had tormented his pregnant mother. With his handy bow and arrow, he hit the Python and killed it instantly, while the nymphs of Delphi cheered him on. The Python’s mother Gaea, meanwhile, was deeply angered. So much so, she told Zeus to banish Apollo to Tartarus. Instead, Zeus punished Apollo by exiling him from Olympus and making him serve as a slave on earth for nine long years. At the end of his sentence Apollo patched things up with Gaea, and she gifted him the Oracular Temple of Delphi. To say thanks, Apollo set up the Pythian Games in her honor.\n\n\n\n\n\n\n\nClick to Proceed",
                             "It looks like that person killed the Python with the same bow I used... Weird...\nWell I better give this bow back to him.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nClick to Proceed"];
        
        this.dialogueIndex = 0;
        this.bg = this.add.rectangle(0,0,1920,1080,0xF1EB9C).setOrigin(0).setDepth(visionDepth);
        this.bg.visible = false;
        this.visionPlayer = this.add.image(300, 780, 'Beta Apollo').setOrigin(1,0).setScale(5).setDepth(visionDepth);
        this.visionPlayer.visible = false;
        this.visionRectangle = this.add.rectangle(220, 100, 1470, 720, 0xffffff).setOrigin(0).setDepth(visionDepth).setAlpha(1);
        this.visionRectangle.visible = false;
        this.visionImage = this.add.image(game.config.width/2, 600, 'PythonVision').setOrigin(0.5, 0).setScale(0.5).setDepth(visionDepth);
        this.visionImage.visible = false;

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
        this.hubDoor = this.physics.add.sprite(game.config.width/2, 940, 'Door').setOrigin(0.5).setScale(4);
        this.hubDoor.body.immovable = true;
        this.hubDoor.body.setSize(30,60);
        this.hubDoor.body.setOffset(35, 17);
        this.hubDoor.setDepth(objectDepth);

        // Create NPC
        this.Npc = this.physics.add.sprite(270, 800, 'NpcB').setOrigin(0.5).setScale(0.7);
        this.Npc.setDepth(envDepth);
        this.Npc.body.immovable = true;

        // Create npcText
        this.npcText = this.add.text(225, 220, "Hey kid, let's test your aim. Use this bow to destroy those \ntargets. (Press Space or Click)\n\nTalk to me once you kill them all or you need more arrows\n(You got 10).", {
            fontSize: 40,
            fill: '#000000',
        });
        this.npcText.setDepth(dialogueDepth+1);
        this.npcText.visible = false;

        // Create extra arrows text
        this.arrowsText = this.add.text(225, 220, "Here's some more arrows. Come on Kid.", {
            fontSize: 40,
            fill: '#000000',
        });
        this.arrowsText.setDepth(dialogueDepth+1);
        this.arrowsText.visible = false;

        // Victory Text
        this.victoryText = this.add.text(225, 220, "Nice aim, kid. You can keep the bow. I have no use for it \nanymore.", {
            fontSize: 40,
            fill: '#000000',
        });
        this.victoryText.setDepth(dialogueDepth+1);
        this.victoryText.visible = false;

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
        this.physics.add.collider(this.player, this.Npc);
        this.physics.add.collider(this.player, this.fence);
        this.physics.add.overlap(this.player, this.hubDoor, this.interactDoor, null, this);

        // Arrow Physics
        this.physics.add.collider(this.ArrowGroup, this.walls);
        this.physics.add.collider(this.ArrowGroup, this.Targets, this.destroyTarget, null, this);

        // Player hitbox physics
        this.physics.add.overlap(this.playerInteractBox, this.Npc, this.npcInteract, null, this);
    }
    
    update() {
        if (this.input.activePointer.leftButtonDown() && !this.leftButtonClicked) {
            this.leftButtonClicked = true;
            this.handleDialogueInteraction();
        }
        if (this.input.activePointer.leftButtonReleased()) {
            this.leftButtonClicked = false;
        }
        if(this.targetsHit == 4) {
            this.targetsHit += 1;
            this.vision = true;
            //this.ArrowGroup.destroy();
            this.startDialogue();
        }
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
        if(this.vision) {
            // destroy vision created things
            this.bg.destroy();
            this.visionPlayer.destroy();
            this.visionRectangle.destroy();
            this.visionImage.destroy();
            this.dialogueText.setText('');
            console.log(this.dialogueIndex);
        }
        // Enable character movement or perform other actions as needed
    }

    // If press E on npc
    npcInteract() {
        let eKey = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E));
        if (eKey && this.hasBow == false) {
            this.internalRectangle.visible = false;
            this.internalText.visible = false;
            this.chatBubble = this.add.rectangle(205, tileSize*SCALE*2, 1490, 300, 0xFFF8DC).setOrigin(0);
            this.physics.add.existing(this.chatBubble);
            this.chatBubble.body.immovable = true;
            this.chatBubble.setDepth(dialogueDepth);
            this.npcText.visible = true;
            this.physics.add.collider(this.player, this.chatBubble);
            this.hasBow = true;
            this.player.setTexture('bowApollo');
            this.player.body.enable = false;
            this.time.delayedCall(7000, () => {
                this.player.body.enable = true;
                this.npcText.destroy();
                this.chatBubble.destroy();
            });
        }
        else if (eKey && this.targetsHit == 5) {
            this.chatBubble = this.add.rectangle(205, tileSize*SCALE*2, 1490, 300, 0xFFF8DC).setOrigin(0);
            this.physics.add.existing(this.chatBubble);
            this.chatBubble.body.immovable = true;
            this.chatBubble.setDepth(dialogueDepth);
            this.victoryText.visible = true;
            this.physics.add.collider(this.player, this.chatBubble);
            this.hasBow = true;
            this.time.delayedCall(4000, () => {
                this.victoryText.destroy();
                this.chatBubble.destroy();
            });
            this.targetsHit += 1;
            inventory.push('Bow');
            this.updateInventory();
            level2Complete = true;
        }
        else if (eKey && this.ArrowGroup.getFrameQuantity() == 0){
            this.chatBubble = this.add.rectangle(205, tileSize*SCALE*2, 1490, 300, 0xFFF8DC).setOrigin(0);
            this.physics.add.existing(this.chatBubble);
            this.chatBubble.body.immovable = true;
            this.chatBubble.setDepth(dialogueDepth);
            this.arrowsText.visible = true;
            this.physics.add.collider(this.player, this.chatBubble);
            this.hasBow = true;
            this.time.delayedCall(3000, () => {
                this.arrowsText.destroy();
                this.chatBubble.destroy();
            });
            this.ArrowGroup = new ArrowGroup(this);
            this.physics.add.collider(this.ArrowGroup, this.walls, this.destroyArrow, null, this);
            this.physics.add.collider(this.ArrowGroup, this.Targets, this.destroyTarget, null, this);
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