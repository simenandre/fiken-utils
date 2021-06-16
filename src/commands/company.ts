import { Command } from 'commander';
import * as inquirer from 'inquirer';
import dedent from 'dedent';
import { config } from '../config';
import { makeFikenClient } from '../fiken';
import type { Company } from 'fiken';

export function makeCompanyCommand() {
  const cmd = new Command('company');
  cmd.command('select').action(select);
  return cmd;
}

export async function select() {
  const client = makeFikenClient();
  const companiesApi = client.companies();
  const companies = await companiesApi.getCompanies({});

  const { company } = await inquirer.prompt<{ company: Company }>([
    {
      name: 'company',
      type: 'list',
      message: 'Select company',
      choices: companies,
    },
  ]);

  const selectedCompany = companies.find(c => c.name === company);
  config.set('currentCompany', selectedCompany?.slug);

  console.log(dedent`
  Selected: ${company}

  Stored in the configuration.
  `);
}
