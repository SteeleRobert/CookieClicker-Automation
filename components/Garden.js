
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
            if (tile[0]-1 != plantId){
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
    var x_axis = [0,1,2,3,4,5];
    var y_axis = [0];
    clean_tiles(farm, x_axis, y_axis);
    var x_axis = [5];
    var y_axis = [0,1,2,3,4,5];
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
    'thumbcorn': {
        'method': 'Self',
        'parent': 'bakerWheat'
    },
    'doughshroom': {
        'method': 'Self',
        'parent': 'crumbspore'
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
    'elderwort': {
        'method': 'Cross',
        'parent1': 'cronerice',
        'parent2': 'shimmerlily'
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
    'whiteChocoroot': {
        'method': 'Cross',
        'parent1': 'chocoroot',
        'parent2': 'whiteMildew'
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
    'drowsyfern': {
        'method': 'Cross',
        'parent1': 'keenmoss',
        'parent2': 'chocoroot'
    },
    'duketater': {
        'method': 'Self',
        'parent': 'queenbeet'
    },
    'shriekbulb': {
        'method': 'Three',
        'parent': 'duketater',
    },
    'tidygrass': {
        'method': 'Cross',
        'parent1': 'whiteChocoroot',
        'parent2': 'bakerWheat'
    },
    'ichorpuff': {
        'method': 'Cross',
        'parent1': 'elderwort',
        'parent2': 'crumbspore'
    },
    'everdaisy': {
        'method': '3x3',
        'parent1': 'tidygrass',
        'parent2': 'elderwort'
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
    if(any_mature(farm) && all_unlocked(farm)){
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

function breed_eight(parent) {
    var farm = Game.ObjectsById[2].minigame;
    maximize_soil(farm)
    parent = plant_mapping[parent];
    if (!check_eight_mutition(farm, parent)){ 
        clean_all_plants(farm);
        plant_eight_mutition(farm, parent);
    }
    clean_eight_mutition(farm)
}

function breed_three_by_three(parent1, parent2) {
    var farm = Game.ObjectsById[2].minigame;
    maximize_soil(farm)
    new_ordering = get_long_short(parent1, parent2)
    longer = new_ordering[0]
    shorter = new_ordering[1]
    if (!check_longer_plant_3x3(farm, longer) && all_unlocked(farm)){ 
        clean_all_plants(farm);
        plant_longer_mutition_3x3(farm, longer);
    }
    if(!check_shorter_plant_3x3(farm, shorter) && all_unlocked(farm)){
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
    for (var plant in plant_breeding) {
        if(farm.plants[plant].unlocked == 0 && !plant_growing(farm, plant) && parents_unlocked(farm, plant_breeding[plant])){
            
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
    harvest_unlocked(farm)
    if(all_seeds_unlocked()){
        if(MAXIMIZE_SUGAR_LUMPS){
            farm.convert();
        }
        else{
            farm_bakeberries();
        }
    }
}, 10000);


