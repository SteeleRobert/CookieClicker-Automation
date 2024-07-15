var autoClickSugarLump = setInterval(function() {
    var age = Date.now()-Game.lumpT;
    if (age>Game.lumpRipeAge && Game.lumpCurrentType != 4) {
        Game.clickLump();
    }
}, 1000);

var autoClickSugarLump = setInterval(function() {
    var age = Date.now()-Game.lumpT;
    if (age>Game.lumpOverripeAge-30000 && Game.lumpCurrentType == 4) {
        Game.clickLump();
    }
}, 1000);