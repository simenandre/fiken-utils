import * as fiken from 'fiken';
import { config } from './config';

export function makeFikenClient() {
  if (!config.has('token')) {
    throw new Error('You have to run «fiken setup» before running this command.');
  }

  const c = config.get<string, string>('token');
  return new FikenClient(c);
}

export class FikenClient {
  private config: fiken.Configuration;

  constructor(apiKey: string) {
    this.config = new fiken.Configuration({
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  companies(): fiken.CompaniesApi {
    return new fiken.CompaniesApi(this.config);
  }

  inbox(): fiken.InboxApi {
    return new fiken.InboxApi(this.config);
  }
}
