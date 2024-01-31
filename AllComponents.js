var autoGoldenCookie = setInterval(function() {
    while (0 < Game.shimmers.length) Game.shimmers[0].pop();
}, 1000);


const MULTIPLIER_THRESHOLD_1 = 300;
const MULTIPLIER_THRESHOLD_2 = 1000;
const CLICKER_THRESHOLD_1 = 5;
const CLICKER_THRESHOLD_2 = 300;
const SL_MULTIPLIER_THRESHOLD = 10000;
const SL_CLICKER_THRESHOLD = 1000;
  

function clicker_plus_multiplier(threshold){
    if (Game.computedMouseCps > Game.unbuffedCps*threshold*777/4) {
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
    if(Game.lumps > 10 && Game.canRefillLump()){
        if ((Game.cookiesPs/Game.unbuffedCps > SL_MULTIPLIER_THRESHOLD || clicker_plus_multiplier(SL_CLICKER_THRESHOLD)) ) {
            lump_cast();
        }
    }
}, 1000);

const CLICKER_PER_SECOND = 10;
var clickOnBuff = setInterval(function() {
    Game.ClickCookie();
},
1000/CLICKER_PER_SECOND
);

var autoClickSugarLump = setInterval(function() {
    var age = Date.now()-Game.lumpT;
    if (age>Game.lumpRipeAge && Game.lumpCurrentType != 4) {
        Game.clickLump();
    }
}, 1000);

var autoClickSugarLump = setInterval(function() {
    var age = Date.now()-Game.lumpT;
    if (age>Game.lumpOverripeAge-30000 && Game.lumpCurrentType != 4) {
        Game.clickLump();
    }
}, 1000);


var autoStockMarket = setInterval(function() {
    var S = Game.ObjectsById[5].minigame;
    stock_points = {
        0: [4.296752808225449, 74.29675280822545],
        1: [7.101098120866283, 69.60109812086628],
        2: [6.056790259536228, 76.05679025953623],
        3: [6.967195132086488, 91.96719513208649],
        4: [7.693608673653188, 97.69360867365319],
        5: [4.866925452745392, 84.86692545274539],
        6: [8.150600348757706, 93.1506003487577],
        7: [6.253081399632322, 116.25308139963232],
        8: [7.384369208292071, 119.88436920829207],
        9: [40.153257584487505, 127.6532575844875],
        10: [4.593442003495852, 134.59344200349585],
        11: [27.99021441180213, 142.99021441180213],
        12: [48.14629756608133, 138.14629756608133],
        13: [33.07745904023403, 138.07745904023403],
        14: [74.15591670938426, 144.15591670938426],
        15: [69.83242089997663, 142.33242089997663],
        16: [54.58890361704482, 167.08890361704482]
    }
    for (let i = 0; i < 17; i++) {
        if (stock_points[i][0] > S.goodsById[i].val && S.getGoodMaxStock(S.goodsById[i])-S.goodsById[i].stock > 0){
            S.buyGood(i,S.getGoodMaxStock(S.goodsById[i])-S.goodsById[i].stock);
        } else if (stock_points[i][1] < S.goodsById[i].val && S.goodsById[i].stock > 0){
            S.sellGood(i,S.goodsById[i].stock);
        }
      }
}, 60000);




var MAXIMIZE_SUGAR_LUMPS = true;
var PLANT_THRESHOLD = 5;
var BAKEBERRY_THRESHOLD_1 = 7;
var BAKEBERRY_THRESHOLD_2 = 50;

function farm_bakeberries() {
    var farm = Game.ObjectsById[2].minigame;
    if(farm.plantsById[8].unlocked == 1){
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                var tile = farm.plot[j][i]
                if (tile[0] == 0){
                    if (Game.cookiesPs/Game.unbuffedCps < PLANT_THRESHOLD) {
                        farm.seedSelected = 8
                        farm.clickTile(i,j);
                    }
                }
                else if (tile[1] > 90){
                    if (Game.cookiesPs/Game.unbuffedCps > BAKEBERRY_THRESHOLD_1) {
                        farm.clickTile(i,j);
                    }
                }
                else if (tile[1] >= farm.plantsById[tile[0]-1].mature){
                    if (Game.cookiesPs/Game.unbuffedCps > BAKEBERRY_THRESHOLD_2) {
                        farm.clickTile(i,j);
                    }
                }
            }
        }
    }
}

