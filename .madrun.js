import {run} from 'madrun';

const NODE_OPTIONS = `'--loader mock-import'`;

export default {
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test:base': () => `tape 'test/**/*.js'`,
    'test': async () => await run('test:base', '', {
        NODE_OPTIONS,
    }),
    'watch:test': async () => await run('watcher', run('test:base'), {
        NODE_OPTIONS,
    }),
    'watcher': () => 'nodemon -w test -w bin --exec',
    'coverage:base': async () => `c8 ${await run('test:base')}`,
    'coverage': async () => await run('coverage:base', '', {
        NODE_OPTIONS,
    }),
    'report': () => 'c8 report --reporter=lcov',
};

