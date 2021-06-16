import { Command } from 'commander';
import * as inquirer from 'inquirer';
import dedent from 'dedent';
import { config } from '../config';

export function makeSetupCommand() {
  const cmd = new Command('setup');
  cmd.action(setup);
  return cmd;
}

export async function setup() {
  console.log(dedent`
  Hello 👋

  Thank you for using fiken-utils! Let's get you started.
  All you need to do is make sure the API module is activated
  on the company you're working with and get a new personal
  API-key.

  To get a new key, go to: https://fiken.no/bruker/api

  `);

  const { token } = await inquirer.prompt<{ token: string }>([
    {
      name: 'token',
      type: 'password',
      message: 'Paste your «Personlig API-nøkkel» here:',
    },
  ]);

  config.set('token', token);

  console.log(dedent`
  You're token is now stored and you're ready to use fiken-utils!

  You should probably select which company to work with. You
  can do that with this:
  ▶ fiken company select
  `);
}
