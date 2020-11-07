const cpx = require('cpx');
const fs = require('fs');

fs.rmdir('ericferreira1992.github.io');
fs.mkdir('ericferreira1992.github.io');

cpx.copy('build/**/*.*', 'ericferreira1992.github.io');