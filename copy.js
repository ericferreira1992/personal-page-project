const cpx = require('cpx');
const fs = require('fs');

fs.rmdirSync('./ericferreira1992.github.io', { recursive: true }, () => {});
fs.mkdirSync('./ericferreira1992.github.io', () => {});

cpx.copySync('./build/**/*.*', './ericferreira1992.github.io');