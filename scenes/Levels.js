class CoreGameplay extends Phaser.Scene {
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

        // Created Puzzle Doors
        this.puzzleDoor1 = this.physics.add.sprite(500, 153, 'Door').setOrigin(0.5).setScale(3);
        this.puzzleDoor1.body.immovable = true;
        this.puzzleDoor1.body.setSize(30,60);
        this.puzzleDoor1.body.setOffset(35, 17);
        this.puzzleDoor1.setDepth(objectDepth);

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

        // Created collidable objects
        this.objects = this.add.group();
        this.object = this.add.tileSprite(1000,700,tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.object.name = "object";
        this.physics.add.existing(this.object);
        this.object.body.immovable = true;
        this.object.body.setSize(tileSize,tileSize);
        this.object.body.setOffset(0,tileSize);
        this.object.setDepth(envDepth);
        this.objects.add(this.object);

        // Created overlap hitboxes
        this.objectOverlaps = this.add.group();
        this.objectOverlapBody = this.add.tileSprite(this.object.x, this.object.y, tileSize, tileSize*2,'Dirt').setScale(SCALE).setOrigin(0.5);
        this.physics.add.existing(this.objectOverlapBody);
        this.objectOverlapBody.body.immovable = true;
        this.objectOverlapBody.visible = false;
        this.objectOverlaps.add(this.objectOverlapBody);

        // Physics stuff
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.objects);
        this.physics.add.overlap(this.player, this.puzzleDoor1, this.interactDoor, null, this);
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