class player {
    constructor(x,y,spriteSheet) {
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;

        this.init();
    }

    init() {
        this.player = players.create(this.x, this.y, this.spriteSheet);
    }
}

function hidePlayers(_hide=true) {
    players.children.each( function(child) {
        if (_hide==true) { child.visible=false; } else { child.visible=true; }
    })
}