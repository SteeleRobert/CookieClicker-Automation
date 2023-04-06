var MULTIPLIER_THRESHOLD_1 = 300;
var MULTIPLIER_THRESHOLD_2 = 1000;
var CLICKER_THRESHOLD_1 = 5;
var CLICKER_THRESHOLD_2 = 300;
var SL_MULTIPLIER_THRESHOLD = 10000;
var SL_CLICKER_THRESHOLD = 1000;


function clicker_plus_multiplier(threshold){
    if (Game.cookiesPs/Game.unbuffedCps > threshold && Game.computedMouseCps > Game.cookiesPs) {
        return true;
    }
    return false;
}

var autoCastSpells = setInterval(function() {
    var M=Game.ObjectsById[7].minigame; 
    var tower = Game.ObjectsById[7];
    if (Game.cookiesPs/Game.unbuffedCps > MULTIPLIER_THRESHOLD_1 || clicker_plus_multiplier(CLICKER_THRESHOLD_1)) {
        if (M.magic == M.magicM) {
            M.castSpell(M.spellsById[1]);
        }
    }
}, 1000);

var sell_cast = setInterval(function() {
    var M=Game.ObjectsById[7].minigame; 
    var tower = Game.ObjectsById[7];
    if ((Game.cookiesPs/Game.unbuffedCps > MULTIPLIER_THRESHOLD_2 || clicker_plus_multiplier(CLICKER_THRESHOLD_2)) && M.magic > 25) {
        console.log("Selling and casting");
        while (M.magic <= M.magicM) {
            tower.sell(1);
            // Update the amount of magic using same function as base game
            var towers=Math.max(M.parent.amount,1);
            var lvl=Math.max(M.parent.level,1);
            M.magicM=Math.floor(4+Math.pow(towers,0.6)+Math.log((towers+(lvl-1)*10)/15+1)*15);
        }
        M.castSpell(M.spellsById[1]);
        while(tower.amount < 750){
            tower.buy(1);
        }
    }
}, 1000);

var sell_cast = setInterval(function() {
    var M=Game.ObjectsById[7].minigame; 
    var tower = Game.ObjectsById[7];
    if(Game.lumps > 100 && Game.canRefillLump()){
        if ((Game.cookiesPs/Game.unbuffedCps > SL_MULTIPLIER_THRESHOLD || clicker_plus_multiplier(SL_CLICKER_THRESHOLD)) ) {
            console.log("Refill")
            Game.refillLump(1,function(){
				M.magic+=100;
				M.magic=Math.min(M.magic,M.magicM);
				PlaySound('snd/pop'+Math.floor(Math.random()*3+1)+'.mp3',0.75);
			});
            console.log('First Spell')
            while (M.magic <= M.magicM && M.magic > 25) {
                tower.sell(1);
                // Update the amount of magic using same function as base game
                var towers=Math.max(M.parent.amount,1);
                var lvl=Math.max(M.parent.level,1);
                M.magicM=Math.floor(4+Math.pow(towers,0.6)+Math.log((towers+(lvl-1)*10)/15+1)*15);
            }
            M.castSpell(M.spellsById[1]);
            console.log('Second Spell')
            while (M.magic <= M.magicM && M.magic > 25) {
                tower.sell(1);
                // Update the amount of magic using same function as base game
                var towers=Math.max(M.parent.amount,1);
                var lvl=Math.max(M.parent.level,1);
                M.magicM=Math.floor(4+Math.pow(towers,0.6)+Math.log((towers+(lvl-1)*10)/15+1)*15);
            }
            M.castSpell(M.spellsById[1]);
            while(tower.amount < 750){
                tower.buy(1);
            }
        }
    }
}, 1000);