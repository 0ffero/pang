levels = {
    gameBorders: [
        [0, 0, 1700/72, 1, 'h'],
        [0, 0, 1, 920/36, 'v'],
        [1700-36, 0, 1, 920/36, 'v'],
        [0, 920-36, 800, 1, 'h'],
    ],
    map1: {
        bubbles: {
            size0: {
                count: 0,
            },
            size1: {
                count: 0,
            },
            size2: {
                count: 0,
            },
            size3: {
                count: 1,
                spawnPositions: [
                    [200, 200]
                ],
            },
            colour: '0xff0000',
        },
        bgImage: 0,
    },
}

function getNextLevelBG() {
    if (vars.game.levelBG<49) { vars.game.levelBG++; } else { vars.game.levelBG=0; }
    levelBG.setFrame(vars.game.levelBG);
}

function checkForLevelCompletion() {
    if (vars.game.levelBubbles.length===0) {
        if (vars.DEBUG===true) { console.log('Well Done!'); }
        vars.game.inputEnabled = false;
        scene.physics.pause();
        levelBG.visible = false;
        hidePlayers(true);
        winBG.visible = true;
    }
}

function initLevelNumber(_levelNum=1) {
    let map = levels['map' + _levelNum];
    let bubbleColour = map.bubbles.colour;
    let x=0; let y=0;
    for (mapBubble in map.bubbles) {
        if (mapBubble.includes('size')) {
            if (map.bubbles[mapBubble].count>0 && map.bubbles[mapBubble].spawnPositions.length==map.bubbles[mapBubble].count) {
                spawnBubble(mapBubble, map.bubbles[mapBubble].count, map.bubbles[mapBubble].spawnPositions, bubbleColour)
            }
        }
    }
    levelBG.visible = true;
    hidePlayers(false);
    vars.game.inputEnabled = true;
    scene.physics.resume();
}

function spawnBubble(_size, _count, _spawnPositions, _colour) {
    if (_count>0) {
        if (vars.DEBUG===true) { console.log('Spawning ' + _count + ' ' + _colour  + ' bubble(s) of ' + _size); }
        for (let i=0; i<_count; i++) {
            let x=_spawnPositions[i][0];
            let y=_spawnPositions[i][1];
            vars.game.levelBubbles.push(new bubble(x,y,_colour,_size,300,0));
        }
    }
}