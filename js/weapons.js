class weapon {
    constructor() {
        this.weaponType = vars.player1.currentWeaponType;
        this.id = generateRandomID();
        this.init();
    }

    init() {
        // get player x and y
        this.playerFiring = 1;
        let currentPlayer = vars.game.players[this.playerFiring-1].player;
        this.spawnX = currentPlayer.x; this.spawnY = currentPlayer.y - 0.5*currentPlayer.displayHeight;
        switch(this.weaponType) {
            case 1: case 2: case 3: // there are only two main types of weapon. The line gun (1, 2 & 3) and the blaster (4)
                this.fireLineGun();
            break;

            case 4:
                this.fireBlaster();
            break;
        }

        // this code was in init() but I realised all guns in the game abide by these rules
        this.weapon.name = this.id;
        this.weapon.setData('firedFrom',this.weaponType);
        this.weapon.body.setVelocityY(-700);
        this.weapon.body.setAllowGravity(false);
    }

    fireLineGun() {
        this.weapon = weapons.create(this.spawnX, this.spawnY, 'weaponTip');
    }

    fireBlaster() {
        this.weapon = weapons.create(this.spawnX, this.spawnY, 'blaster');
    }

}

function dealWithProjectile(weapon) {
    let weaponID = weapon.name;
    let weaponType = weapon.texture.key;
    let firedFrom = weapon.getData('firedFrom');
    switch (weaponType) {
        case 'weaponTip':
            // 3 is the only weapon that attaches to gameborders and platforms
            if (firedFrom!=3) { projectileDestroy(weapon, weaponID); } else { projectileAttach(weapon, weaponID); }
        break;
        case 'blaster':
            projectileDestroy(weapon, weaponID);
        break;
    }
}

function projectileAttach() {

}

function projectileDestroy(weapon, _weaponID) {
    // remove it from the visibleWeapons array
    let vW = vars.game.visibleWeapons;
    for (i=0; i<vW.length; i++) {
        if (vW[i].id===_weaponID) {
            vW[i].weapon.destroy();
            vars.game.visibleWeapons.splice(i,1);
        }
    }
}