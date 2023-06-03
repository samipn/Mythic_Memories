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
      this.load.image('Door', 'Door.png');
      this.load.image('Lyre', 'Lyre.png');
      this.load.image('Bow', 'Bow.png');
      this.load.image('Scroll', 'Scroll.png');
      this.load.image('Crow', 'Crow.png');
    }
    create() {
        this.eKey = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E));
        this.inventoryArtifact = this.add.sprite(450, 675, 'Lyre').setOrigin(0.5,1);
        this.inventoryArtifact.setDepth(objectDepth);
        if(inventory.length > 0) {
            this.inventoryArtifact.destroy();
        }

        // Created Player
        this.player = this.physics.add.sprite(900, 400, 'Beta Apollo').setOrigin(0.5);
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

        // Created pedestals
        this.pedestals = this.add.group();

        this.pedestal1 = this.add.sprite(450,700,'Pedestal').setOrigin(0.5);
        this.pedestal1.name = "pedestal1";
        this.physics.add.existing(this.pedestal1);
        this.pedestal1.body.immovable = true;
        this.pedestal1.body.setSize(tileSize,tileSize/2 + 20);
        this.pedestal1.body.setOffset(0,tileSize/2 + 20);
        this.pedestal1.setDepth(envDepth);
        this.pedestals.add(this.pedestal1);
        this.objects.add(this.pedestal1);

        this.pedestal2 = this.add.sprite(750,700,'Pedestal').setOrigin(0.5);
        this.pedestal2.name = "pedestal2";
        this.physics.add.existing(this.pedestal2);
        this.pedestal2.body.immovable = true;
        this.pedestal2.body.setSize(tileSize,tileSize/2 + 20);
        this.pedestal2.body.setOffset(0,tileSize/2 + 20);
        this.pedestal2.setDepth(envDepth);
        this.pedestals.add(this.pedestal2);
        this.objects.add(this.pedestal2);

        this.pedestal3 = this.add.sprite(1050,700,'Pedestal').setOrigin(0.5);
        this.pedestal3.name = "pedestal3";
        this.physics.add.existing(this.pedestal3);
        this.pedestal3.body.immovable = true;
        this.pedestal3.body.setSize(tileSize,tileSize/2 + 20);
        this.pedestal3.body.setOffset(0,tileSize/2 + 20);
        this.pedestal3.setDepth(envDepth);
        this.pedestals.add(this.pedestal3);
        this.objects.add(this.pedestal3);

        this.pedestal4 = this.add.sprite(1350,700,'Pedestal').setOrigin(0.5);
        this.pedestal4.name = "pedestal4";
        this.physics.add.existing(this.pedestal4);
        this.pedestal4.body.immovable = true;
        this.pedestal4.body.setSize(tileSize,tileSize/2 + 20);
        this.pedestal4.body.setOffset(0,tileSize/2 + 20);
        this.pedestal4.setDepth(envDepth);
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

        this.crow = this.add.sprite(1350, 650, 'Crow').setOrigin(0.5,1);
        this.crow.setDepth(objectDepth);
        this.crow.visible = false;
        
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
        let invText = this.add.text(1570, 820, "Inventory", {fontSize: 40});
        invRect.setDepth(invDepth);
        invText.setDepth(invDepth);

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
                object.setDepth(objectDepth);
            } else{
                object.alpha = 1;
                object.setDepth(envDepth);
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
        if(pedestalArtifacts[3] == true) {
            this.crow.visible = true;
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
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E))) {
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
        let eKey = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E));
        if (eKey && (pedestal == this.pedestal1)) {
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
        else if (eKey && (pedestal == this.pedestal2)) {
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
        else if (eKey && (pedestal == this.pedestal3)) {
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

        else if (eKey && (pedestal == this.pedestal4)) {
            if(inventory.length == 1 && inventory[0] == 'Crow') {
                console.log("artifact placed on pedestal");
                pedestalArtifacts[3] = true;
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
            this.inventoryArtifact.setDepth(invArtDepth);
            console.log(this.inventoryArtifact);
        } else {
            this.inventoryArtifact.destroy();
        }
    }
}
