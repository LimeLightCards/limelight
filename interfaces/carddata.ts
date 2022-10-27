
export enum CardType {
  Character = 'Character',
  Climax = 'Climax',
  Event = 'Event'
}

export enum CardColor {
  Red = 'R',
  Blue = 'B',
  Green = 'G',
  Yellow = 'Y'
}

export enum CardTrigger {
  Choice = 'CHOICE',
  Comeback = 'COMEBACK',
  Draw = 'DRAW',
  Gate = 'GATE',
  Pool = 'POOL',
  Return = 'RETURN',
  Shot = 'SHOT',
  Soul = 'SOUL',
  Standby = 'STANDBY',
  Treasure = 'TREASURE',
}

export interface ICardData {
  name: string;
  code: string;
  rarity: string;
  expansion: string;
  side: 'W'|'S';
  type: CardType;
  color: CardColor;
  level: 0|1|2|3;
  cost: 0|1|2|3|4|5|6|7|8|9;
  power: number;
  soul: 0|1|2|3;
  trigger: CardTrigger[];
  attributes: [string, string];
  ability: string[];
  flavorText: string;
  set: string;
  release: string;
  sid: string;
  image: string;
}
