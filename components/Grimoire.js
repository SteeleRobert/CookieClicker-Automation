const MULTIPLIER_THRESHOLD_1 = 1000;
const MULTIPLIER_THRESHOLD_2 = 1000;
const CLICKER_THRESHOLD_1 = 300;
const CLICKER_THRESHOLD_2 = 300;
const SL_MULTIPLIER_THRESHOLD = 10000;
const SL_CLICKER_THRESHOLD = 1000;
  

function clicker_plus_multiplier(threshold){
    if (Game.computedMouseCps > Game.unbuffedCps*threshold*777/4) {
        return true;
    }
    return false;
}


var change_elders = setInterval(function() {
    if ('Frenzy' in Game.buffs && Game.elderWrath == 0){
        Game.UpgradesById[85].click()
    }
    else if (Game.elderWrath > 0 && !('Frenzy' in Game.buffs)){
        Game.UpgradesById[84].click()
    }
}, 1000);


var autoCastSpells = setInterval(function() {
    var M=Game.ObjectsById[7].minigame; 
    var tower = Game.ObjectsById[7];
    if (Game.cookiesPs/Game.unbuffedCps > MULTIPLIER_THRESHOLD_1 || clicker_plus_multiplier(CLICKER_THRESHOLD_1)) {
        if (M.magic == M.magicM) {
            M.castSpell(M.spellsById[1]);
        }
        var age = Date.now()-Game.lumpT;
        if(Game.lumpCurrentType == 4 && age>Game.lumpRipeAge){
            while (M.magic <= M.magicM && tower.amount > 0) {
                tower.sell(1);
                // Update the amount of magic using same function as base game
                var towers=Math.max(M.parent.amount,1);
                var lvl=Math.max(M.parent.level,1);
                M.magicM=Math.floor(4+Math.pow(towers,0.6)+Math.log((towers+(lvl-1)*10)/15+1)*15);
            }
            M.castSpell(M.spellsById[1]);
            while(tower.amount < 430){
                tower.buy(1);
            }
            lump_cast();
            Game.clickLump();
            lump_cast();
        }
    }
}, 1000);

var sell_cast = setInterval(function() {
    var M=Game.ObjectsById[7].minigame; 
    var tower = Game.ObjectsById[7];
    if ((Game.cookiesPs/Game.unbuffedCps > MULTIPLIER_THRESHOLD_2 || clicker_plus_multiplier(CLICKER_THRESHOLD_2)) && M.magic > 25 ) {
        
        while (M.magic <= M.magicM && M.magic > 25 && tower.amount > 0) {
            tower.sell(1);
            // Update the amount of magic using same function as base game
            var towers=Math.max(M.parent.amount,1);
            var lvl=Math.max(M.parent.level,1);
            M.magicM=Math.floor(4+Math.pow(towers,0.6)+Math.log((towers+(lvl-1)*10)/15+1)*15);
        }
        M.castSpell(M.spellsById[1]);
        while(tower.amount < 460){
            tower.buy(1);
        }

    }
}, 1000);

function lump_cast(){
    var M=Game.ObjectsById[7].minigame; 
    var tower = Game.ObjectsById[7];
    Game.refillLump(1,function(){
        M.magic+=100;
        M.magic=Math.min(M.magic,M.magicM);
        PlaySound('snd/pop'+Math.floor(Math.random()*3+1)+'.mp3',0.75);
    });
    
    while (M.magic <= M.magicM && M.magic > 25 && tower.amount > 0) {
        tower.sell(1);
        // Update the amount of magic using same function as base game
        var towers=Math.max(M.parent.amount,1);
        var lvl=Math.max(M.parent.level,1);
        M.magicM=Math.floor(4+Math.pow(towers,0.6)+Math.log((towers+(lvl-1)*10)/15+1)*15);
    }
    M.castSpell(M.spellsById[1]);
    
    while (M.magic <= M.magicM && M.magic > 25 && tower.amount > 0) {
        tower.sell(1);
        // Update the amount of magic using same function as base game
        var towers=Math.max(M.parent.amount,1);
        var lvl=Math.max(M.parent.level,1);
        M.magicM=Math.floor(4+Math.pow(towers,0.6)+Math.log((towers+(lvl-1)*10)/15+1)*15);
    }
    M.castSpell(M.spellsById[1]);
    while(tower.amount < 460){
        tower.buy(1);
    }
}

var activate_lump_cast = setInterval(function() {
    var M=Game.ObjectsById[7].minigame; 
    var tower = Game.ObjectsById[7];
    if(Game.lumps > 100 && Game.canRefillLump()){
        if ((Game.cookiesPs/Game.unbuffedCps > SL_MULTIPLIER_THRESHOLD || clicker_plus_multiplier(SL_CLICKER_THRESHOLD)) ) {
            lump_cast();
        }
    }
}, 1000);