function farm_goldenclover() {
    var farm = Game.ObjectsById[2].minigame;
    if(farm.plantsById[5].unlocked == 1){
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                var tile = farm.plot[j][i]
                if (tile[0] == 0){
                    if (Game.cookiesPs/Game.unbuffedCps < PLANT_THRESHOLD) {
                        farm.seedSelected = 5
                        farm.clickTile(i,j);
                    }
                }
            }
        }
    }
}





// Helper functions

function all_seeds_unlocked(){
    var farm = Game.ObjectsById[2].minigame;
    // iterate through all seeds in dictionary farm.plants
    for (var i in farm.plants) {
        if (farm.plants[i].unlocked == 0){
            return false;
        }
    }
    return true;
}

function check_tiles(farm, plantId, x_axis, y_axis){
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            var tile = farm.plot[y_axis[j]][x_axis[i]]
            if (tile[0] == 0 || tile[0]-1 != plantId && farm.plantsById[tile[0]-1].unlocked == 1){
                return false;
            }
        }
    }
    return true;
};

function plant_tiles(farm, plantId, x_axis, y_axis){
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            if (Game.cookiesPs/Game.unbuffedCps < PLANT_THRESHOLD) {
                farm.seedSelected = plantId;
                // If plant at time is unlocked or tile is empty plant it
                var tile = farm.plot[y_axis[j]][x_axis[i]]
                if (tile[0] == 0 || farm.plantsById[tile[0]-1].unlocked == 1){
                    farm.clickTile(x_axis[i],y_axis[j]);
                }
            }
        }
    }
    return true;
};

function clean_all_plants(farm){
    var x_axis = [0,1,2,3,4,5];
    var y_axis = [0,1,2,3,4,5];
    clean_tiles(farm, x_axis, y_axis);
}

function clean_tiles(farm, x_axis, y_axis){
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            var tile = farm.plot[y_axis[j]][x_axis[i]]
            if (tile[0] != 0 && farm.plantsById[tile[0]-1].unlocked == 1) {
                farm.clickTile(x_axis[i],y_axis[j]);
            }
        }
    }
};

function all_unlocked(farm){
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            var tile = farm.plot[j][i]
            if (tile[0] != 0 && farm.plantsById[tile[0]-1].unlocked == 0){
                return false;
            }
        }
    }
    return true;
};

function harvest_unlocked(farm){
    var x_axis = [0,1,2,3,4,5];
    var y_axis = [0,1,2,3,4,5];
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            var tile = farm.plot[y_axis[j]][x_axis[i]]
            if (tile[0] != 0 && farm.plantsById[tile[0]-1].unlocked == 0 && farm.plantsById[tile[0]-1].mature <= tile[1]){
                farm.clickTile(x_axis[i],y_axis[j]);
            }
        }
    }
};

function change_soil(farm, soilId){
    if (!(farm.freeze || farm.soil==soilId || farm.nextSoil>Date.now())){
        farm.nextSoil=Date.now()+(Game.Has('Turbo-charged soil')?1:(1000*60*10));
        farm.toCompute=true;farm.soil=soilId;farm.computeStepT();
        for (var i in farm.soils){var it=farm.soils[i];if (it.id==farm.soil){l('gardenSoil-'+it.id).classList.add('on');}else{l('gardenSoil-'+it.id).classList.remove('on');}}
    }
};

function any_mature(farm){
    var x_axis = [0,1,2,3,4,5];
    var y_axis = [0,1,2,3,4,5];
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            var tile = farm.plot[y_axis[j]][x_axis[i]]
            if (tile[0] != 0 && farm.plantsById[tile[0]-1].mature <= tile[1]){
                return true;
            }
        }
    }
    return false;
};

function get_mature_time(parent, age) {
    var farm = Game.ObjectsById[2].minigame;
    var rate = farm.plantsById[parent].ageTick;
    var ticks2mature = farm.plantsById[parent].mature - age;
    return ticks2mature/rate;
};

function get_long_short(parent1, parent2) {
    parent1 = plant_mapping[parent1]
    parent2 = plant_mapping[parent2]
    if (get_mature_time(parent1, 0) > get_mature_time(parent2, 0)){
        return [parent1, parent2]
    }
    else{
        return [parent2, parent1]
    }
};

