var MULTIPLIER_THRESHOLD_1 = 300;
var MULTIPLIER_THRESHOLD_2 = 1000;
var CLICKER_THRESHOLD_1 = 5;
var CLICKER_THRESHOLD_2 = 300;


function clicker_plus_multiplier(threshold){
    if (Game.cookiesPs/Game.unbuffedCps > threshold && Game.computedMouseCps > Game.cookiesPs) {
        return true;
    }
    return false;
}

// Cast the Golden Cookie Spell When very buffed
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
    if (Game.cookiesPs/Game.unbuffedCps > MULTIPLIER_THRESHOLD_2 || clicker_plus_multiplier(CLICKER_THRESHOLD_2)) {
        console.log("Selling and casting");
        while (M.magic <= M.magicM) {
            tower.sell(1);
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