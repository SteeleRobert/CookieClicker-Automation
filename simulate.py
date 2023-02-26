import random


BANK_LEVEL = 7

def resting_value(id, bank_level):
    return 10 * (id + 1) + bank_level - 1

class stock:
    def __init__(self, id, bank_level):
        self.id = id
        self.val = resting_value(id, bank_level)
        self.d = 0
        self.mode = 0
        self.dur = 0
        self.history = []

# make a list of 17 stocks with id 0-16
stocks = [stock(i, BANK_LEVEL) for i in range(17)]

print(resting_value(0,BANK_LEVEL))

# convert this function to python
def tick(stocks, bank_level, dragonBoost):
    globD = 0
    globP = random.random()
    if random.random() < 0.1 + 0.1 * dragonBoost:
        globD = (random.random() - 0.5) * 2
    for me in stocks:
        me.d *= 0.97 + 0.01 * dragonBoost
        if me.mode == 0:
            me.d *= 0.95
            me.d += 0.05 * (random.random() - 0.5)
        elif me.mode == 1:
            me.d *= 0.99
            me.d += 0.05 * (random.random() - 0.1)
        elif me.mode == 2:
            me.d *= 0.99
            me.d -= 0.05 * (random.random() - 0.1)
        elif me.mode == 3:
            me.d += 0.15 * (random.random() - 0.1)
            me.val += random.random() * 5
        elif me.mode == 4:
            me.d -= 0.15 * (random.random() - 0.1)
            me.val -= random.random() * 5
        elif me.mode == 5:
            me.d += 0.3 * (random.random() - 0.5)
        me.val += (resting_value(me.id, bank_level) - me.val) * 0.01

        if globD != 0 and random.random() < globP:
            me.val -= (1 + me.d * (random.random() ** 3) * 7) * globD
            me.val -= globD * (1 + (random.random() ** 3) * 7)
            me.d += globD * (1 + random.random() * 4)
            me.dur = 0

        me.val += (((random.random() - 0.5) * 2) ** 11) * 3
        me.d += 0.1 * (random.random() - 0.5)
        if random.random() < 0.15:
            me.val += (random.random() - 0.5) * 3
        if random.random() < 0.03:
            me.val += (random.random() - 0.5) * (10 + 10 * dragonBoost)
        if random.random() < 0.1:
            me.d += (random.random() - 0.5) * (0.3 + 0.2 * dragonBoost)
        
        if me.mode == 5:
            if random.random() < 0.5:
                me.val += (random.random() - 0.5) * 10
            if random.random() < 0.2:
                me.d = (random.random() - 0.5) * (2 + 6 * dragonBoost)
        if me.mode == 3 and random.random() < 0.3:
            me.d += (random.random() - 0.5) * 0.1
            me.val += (random.random() - 0.7) * 10
        if me.mode == 3 and random.random() < 0.03:
            me.mode = 4
        if me.mode == 4 and random.random() < 0.3:
            me.d += (random.random() - 0.5) * 0.1
            me.val += (random.random() - 0.3) * 10
        if me.val > (100 + (bank_level - 1) * 3) and me.d > 0:
            me.d *= 0.9
        me.val += me.d
        if me.val < 5:
            me.val += (5 - me.val) * 0.5
        if me.val < 5 and me.d < 0:
            me.d *= 0.95
        me.val = max(me.val, 1)
        me.dur -= 1
        if me.dur <= 0:
            me.dur = int(10 + random.random() * (690 - 200 * dragonBoost))
            if random.random() < dragonBoost and random.random() < 0.5:
                me.mode = 5
            elif random.random() < 0.7 and (me.mode == 3 or me.mode == 4):
                me.mode = 5
            else:
                me.mode = random.choice([0, 1, 1, 2, 2, 3, 4, 5])
        me.history.append(me.val)

# run the function 100000 times
for i in range(100000):
    tick(stocks, BANK_LEVEL, 0)

# make a csv for each stock history uising pandas
import pandas as pd
df = pd.DataFrame()
for i in range(17):
    df[f'Stock{i}'] = stocks[i].history
    
df.to_csv(f'stock.csv', index=False)

# index of max value in list
def max_index(lst):
    return lst.index(max(lst))