// Self mutition functions

function check_self_mutition(farm, plantId){
    const x_axis = [1,4];
    const y_axis = [0,1,2,4,5];
    return check_tiles(farm, plantId, x_axis, y_axis);
};

function plant_self_mutition(farm, plantId){
    const x_axis = [1,4];
    const y_axis = [0,1,2,4,5];
    plant_tiles(farm, plantId, x_axis, y_axis)
};

function clean_self_mutition(farm){
    var x_axis = [0,2,3,5];
    var y_axis = [0,1,2,3,4,5];
    clean_tiles(farm, x_axis, y_axis);
    x_axis = [0,1,2,3,4,5];
    y_axis = [3];
    clean_tiles(farm, x_axis, y_axis);
};


// Cross mutition functions

function check_longer_plant(farm, plantId){
    const x_axis = [1,4];
    const y_axis = [1,4];
    return check_tiles(farm, plantId, x_axis, y_axis);
};

function check_shorter_plant(farm, plantId){
    var x_axis = [1];
    var y_axis = [0,2,5];
    if(!check_tiles(farm, plantId, x_axis, y_axis)){
        return false;
    }
    x_axis = [4];
    y_axis = [0,3,5];
    return check_tiles(farm, plantId, x_axis, y_axis);
};


function plant_longer_mutition(farm, plantId){
    const x_axis = [1,4];
    const y_axis = [1,4];
    plant_tiles(farm, plantId, x_axis, y_axis)
    return true;
};

function plant_shorter_mutition(farm, plantId){
    var x_axis = [1,4];
    var y_axis = [1,4];
    var time_to_mature = 1000;
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            var tile = farm.plot[y_axis[j]][x_axis[i]]
            if (tile[0] != 0) {
                time_to_mature = Math.min(get_mature_time(tile[0]-1, tile[1]),time_to_mature);
            }
        }
    }
    if (time_to_mature < get_mature_time(plantId, 0)) {
        x_axis = [1];
        y_axis = [0,2,5];
        plant_tiles(farm, plantId, x_axis, y_axis)
        x_axis = [4];
        y_axis = [0,3,5];
        plant_tiles(farm, plantId, x_axis, y_axis)
    }
};

function clean_short_mutations(farm){
    var x_axis = [1];
    var y_axis = [0,2,5];
    clean_tiles(farm, x_axis, y_axis);
    x_axis = [4];
    y_axis = [0,3,5];
    clean_tiles(farm, x_axis, y_axis);
};

function clean_two_mutition(farm){
    var x_axis = [0,2,3,5];
    var y_axis = [0,1,2,3,4,5];
    clean_tiles(farm, x_axis, y_axis);
    x_axis = [0,1,2];
    y_axis = [3];
    clean_tiles(farm, x_axis, y_axis);
    x_axis = [3,4,5];
    y_axis = [2];
    clean_tiles(farm, x_axis, y_axis);
};

// Three mutition functions

function check_three_mutition(farm, plantId){
    const x_axis = [0,2,4];
    const y_axis = [0,1,2,3,4,5];
    return check_tiles(farm, plantId, x_axis, y_axis);
};

function plant_three_mutition(farm, plantId){
    const x_axis = [0,2,4];
    const y_axis = [0,1,2,3,4,5];
    plant_tiles(farm, plantId, x_axis, y_axis)
};

function clean_three_mutition(farm){
    var x_axis = [1,3,5];
    var y_axis = [0,1,2,3,4,5];
    clean_tiles(farm, x_axis, y_axis);
};

// Eight mutition functions

function check_eight_mutition(farm, plantId){
    var x_axis = [0,2,4];
    var y_axis = [1,2,3,4,5];
    if(!check_tiles(farm, plantId, x_axis, y_axis)){
        return false;
    }
    x_axis = [1,3];
    y_axis = [1,3,5];
    return check_tiles(farm, plantId, x_axis, y_axis);
};

function plant_eight_mutition(farm, plantId){
    var x_axis = [0,2,4];
    var y_axis = [1,2,3,4,5];
    plant_tiles(farm, plantId, x_axis, y_axis)
    x_axis = [1,3];
    y_axis = [1,3,5];
    plant_tiles(farm, plantId, x_axis, y_axis)
};

