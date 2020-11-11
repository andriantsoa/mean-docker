
exports.generateActivationCode = () => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let part1 = '';
  let part2 = '';
  for (let i = 0; i < 2; i++) {
    part1 += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  for (let i = 0; i < 7; i++) {
    part2 += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return 'ASA' + part1 + part2[0] + '-' + part1[0] + part2;
};
