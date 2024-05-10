/**
 * 花色列表
 */
export const CateList = [1, 2, 3, 4] as const;

/**
 * 酒馆牌列表
 */
export const TavernList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const CateMap = {
  1: {
    name: "黑桃",
    icon: "♠️",
  },
  2: {
    name: "红桃",
    icon: "♥️",
  },
  3: {
    name: "草花",
    icon: "♣️",
  },
  4: {
    name: "方片",
    icon: "♦️",
  },
};
export const CardMap = {
  0: {
    name: "小丑",
    atk: 0,
    hp: 0,
  },
  1: {
    name: "A",
    atk: 1,
    hp: 0,
  },
  2: {
    name: "2",
    atk: 2,
    hp: 0,
  },
  3: {
    name: "3",
    atk: 3,
    hp: 0,
  },
  4: {
    name: "4",
    atk: 4,
    hp: 0,
  },
  5: {
    name: "5",
    atk: 5,
    hp: 0,
  },
  6: {
    name: "6",
    atk: 6,
    hp: 0,
  },
  7: {
    name: "7",
    atk: 7,
    hp: 0,
  },
  8: {
    name: "8",
    atk: 8,
    hp: 0,
  },
  9: {
    name: "9",
    atk: 9,
    hp: 0,
  },
  10: {
    name: "10",
    atk: 10,
    hp: 0,
  },
  11: {
    name: "J",
    atk: 10,
    hp: 20,
  },
  12: {
    name: "Q",
    atk: 15,
    hp: 30,
  },
  13: {
    name: "K",
    atk: 20,
    hp: 40,
  },
};

export type Cate = keyof typeof CateMap;
export type CardId = keyof typeof CardMap | 0;

/**
 * K、Q、J 三种 boss 的属性不同：
 * J: 10攻击 20生命
 * Q: 15攻击 30生命
 * K: 20攻击 40生命
 */
export const BossMap = {
  11: {
    atk: 10,
    hp: 20,
  },
  12: {
    atk: 15,
    hp: 30,
  },
  13: {
    atk: 20,
    hp: 40,
  },
};

/**
 * 根据玩家人数不同，抽牌数量也有所变化：
 * 4人玩家，2张鬼牌，手牌上限5张；
 * 3人玩家，1张鬼牌，手牌上限6张；
 * 2人玩家，0张鬼牌，手牌上限7张；
 * 1人玩家，鬼牌特殊使用，手牌上限8张；
 */
export const PlayerCountMap = {
  1: {
    max: 8,
    joker: -1, // 特殊使用
  },
  2: {
    max: 7,
    joker: 0, // 无鬼牌
  },
  3: {
    max: 6,
    joker: 1, // 一张鬼牌
  },
  4: {
    max: 5,
    joker: 2, // 2张鬼牌
  },
};