function clean_eight_mutition(farm){
    var x_axis = [1,3,5];
    var y_axis = [0];
    clean_tiles(farm, x_axis, y_axis);
    var x_axis = [5];
    var y_axis = [0,2,4];
    clean_tiles(farm, x_axis, y_axis);
    var x_axis = [1,3];
    var y_axis = [2,4];
    clean_tiles(farm, x_axis, y_axis);
};

// 3x3 mutition functions

function check_longer_plant_3x3(farm, plantId){
    const x_axis = [2];
    const y_axis = [0,1,2,3,4,5];
    return check_tiles(farm, plantId, x_axis, y_axis);
};

function check_shorter_plant_3x3(farm, plantId){
    const x_axis = [0,4];
    const y_axis = [0,1,2,3,4,5];
    return check_tiles(farm, plantId, x_axis, y_axis);
};


function plant_longer_mutition_3x3(farm, plantId){
    const x_axis = [2];
    const y_axis = [0,1,2,3,4,5];
    plant_tiles(farm, plantId, x_axis, y_axis)
};

function plant_shorter_mutition_3x3(farm, plantId){
    const x_axis = [2];
    const y_axis = [0,1,2,3,4,5];
    var time_to_mature = 1000;
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            var tile = farm.plot[y_axis[j]][x_axis[i]]
            if (tile[0] != 0) {
                time_to_mature = Math.min(get_mature_time(tile[0]-1, tile[1]),time_to_mature);
            }
        }
    }
    if (time_to_mature < get_mature_time(plantId, 0)) {
        const x_axis = [0,4];
        const y_axis = [0,1,2,3,4,5];
        plant_tiles(farm, plantId, x_axis, y_axis)
    }
};

function clean_short_mutations_3x3(farm){
    const x_axis = [0,4];
    const y_axis = [0,1,2,3,4,5];
    clean_tiles(farm, x_axis, y_axis);
}

function clean_two_mutition_3x3(farm){
    var x_axis = [1,3,5];
    var y_axis = [0,1,2,3,4,5];
    clean_tiles(farm, x_axis, y_axis);
}


function check_side_longer(farm, plantId){
    var x_axis = [0,4];
    var y_axis = [0];
    if(!check_tiles(farm, plantId, x_axis, y_axis)){
        return false;
    }
    x_axis = [5];
    y_axis = [3];
    return check_tiles(farm, plantId, x_axis, y_axis);
}

function check_side_shorter(farm, plantId){
    var x_axis = [2];
    var y_axis = [0];
    if(!check_tiles(farm, plantId, x_axis, y_axis)){
        return false;
    }
    x_axis = [5];
    y_axis = [1,5];
    return check_tiles(farm, plantId, x_axis, y_axis);
}

function plant_side_longer(farm, plantId){
    var x_axis = [0,4];
    var y_axis = [0];
    plant_tiles(farm, plantId, x_axis, y_axis)
    x_axis = [5];
    y_axis = [3];
    plant_tiles(farm, plantId, x_axis, y_axis)
}

function plant_side_shorter(farm, plantId){
    var x_axis = [0,4];
    var y_axis = [0];
    var time_to_mature = 1000;
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            var tile = farm.plot[y_axis[j]][x_axis[i]]
            if (tile[0] != 0) {
                time_to_mature = Math.min(get_mature_time(tile[0]-1, tile[1]),time_to_mature);
            }
        }
    }
    x_axis = [5];
    y_axis = [3];
    for (let i = 0; i < x_axis.length; i++) {
        for (let j = 0; j < y_axis.length; j++) {
            var tile = farm.plot[y_axis[j]][x_axis[i]]
            if (tile[0] != 0) {
                time_to_mature = Math.min(get_mature_time(tile[0]-1, tile[1]),time_to_mature);
            }
        }
    }
    if (time_to_mature < get_mature_time(plantId, 0)) {
        var x_axis = [2];
        var y_axis = [0];
        plant_tiles(farm, plantId, x_axis, y_axis)
        x_axis = [5];
        y_axis = [1,5];
        plant_tiles(farm, plantId, x_axis, y_axis)
    }
}

function clean_side_shorter(farm){
    var x_axis = [2];
    var y_axis = [0];
    clean_tiles(farm, x_axis, y_axis);
    x_axis = [5];
    y_axis = [1,5];
    clean_tiles(farm, x_axis, y_axis);
}

