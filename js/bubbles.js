class bubble {
    constructor(startX,startY, bubbleColour, bubbleSize=3) {
        this.x = startX; this.y = startY;
        this.id = generateRandomID();
        this.bubbleSize = parseInt(bubbleSize.substr(-1));
        this.bubbleColour = bubbleColour;
        
        this.init();
    }

    init() {
        switch(this.bubbleSize) {
            case 0: 
                this.scale = 0.2;
            break;
            
            case 1: 
                this.scale = 0.4;
            break;
            
            case 2: 
                this.scale = 0.6;
            break;
            
            case 3: 
                this.scale = 1;
            break;
        }

        this.create();
    }

    create() {
        this.bubble = bubbles.create(this.x, this.y, 'bubble');
        this.bubble.name = this.id;
        this.bubble.setScale(this.scale);
        this.bubble.setVelocity(300,0);
        this.bubble.setAlpha(0.9);
        this.bubble.setBounce(1,1);
        this.bubble.setTint(this.bubbleColour);
    }

    destroy() {
        if (vars.DEBUG===true) { console.log('Destroying the bubble'); }
        let bubbleObjects = bubbles;
        let currentID = this.id;
        
        // first deal with the game objects
        bubbleObjects.children.each( function(_child) {
            if (_child.name===currentID) {
                _child.destroy();
            }
        })

        // then deal with the level bubbles
        let levelBubbles = vars.game.levelBubbles;
        for (let i=0; i<levelBubbles.length; i++) {
            if (levelBubbles[i].id === currentID) {
                vars.game.levelBubbles.splice(i,1);
            }
        }

        checkForLevelCompletion();
    }

    pop() {
        if (this.bubbleSize>0) { 
            this.bubbleSize-=1;
            switch(this.bubbleSize) {
                case 0: 
                    this.scale = 0.2;
                break;
                
                case 1: 
                    this.scale = 0.4;
                break;
                
                case 2: 
                    this.scale = 0.6;
                break;
            }
            this.bubble.setScale(this.scale).update();
        } else {
            this.destroy();
        }
    }

    changeBubbleColour(_colour='yellow') {
        vars.game.levelBubbles[0].bubble.setTint(vars.game.bubbleColours[_colour]);
    }
}

function changeBubbleColour(_colour) {
    vars.game.levelBubbles[0].changeBubbleColour(_colour);
}

function popBubble(weapon,bubble) {
    let bubbleID = bubble.name;
    let bubbleList = vars.game.levelBubbles;
    for (let i=0; i<bubbleList.length; i++) {
        if (bubbleID===bubbleList[i].id) {
            bubbleList[i].pop();
        }
    }
    let weaponID = weapon.name;
    dealWithProjectile(weapon,weaponID);
}