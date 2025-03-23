import {run} from 'madrun';

export default {
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test:base': () => `tape 'test/**/*.js'`,
    'test': async () => await run('test:base'),
    'watch:test': async () => await run('watcher', await run('test:base')),
    'watcher': () => 'nodemon -w test -w bin --exec',
    'coverage:base': async () => `c8 ${await run('test:base')}`,
    'coverage': async () => await run('coverage:base'),
    'report': () => 'c8 report --reporter=lcov',
};