function clean_all_edges(farm){
    var x_axis = [0,1,2,3,4,5];
    var y_axis = [0];
    clean_tiles(farm, x_axis, y_axis);
    x_axis = [5];
    y_axis = [0,1,2,3,4,5];
    clean_tiles(farm, x_axis, y_axis);
}


function side_breed(parent1, parent2) {
    var farm = Game.ObjectsById[2].minigame;
    new_ordering = get_long_short(parent1, parent2)
    longer = new_ordering[0]
    shorter = new_ordering[1]
    if (!check_side_longer(farm, longer)){ 
        clean_all_edges(farm);
        plant_side_longer(farm, longer);
    }
    if(!check_side_shorter(farm, shorter)){
        clean_side_shorter(farm);
        plant_side_shorter(farm, shorter)
    }
};



var plant_mapping = {
    'bakerWheat':0,
    'thumbcorn':1,
    'cronerice':2,
    'gildmillet':3,
    'clover':4,
    'goldenClover':5,
    'shimmerlily':6,
    'elderwort':7,
    'bakeberry':8,
    'chocoroot':9,
    'whiteChocoroot':10,
    'whiteMildew':11,
    'brownMold':12,
    'meddleweed':13,
    'whiskerbloom':14,
    'chimerose':15,
    'nursetulip':16,
    'drowsyfern':17,
    'wardlichen':18,
    'keenmoss':19,
    'queenbeet':20,
    'queenbeetLump':21,
    'duketater':22,
    'crumbspore':23,
    'doughshroom':24,
    'glovemorel':25,
    'cheapcap':26,
    'foolBolete':27,
    'wrinklegill':28,
    'greenRot':29,
    'shriekbulb':30,
    'tidygrass':31,
    'everdaisy':32,
    'ichorpuff':33
}

var plant_breeding ={
    'meddleweed': {
        'method': 'Spawn'
    },
    'crumbspore': {
        'method': 'meddleweed'
    },
    'brownMold': {
        'method': 'meddleweed'
    },
    'whiteMildew': {
        'method': 'Self',
        'parent': 'brownMold'
    },
    'bakeberry': {
        'method': 'Self',
        'parent': 'bakerWheat'
    },
    'chocoroot': {
        'method': 'Cross',
        'parent1': 'bakerWheat',
        'parent2': 'brownMold'
    },
    'queenbeet': {
        'method': 'Cross',
        'parent1': 'chocoroot',
        'parent2': 'bakeberry'
    },
    'queenbeetLump': {
        'method': 'Eight',
        'parent': 'queenbeet',
    },
    'elderwort': {
        'method': 'Cross',
        'parent1': 'cronerice',
        'parent2': 'shimmerlily'
    },
    'whiteChocoroot': {
        'method': 'Cross',
        'parent1': 'chocoroot',
        'parent2': 'whiteMildew'
    },
    'tidygrass': {
        'method': 'Cross',
        'parent1': 'whiteChocoroot',
        'parent2': 'bakerWheat'
    },
    'everdaisy': {
        'method': '3x3',
        'parent1': 'tidygrass',
        'parent2': 'elderwort'
    },
    'ichorpuff': {
        'method': 'Cross',
        'parent1': 'elderwort',
        'parent2': 'crumbspore'
    },
    'thumbcorn': {
        'method': 'Self',
        'parent': 'bakerWheat'
    },
    'cronerice': {
        'method': 'Cross',
        'parent1': 'bakerWheat',
        'parent2': 'thumbcorn'
    },
    'gildmillet': {
        'method': 'Cross',
        'parent1': 'cronerice',
        'parent2': 'thumbcorn'
    },
    'clover': {
        'method': 'Cross',
        'parent1': 'bakerWheat',
        'parent2': 'gildmillet'
    },
    'goldenClover': {
        'method': 'Cross',
        'parent1': 'bakerWheat',
        'parent2': 'gildmillet'
    },
    'shimmerlily': {
        'method': 'Cross',
        'parent1': 'clover',
        'parent2': 'gildmillet'
    },
    'doughshroom': {
        'method': 'Self',
        'parent': 'crumbspore'
    },
    'greenRot': {
        'method': 'Cross',
        'parent1': 'whiteMildew',
        'parent2': 'clover'
    },
    'keenmoss': {
        'method': 'Cross',
        'parent1': 'brownMold',
        'parent2': 'greenRot'
    },
    'drowsyfern': {
        'method': 'Cross',
        'parent1': 'keenmoss',
        'parent2': 'chocoroot'
    },
    'duketater': {
        'method': 'Self',
        'parent': 'queenbeet'
    },
    'wardlichen': {
        'method': 'Cross',
        'parent1': 'keenmoss',
        'parent2': 'cronerice'
    },
    'glovemorel': {
        'method': 'Cross',
        'parent1': 'crumbspore',
        'parent2': 'thumbcorn'
    },
    'cheapcap': {
        'method': 'Cross',
        'parent1': 'crumbspore',
        'parent2': 'shimmerlily'
    },
    'wrinklegill': {
        'method': 'Cross',
        'parent1': 'crumbspore',
        'parent2': 'brownMold'
    },
    'foolBolete': {
        'method': 'Cross',
        'parent1': 'doughshroom',
        'parent2': 'greenRot'
    },
    'whiskerbloom': {
        'method': 'Cross',
        'parent1': 'shimmerlily',
        'parent2': 'whiteChocoroot'
    },
    'nursetulip': {
        'method': 'Self',
        'parent': 'whiskerbloom'
    },
    'chimerose': {
        'method': 'Cross',
        'parent1': 'whiskerbloom',
        'parent2': 'shimmerlily'
    },
    'shriekbulb': {
        'method': 'Three',
        'parent': 'duketater',
    },
}

