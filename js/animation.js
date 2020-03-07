function generateAnimFrames() {
    // PLAYER ANIMATIONS
    selectedSprite = 'player1';
    scene.anims.create({
        key: 'aim',
        frames: [ { key: selectedSprite, frame: 0 } ],
        frameRate: 20
    });

    scene.anims.create({
        key: 'fire',
        frames: [ { key: selectedSprite, frame: 1 } ],
        frameRate: 20
    });

    scene.anims.create({
        key: 'walkRight',
        frames: scene.anims.generateFrameNumbers(selectedSprite, { start: 2, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'dead',
        frames: scene.anims.generateFrameNumbers(selectedSprite, { start: 6, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'climb',
        frames: scene.anims.generateFrameNumbers(selectedSprite, { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    
    scene.anims.create({
        key: 'clamber',
        frames: [ { key: selectedSprite, frame: 12 } ],
        frameRate: 10
    });
    
    // WEAPONS
    selectedSprite = 'weaponTip';
    scene.anims.create({
        key: 'default',
        frames: scene.anims.generateFrameNumbers(selectedSprite, { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    selectedSprite = 'blaster';
    scene.anims.create({
        key: 'init',
        frames: [ { key: selectedSprite, frame: 0 } ],
        frameRate: 10
    });

    scene.anims.create({
        key: 'default',
        frames: scene.anims.generateFrameNumbers(selectedSprite, { start: 1, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
}