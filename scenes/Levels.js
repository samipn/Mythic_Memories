class CentralHub extends Phaser.Scene {
    constructor() {
        super('charactermovement');
    }
    preload() {
      this.load.path = "./assets/";		
      this.load.image('Beta Apollo', 'BetaApollo.png')
      this.load.image('Dirt', 'Dirt.png')
      this.load.image('Door', 'Door.png')
    }
    create() {
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
        this.pedastal1 = this.add.tileSprite(450,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.pedastal1.name = "pedastal1";
        this.physics.add.existing(this.pedastal1);
        this.pedastal1.body.immovable = true;
        this.pedastal1.body.setSize(tileSize,tileSize);
        this.pedastal1.body.setOffset(0,tileSize);
        this.pedastal1.setDepth(envDepth);
        this.objects.add(this.pedastal1);

        this.pedastal2 = this.add.tileSprite(750,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.pedastal2.name = "pedastal2";
        this.physics.add.existing(this.pedastal2);
        this.pedastal2.body.immovable = true;
        this.pedastal2.body.setSize(tileSize,tileSize);
        this.pedastal2.body.setOffset(0,tileSize);
        this.pedastal2.setDepth(envDepth);
        this.objects.add(this.pedastal2);

        this.pedastal3 = this.add.tileSprite(1050,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.pedastal3.name = "pedastal3";
        this.physics.add.existing(this.pedastal3);
        this.pedastal3.body.immovable = true;
        this.pedastal3.body.setSize(tileSize,tileSize);
        this.pedastal3.body.setOffset(0,tileSize);
        this.pedastal3.setDepth(envDepth);
        this.objects.add(this.pedastal3);

        this.pedastal4 = this.add.tileSprite(1350,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.pedastal4.name = "pedastal4";
        this.physics.add.existing(this.pedastal4);
        this.pedastal4.body.immovable = true;
        this.pedastal4.body.setSize(tileSize,tileSize);
        this.pedastal4.body.setOffset(0,tileSize);
        this.pedastal4.setDepth(envDepth);
        this.objects.add(this.pedastal4);


        // Created Puzzle Doors
        this.puzzleDoor1 = this.physics.add.sprite(450, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor1.body.immovable = true;
        this.puzzleDoor1.body.setSize(30,60);
        this.puzzleDoor1.body.setOffset(35, 17);
        this.puzzleDoor1.setDepth(objectDepth);

        this.puzzleDoor2 = this.physics.add.sprite(750, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor2.body.immovable = true;
        this.puzzleDoor2.body.setSize(30,60);
        this.puzzleDoor2.body.setOffset(35, 17);
        this.puzzleDoor2.setDepth(objectDepth);

        this.puzzleDoor3 = this.physics.add.sprite(1050, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor3.body.immovable = true;
        this.puzzleDoor3.body.setSize(30,60);
        this.puzzleDoor3.body.setOffset(35, 17);
        this.puzzleDoor3.setDepth(objectDepth);

        this.puzzleDoor4 = this.physics.add.sprite(1350, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor4.body.immovable = true;
        this.puzzleDoor4.body.setSize(30,60);
        this.puzzleDoor4.body.setOffset(35, 17);
        this.puzzleDoor4.setDepth(objectDepth);

        // Created collectables

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

        // Physics stuff
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.objects);
        this.physics.add.overlap(this.player, this.puzzleDoor1, this.interactDoor, null, this);
        this.physics.add.overlap(this.player, this.puzzleDoor2, this.interactDoor, null, this);
        this.physics.add.overlap(this.player, this.puzzleDoor3, this.interactDoor, null, this);
        this.physics.add.overlap(this.player, this.puzzleDoor4, this.interactDoor, null, this);
    }
    update() {
        // Hacky overlap detection
        //console.log(this.objects.children);
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

    interactDoor() {
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E).isDown) {
            console.log("good shit you're done for the day.");
        }
    }
}