function spawn() {
    var farm = Game.ObjectsById[2].minigame;
    change_soil(farm,1);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            var tile = farm.plot[j][i]
            if (tile[0] != 0 && tile[1] >= farm.plantsById[tile[0]-1].mature && (farm.plantsById[tile[0]-1].unlocked == 0 || tile[0]-1 == plant_mapping['meddleweed'])){
                farm.clickTile(i,j);
            }
            if (tile[0] != 0 && tile[0]-1 != plant_mapping['meddleweed'] && farm.plantsById[tile[0]-1].unlocked != 0){
                farm.clickTile(i,j);
            }
        }
    }
}

function clean_meddle(){
    var farm = Game.ObjectsById[2].minigame;
    change_soil(farm,1);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            var tile = farm.plot[j][i]
            if (tile[0] != 0 && (tile[1] >= farm.plantsById[tile[0]-1].mature || (tile[0]-1 != plant_mapping['meddleweed'] && farm.plantsById[tile[0]-1].unlocked == 1))){
                farm.clickTile(i,j);
            }
        }
    }

}

function plant_meddle(){
    var farm = Game.ObjectsById[2].minigame;
    change_soil(farm,1);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            var tile = farm.plot[j][i];
            if (tile[0] == 0){
                plant_tiles(farm, plant_mapping['meddleweed'], [i], [j])
            }
        }
    }

}

function meddleweed() {
    clean_meddle();
    plant_meddle();
}

function maximize_soil(farm) {
    if(any_mature(farm)){// && all_unlocked(farm)){
        change_soil(farm,4);
    }
    else{
        change_soil(farm,1);
    }
}

function breed_self(parent) {
    var farm = Game.ObjectsById[2].minigame;
    maximize_soil(farm)
    parent = plant_mapping[parent];
    if (!check_self_mutition(farm, parent)){ 
        clean_all_plants(farm);
        plant_self_mutition(farm, parent);
    }
    clean_self_mutition(farm)
}

function breed_cross(parent1, parent2) {
    var farm = Game.ObjectsById[2].minigame;
    maximize_soil(farm)
    new_ordering = get_long_short(parent1, parent2)
    longer = new_ordering[0]
    shorter = new_ordering[1]
    if (!check_longer_plant(farm, longer)){ 
        clean_all_plants(farm);
        plant_longer_mutition(farm, longer);
    }
    if(!check_shorter_plant(farm, shorter)){
        clean_short_mutations(farm);
        plant_shorter_mutition(farm, shorter)
    }
    clean_two_mutition(farm)
}

function breed_three(parent) {
    var farm = Game.ObjectsById[2].minigame;
    maximize_soil(farm)
    parent = plant_mapping[parent];
    if (!check_three_mutition(farm, parent)){ 
        clean_all_plants(farm);
        plant_three_mutition(farm, parent);
    }
    clean_three_mutition(farm)
}

