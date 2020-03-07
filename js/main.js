function update() {
    if (vars.game.inputEnabled===true) {
        thisPlayer = players.children.get(0);
        let playerFrame = '';
        let weaponSprite = '';
        // fire weapon - this goes first as player can still move when firing
        if (cursors.space.isDown) {
            if (vars.game.disableAttack===false) {
                vars.game.disableAttack = true;
                vars.game.firing = true;
                // stop the players movement
                thisPlayer.body.setVelocityX(0);
                thisPlayer.anims.play('fire');

                // set up frames
                playerFrame = 'fire';
                if (vars.player1.currentWeaponType<4) {
                    weaponSprite = 'weaponTip';
                } else {
                    weaponSprite = 'blaster';
                }
            }
        } else if (cursors.space.isUp) {
            vars.game.disableAttack = false;
        }

        // movement
        if (vars.game.firing===false) {
            if (cursors.left.isDown) {
                thisPlayer.body.setVelocityX(-400);
                thisPlayer.flipX = true;
                playerFrame = 'walkRight';
            } else if (cursors.right.isDown) {
                thisPlayer.body.setVelocityX(400);
                thisPlayer.flipX = false;
                playerFrame = 'walkRight';
            }
            
            if (playerFrame===''){
                thisPlayer.body.setVelocityX(0);
                playerFrame = 'aim';
            }
        }

        if (vars.game.firing===true) {
            if (vars.game.firingTimeOut>0) { vars.game.firingTimeOut-=1; } else { vars.game.firingTimeOut=10; vars.game.firing=false; }
            playerFrame = 'fire';
        }

        if (weaponSprite!='') {
            vars.game.visibleWeapons.push(new weapon());
        }
        
        thisPlayer.anims.play(playerFrame,true);
    }
}