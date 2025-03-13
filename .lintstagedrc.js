const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .filter((f) => !f.includes('.lintstagedrc.js'))
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', buildEslintCommand],
  '*.{json,css,md}': ['prettier --write'],
};
