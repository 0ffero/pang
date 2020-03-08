vars = {
    DEBUG: true,
    collectables: {
        clock: { // adds 5 seconds to timer
            
        },
        eggTimer: { // stops all bubbles for 5? seconds?
            
        },
        ninjaStar: { // invincibility

        }
    },
    font: {},
    game: {
        levelCurrent:     0,
        levelBG:          0,
        inputEnabled:  true,
        playerCount:      1,
        players:         [],
        levelBubbles:    [],
        bubbleColours:   {
            red:       '0xff0000',
            green:     '0x00ff00',
            blue:      '0x0000ff',
            yellow:    '0xffff00',
            turquoise: '0x00ffff',
            pink:      '0xff00ff',
            orange:    '0xff9900',
        },
        upScale:        4.5, // based on the original bubble sprite of 40,40 now=> 180,180
        disableAttack: false,
        firing:        false,
        firingTimeOut:    10,
        visibleWeapons:   [],
    },
    players: 1,
    player1: {
        startX: (2/3)*1700,
        startY: 920-36-145,
        lives: 3,
        currentWeaponType: 1,
    },
    player2: {
        startX: (1/3)*1700,
        startY: 920-36-145,
        lives: 3,
        currentWeaponType: 1,
    },
    weapons: {
        weapon1: {
            name: 'default',
            maxCount: 1,
        },
        weapon2: {
            name: 'solid',
            maxCount: 1,
        },
        weapon3: {
            name: 'multi',
            maxCount: 2,
        },
        weapon4: {
            name: 'blaster',
            maxCount: -1,
        }
    }
}

position = 0;
for (i=0;i<10;i++) { vars.font[i] = position; position++; }
for (i=65;i<=90; i++) { vars.font[String.fromCharCode(i)] = position; position++; }
alphaExtras = [':', '(', ')','-','©','x'];
for (i=0; i<alphaExtras.length; i++) { vars.font[alphaExtras[i]] = position; position++; }

var config = {
    type: Phaser.AUTO,
    width: 1700, height: 1080,
    title: "Pang!",
    parent: 'containerPang',
    input: {
        gamepad: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: initialise,
        update: update
    }
};

function preload() {
    this.load.setPath('assets');

    this.load.image(           'bubble', 'bubble_lowres.png' );
    this.load.image(     'gameBorder_h', 'gameBorder_h.png'  );
    this.load.image(     'gameBorder_v', 'gameBorder_v.png'  );
    if (window.location.hostname=='0ffero.github.io') {
        this.load.spritesheet(     'levels', 'backgroundsAImegaScaleForGithub.png', { frameWidth: 768, frameHeight: 416 });
        bgScale = 1700/768;
    } else {
        this.load.spritesheet(     'levels', 'backgroundsAImegaScale.png', { frameWidth: 1536, frameHeight: 832 });
        bgScale = 1700/1536;
    }
    this.load.spritesheet(    'player1', 'players_scaled.png',         { frameWidth:  145, frameHeight: 160 });
    this.load.spritesheet(  'weaponTip', 'weaponTip.png',              { frameWidth:   32, frameHeight:  45 });
    this.load.spritesheet(     'weapon', 'weapons.png',                { frameWidth:   32, frameHeight: 100 });
    this.load.spritesheet(    'blaster', 'blaster.png',                { frameWidth:   60, frameHeight:  45 });
    this.load.spritesheet(    'letters', 'letters.png',                { frameWidth:   23, frameHeight:  30 });
    this.load.spritesheet( 'winScreens', 'winScreens.png',             { frameWidth: 1012, frameHeight: 480 });

    game.canvas.id = 'Pang!';
}

function initialise() {
    scene = this;

    //PLAYER INPUT
    cursors = this.input.keyboard.createCursorKeys();

    // GROUPS
    gameBorders = this.physics.add.staticGroup();
    platforms   = this.physics.add.staticGroup();
    bubbles     = this.physics.add.group();
    players     = this.physics.add.group();
    weapons     = this.physics.add.group();

    drawGameBorders();

    // BACKGROUND
    levelBG = this.add.image(850, 460, 'levels', 0);
    levelBG.setScale(bgScale);
    levelBG.visible = true;
    winBG = this.add.image(850, 460, 'winScreens', 0);
    winBG.visible = false;

    // COLLISION
    scene.physics.add.collider(bubbles, gameBorders);
    scene.physics.add.collider(players, gameBorders);
    scene.physics.add.collider(weapons, bubbles, popBubble, null, this);
    scene.physics.add.collider(weapons, gameBorders, dealWithProjectile, null, this);

    generateAnimFrames();

    startGame();
}

function drawGameBorders() {
    gameBorderList = levels.gameBorders;
    for (i=0; i<gameBorderList.length; i++) {
        currentBorder = gameBorderList[i];
        pX = currentBorder[0]; pY = currentBorder[1]; pW = currentBorder[2]; pH = currentBorder[3]; ground = currentBorder[4];
        gameBorder = gameBorders.create(pX, pY, 'gameBorder_' + ground);
        scene.add.tileSprite(pX, pY, pW, pH, 'gameBorder_' + ground);
        if (currentBorder[5]!=undefined) { gameBorder.flipX=true; }
        gameBorder.setOrigin(0,0).setScale(pW,pH).refreshBody();
    }
}

function pausePhysics(_doit=true) {
    if (_doit===true) { scene.physics.pause(); } else { scene.physics.resume(); }
}

function startGame() {
    initLevelNumber(1);
    let x = vars.player1.startX; let y = vars.player1.startY;
    vars.game.players.push(new player(x,y, 'player1'));
}