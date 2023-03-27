var autoClickSugarLump = setInterval(function() {
    var age = Date.now()-Game.lumpT;
    if (age>Game.lumpRipeAge) {
        Game.clickLump();
    }
}, 1000);