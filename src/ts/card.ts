import { CardMap, CateMap, type CardId, type Cate } from "./const";

// 《弑君者》的故事背景是，一片大陆上有四个王国，但是这四个国家的国王、皇后、骑士们都被黑暗力量侵蚀了，所以王国里的勇士们纷纷挺身而出，要打到被黑化的boss们。
export class Card {
  number: CardId;
  cate: Cate;
  cateName: string;
  cateIcon: string;
  name: string;
  atk: number;
  hp: number;
  /**
   * 扑克
   * @param cate 方片、草花、红桃、黑桃、小丑
   * @param number 1 - 13: A - K，小丑为0
   */
  constructor(id: CardId, cate: Cate) {
    this.number = id;
    this.cate = cate;
    this.cateName = CateMap[cate].name;
    this.cateIcon = CateMap[cate].icon;
    this.name = CardMap[id].name;
    this.atk = CardMap[id].atk;
    this.hp = CardMap[id].hp;
  }
  display() {
    return `${this.cateIcon}${this.name}`;
  }
}
