import {createRequire} from 'node:module';
import test, {stub} from 'supertape';
import {redfork} from '../lib/redfork.js';

const require = createRequire(import.meta.url);

test('redfork: version', (t) => {
    const log = stub();
    const {version} = require('../package');
    
    const argv = ['-v'];
    
    redfork(argv, {
        log,
    });
    
    t.calledWith(log, [`v${version}`]);
    t.end();
});

test('redfork: readdirSync', (t) => {
    const readdirSync = stub().returns([]);
    
    const argv = ['ls'];
    
    redfork(argv, {
        readdirSync,
    });
    
    t.calledWith(readdirSync, ['.']);
    t.end();
});

test('redfork: execSync', (t) => {
    const readdirSync = stub().returns(['dir']);
    const cwd = stub().returns('/home/abc');
    const argv = ['ls'];
    
    const execSync = stub();
    
    redfork(argv, {
        execSync,
        readdirSync,
        cwd,
    });
    
    const expected = ['ls', {
        stdio: [
            0,
            1,
            2,
            'pipe',
        ],
        cwd: '/home/abc/dir',
    }];
    
    t.calledWith(execSync, expected);
    t.end();
});

test('redfork: execSync: pattern: not match', (t) => {
    const readdirSync = stub().returns(['dir']);
    const cwd = stub().returns('/home/abc');
    const argv = [
        'ls',
        '-p',
        'hello*',
    ];
    
    const execSync = stub();
    
    redfork(argv, {
        readdirSync,
        cwd,
    });
    
    t.notCalled(execSync, 'should not call execSync');
    t.end();
});

test('redfork: execSync: pattern', (t) => {
    const readdirSync = stub().returns(['hello-world']);
    const cwd = stub().returns('/home/abc');
    const execSync = stub();
    
    const argv = [
        'ls',
        '-p',
        'hello*',
    ];
    
    redfork(argv, {
        readdirSync,
        execSync,
        cwd,
    });
    
    const expected = ['ls', {
        stdio: [
            0,
            1,
            2,
            'pipe',
        ],
        cwd: '/home/abc/hello-world',
    }];
    
    t.calledWith(execSync, expected);
    t.end();
});

test('redfork: execSync: error', (t) => {
    const readdirSync = stub().returns(['dir']);
    const execSync = stub().throws(Error('hello'));
    const cwd = stub().returns('/home/abc');
    const logError = stub();
    
    const argv = ['ls'];
    
    redfork(argv, {
        readdirSync,
        execSync,
        cwd,
        logError,
    });
    
    t.calledWith(logError, ['hello']);
    t.end();
});

test('redfork: console.log', (t) => {
    const readdirSync = stub().returns(['dir']);
    const cwd = stub().returns('/home/abc');
    const log = stub();
    
    const argv = ['ls'];
    
    redfork(argv, {
        log,
        readdirSync,
        cwd,
    });
    
    const dir = '/home/abc/dir';
    
    t.calledWith(log, [dir]);
    t.end();
});

test('redfork: no command', (t) => {
    const readdirSync = stub().returns(['dir']);
    const cwd = stub().returns('/home/abc');
    const log = stub();
    
    redfork([], {
        log,
        readdirSync,
        cwd,
    });
    
    t.calledWith(log, ['nothing to do, exit']);
    t.end();
});
