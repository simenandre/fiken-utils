import { default as Conf } from 'conf';

export const config = new Conf({
  schema: {
    token: {
      type: 'string',
    },
    currentCompany: {
      type: 'string',
    },
  },
});
