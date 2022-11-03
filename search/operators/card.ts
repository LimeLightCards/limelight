import { ICardHelp } from '../../interfaces';
import { exactTextOperator } from './_helpers';

export const card = exactTextOperator(['card', 'id', 'code'], 'code');

export const cardDescription: ICardHelp = {
  name: 'Code / ID',
  id: 'code',

  icon: 'finger-print-outline',

  color: '#8360c3',

  help: `
You can find cards that match a certain code/id by using the \`id:\` operator.

This operator is special, you may also search without using the operator.
`,

  examples: [
    {
      example: '`5HY/W83-E001`',
      explanation: 'Find specifically the card matching 5HY/W83-E001',
    },
    {
      example: '`id:5HY/W83-E001`',
      explanation: 'Find specifically the card matching 5HY/W83-E001.',
    },
    {
      example: '`-id:5HY/W83-E001`',
      explanation: 'Exclude the card matching 5HY/W83-E001.',
    }
  ]
};
