import { program } from 'commander';
import { makeCompanyCommand } from './commands/company';
import { makeInboxCommand } from './commands/inbox';
import { makeSetupCommand } from './commands/setup';

const main = async () => {
  const prog = program
    .name('fiken-utils')
    .description('Small utilities to make it easier to work with Fiken')
    .addCommand(makeSetupCommand())
    .addCommand(makeCompanyCommand())
    .addCommand(makeInboxCommand());

  prog.parse(process.argv);
};

main();
