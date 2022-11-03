import { ICardHelp } from '../../interfaces';
import { partialTextOperator } from './_helpers';

export const name = partialTextOperator(['name', 'n'], 'name');

export const nameDescription: ICardHelp = {
  name: 'Name',
  id: 'name',

  icon: 'person-outline',

  color: '#6370ff',

  help: `
You can find cards that match a certain expansion by using the \`name:\` or \`n:\` operator.

This operator is a loose-text operator, which means that you can use partial names.
You can also specify multiple expansions by separating them with a comma.
If a name has spaces in its name, you must use quotation marks around the name.
`,

  examples: [
    {
      example: '`Nino Nakano`',
      explanation: 'Cards with "Nino Nakano" in their name.',
    },
    {
      example: '`name:nakano`',
      explanation: 'Cards that have "Nakano" in their name.',
    },
    {
      example: '`-name:"Futaro Uesugi"`',
      explanation: 'Cards without "Futaro Uesugi" in their name.',
    }
  ]
};
