'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => `tape 'test/**/*.js'`,
    'watch:test': async () => run('watcher', await run('test')),
    'watcher': () => 'nodemon -w test -w bin --exec',
    'coverage': async () => `nyc ${await run('test')}`,
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
};

