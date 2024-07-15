# var list=[];
# if (me.wrath>0) list.push('clot','multiply cookies','ruin cookies');
# else list.push('frenzy','multiply cookies');
# if (me.wrath>0 && Game.hasGod && Game.hasGod('scorn')) list.push('clot','ruin cookies','clot','ruin cookies');
# if (me.wrath>0 && Math.random()<0.3) list.push('blood frenzy','chain cookie','cookie storm');
# else if (Math.random()<0.03 && Game.cookiesEarned>=100000) list.push('chain cookie','cookie storm');
# if (Math.random()<0.05 && Game.season=='fools') list.push('everything must go');
# if (Math.random()<0.1 && (Math.random()<0.05 || !Game.hasBuff('Dragonflight'))) list.push('click frenzy');
# if (me.wrath && Math.random()<0.1) list.push('cursed finger');

# if (Game.BuildingsOwned>=10 && Math.random()<0.25) list.push('building special');

# if (Game.canLumps() && Math.random()<0.0005) list.push('free sugar lump');

# if ((me.wrath==0 && Math.random()<0.15) || Math.random()<0.05)
# {
# 	//if (Game.hasAura('Reaper of Fields')) list.push('dragon harvest');
# 	if (Math.random()<Game.auraMult('Reaper of Fields')) list.push('dragon harvest');
# 	//if (Game.hasAura('Dragonflight')) list.push('dragonflight');
# 	if (Math.random()<Game.auraMult('Dragonflight')) list.push('dragonflight');
# }

# if (last!='' && Math.random()<0.8 && list.indexOf(last)!=-1) list.splice(list.indexOf(last),1);//80% chance to force a different one
# if (Math.random()<0.0001) list.push('blab');
# var choice=choose(list);

# Convert this into python code

import random


def test(wrath= 0, reaper=0, flight=0, last=''):
    list = []
    if wrath > 0:
        list.extend(['clot', 'multiply cookies', 'ruin cookies'])
    else:
        list.extend(['frenzy', 'multiply cookies'])
    
    # if me.wrath > 0 and Game.hasGod and Game.hasGod('scorn'):
    #     list.extend(['clot', 'ruin cookies', 'clot', 'ruin cookies'])
    
    if wrath > 0 and random.random() < 0.3:
        list.extend(['blood frenzy', 'chain cookie', 'cookie storm'])
    elif random.random() < 0.03:
        list.extend(['chain cookie', 'cookie storm'])
    
    if random.random() < 0.1 and (random.random() < 0.05 or not flight):
        list.append('click frenzy')
    
    if wrath and random.random() < 0.1:
        list.append('cursed finger')
    
    if random.random() < 0.25:
        list.append('building special')
    
    if random.random() < 0.0005:
        list.append('free sugar lump')
    
    if (wrath == 0 and random.random() < 0.15) or random.random() < 0.05:
        if random.random() < reaper:
            list.append('dragon harvest')
        if random.random() < flight:
            list.append('dragonflight')
    
    if last != '' and random.random() < 0.8 and list.index(last) != -1:
        list.remove(last)
    
    if random.random() < 0.0001:
        list.append('blab')
    # randomly choose from the list
    choice = random.choice(list)
    return choice