// Plants breed self or breed cross along the edges of the 8x8 farm
function side_plant_eight_mutition(farm){
    // Select plant that is not unlocked
    for (var plant in plant_breeding) {
        if(farm.plants[plant].unlocked == 0 && !plant_growing(farm, plant) && parents_unlocked(farm, plant_breeding[plant]) && (plant_breeding[plant].method == 'Self' || plant_breeding[plant].method == 'Cross') && plant != "duketater"){
            if(plant_breeding[plant].method == 'Self'){
                side_breed(plant_breeding[plant].parent, plant_breeding[plant].parent);
            }
            else if(plant_breeding[plant].method == 'Cross'){
                side_breed(plant_breeding[plant].parent1, plant_breeding[plant].parent2);
            }
            break;
        }
    }

}



function breed_eight(parent) {
    var farm = Game.ObjectsById[2].minigame;
    maximize_soil(farm)
    parent = plant_mapping[parent];
    if (!check_eight_mutition(farm, parent)){ 
        clean_all_plants(farm);
        plant_eight_mutition(farm, parent);
    }
    side_plant_eight_mutition(farm)
    clean_eight_mutition(farm)
}



function breed_three_by_three(parent1, parent2) {
    var farm = Game.ObjectsById[2].minigame;
    maximize_soil(farm)
    new_ordering = get_long_short(parent1, parent2)
    longer = new_ordering[0]
    shorter = new_ordering[1]
    if (!check_longer_plant_3x3(farm, longer)){ 
        clean_all_plants(farm);
        plant_longer_mutition_3x3(farm, longer);
    }
    if(!check_shorter_plant_3x3(farm, shorter)){
        clean_short_mutations_3x3(farm);
        plant_shorter_mutition_3x3(farm, shorter)
    }
    clean_two_mutition_3x3(farm)
}

// Checks if a plant with a given name is currently in the farm
function plant_growing(farm, plant){
    plant = plant_mapping[plant];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++){
            var tile = farm.plot[j][i];
            if (tile[0]-1 == plant){
                return true;
            }
        }
    }
    return false;
}

function parents_unlocked(farm, parents){
    if (parents.method == 'Spawn' || parents.method == 'meddleweed'){
        return true;
    }
    else if (parents.method == 'Self' || parents.method == 'Three' || parents.method == 'Eight'){
        if (farm.plants[parents.parent].unlocked == 1){
            return true;
        }
    }
    else{
        if(farm.plants[parents.parent1].unlocked == 1 && farm.plants[parents.parent2].unlocked == 1){
            return true;
        }
    }

}

var get_all_plants = setInterval(function() {
    var farm = Game.ObjectsById[2].minigame;
    // iterate through plant_breeding
    var growing = false;
    
    for (var plant in plant_breeding) {
        if(farm.plants[plant].unlocked == 0 && !plant_growing(farm, plant) && parents_unlocked(farm, plant_breeding[plant])){
            growing = true;
            if(plant_breeding[plant].method == 'Spawn'){
                spawn();
            }
            if(plant_breeding[plant].method == 'meddleweed'){
                meddleweed();
            }
            else if(plant_breeding[plant].method == 'Self'){
                breed_self(plant_breeding[plant].parent);
            }
            else if(plant_breeding[plant].method == 'Cross'){
                breed_cross(plant_breeding[plant].parent1, plant_breeding[plant].parent2);
            }
            else if(plant_breeding[plant].method == 'Three'){
                breed_three(plant_breeding[plant].parent);
            }
            else if(plant_breeding[plant].method == 'Eight'){
                breed_eight(plant_breeding[plant].parent);
            }
            else if(plant_breeding[plant].method == '3x3'){
                breed_three_by_three(plant_breeding[plant].parent1, plant_breeding[plant].parent2);
            }
            break;
        }
    }
    harvest_unlocked(farm);
    if(!growing && MAXIMIZE_SUGAR_LUMPS){
        clean_all_plants(farm);
        maximize_soil(farm);
    }
    if(all_seeds_unlocked()){
        if(MAXIMIZE_SUGAR_LUMPS){
            farm.convert();
        }
        else{
            farm_goldenclover();
            return;
        }
    }
}, 10000);



