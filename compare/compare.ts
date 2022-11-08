
import { sumBy } from 'lodash';

import { ICard } from '../interfaces';

export enum CardScore {
  Light = 1,
  Medium = 3,
  Heavy = 5
}

export function compare(myCard: ICard, checkCard: ICard): number {

  const staticKeys: Array<{ key: keyof ICard; value: CardScore }> = [
    { key: 'cost', value: CardScore.Light },
    { key: 'color', value: CardScore.Medium },
    { key: 'expansion', value: CardScore.Medium },
    { key: 'level', value: CardScore.Medium },
    { key: 'power', value: CardScore.Light },
    { key: 'type', value: CardScore.Heavy },
    { key: 'soul', value: CardScore.Light },
  ];

  const arrayKeys: Array<{ key: keyof ICard; value: CardScore }> = [
    { key: 'attributes', value: CardScore.Medium },
    { key: 'trigger', value: CardScore.Light },
    { key: 'tags', value: CardScore.Heavy },
  ];

  const totalScore = sumBy(staticKeys, 'value') + sumBy(arrayKeys, 'value');
  let currentScore = 0;

  staticKeys.forEach(key => {
    if(myCard[key.key] !== checkCard[key.key]) {
      return;
    }

    currentScore += key.value;
  });

  arrayKeys.forEach(({ key, value }) => {
    const valuePerPoint = value / (myCard[key] as string[]).length;

    (myCard[key] as string[]).forEach(cardKeyValue => {
      if(!(checkCard[key] as string[]).includes(cardKeyValue)) {
        return;
      }

      currentScore += valuePerPoint;
    });
  });

  return currentScore / totalScore;
}
