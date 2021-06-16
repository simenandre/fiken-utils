import Table from 'cli-table3';
export function printTable(
  data: Record<string, any>[],
) {
  if (data.length === 0) {
    console.log('Nothing was found');
    return;
  }

  const head = Object.keys(data[0]);
  var table = new Table({
    head,
  });

  data.forEach(row => table.push(Object.values(row).map(r => String(r))));
  console.log(table.toString());
  return;
}
