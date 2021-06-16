import { select } from '../commands/company';
import { config } from '../config';
export async function getCompanySlug(): Promise<string> {
  let companySlug = config.get<string, string>('currentCompany');
  if (!companySlug) {
    await select();
  }
  companySlug = config.get<string, string>('currentCompany');

  return companySlug;
}
