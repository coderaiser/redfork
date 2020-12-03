import {run} from 'madrun';

const NODE_OPTIONS = `'--loader mock-import'`;

export default {
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
    'test:base': () => `tape 'test/**/*.js'`,
    'test': () => run('test:base', '', {
        NODE_OPTIONS,
    }),
    'watch:test': async () => run('watcher', await run('test:base'), {
        NODE_OPTIONS,
    }),
    'watcher': () => 'nodemon -w test -w bin --exec',
    'coverage:base': async () => `c8 ${await run('test:base')}`,
    'coverage': () => run('coverage:base', '', {
        NODE_OPTIONS,
    }),
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
};

