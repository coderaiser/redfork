'use strict';

const {run} = require('madrun');

module.exports = {
    'lint': () => 'putout bin test .madrun.js',
    'fix:lint': () => run('lint', '--fix'),
    'test': () => `tape 'test/**/*.js'`,
    'watch:test': () => run('watcher', run('test')),
    'watcher': () => 'nodemon -w test -w bin --exec',
    'coverage': () => `nyc ${run('test')}`,
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
};

