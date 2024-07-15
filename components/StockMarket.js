
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
