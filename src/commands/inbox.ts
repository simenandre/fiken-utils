import { Command } from 'commander';
import { makeFikenClient } from '../fiken';
import { getCompanySlug } from '../utils/get-company-slug';
import { printTable } from '../utils/table';
// import * as inquirer from 'inquirer';
import dedent from 'dedent';

export function makeInboxCommand() {
  const cmd = new Command('inbox');
  cmd.command('list').action(list);
  cmd.command('clean').action(clean);
  return cmd;
}

export async function list() {
  const client = makeFikenClient();
  const inbox = client.inbox();
  const companySlug = await getCompanySlug();

  const c = await inbox.getInbox({ companySlug });
  printTable(c);
}

const BASE_URL =
  'https://fiken.no/data/foretak/fiken-demo-historisk-fasong-as1/innkommende-bilag/dokumenter';

export async function clean() {
  const client = makeFikenClient();
  const inbox = client.inbox();
  const companySlug = await getCompanySlug();

  const c = await inbox.getInbox({ companySlug });

  if (c.length === 0) {
    console.log('No items found');
    return;
  }

  // const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
  //   {
  //     name: 'confirm',
  //     type: 'confirm',
  //     message: `We found ${c.length} items in your inbox. Are you sure you want to remove all of them?`,
  //   },
  // ]);

  // if (confirm) {
    // Promise.all(c.map(item => {
    //   exec(
    //     `open -a "Google Chrome" https://fiken.no/data/foretak/fiken-demo-historisk-fasong-as1/innkommende-bilag/dokumenter/${item.documentId}`,
    //   );
    // }))

    const fetches = c.map(item => {
      return `  await fetch('${BASE_URL}/${item.documentId}', { method: 'DELETE' })`;
    });

    console.log(dedent`
    const main = async () => {
    ${fetches.join(',\n')}
    };
    main();
    `)
  // }
}
