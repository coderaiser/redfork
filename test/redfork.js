import test from 'supertape';
import {createMockImport} from 'mock-import';
import stub from '@cloudcmd/stub';

const {
    reImport,
    mockImport,
    stopAll,
} = createMockImport(import.meta.url);

test('redfork: readdirSync', async (t) => {
    const readdirSync = stub().returns([]);
    
    await run({
        readdirSync,
        argvMock: ['', '', 'ls'],
    });
    
    t.ok(readdirSync.calledWith('.'));
    t.end();
});

test('redfork: execSync', async (t) => {
    const readdirSync = stub().returns(['dir']);
    const cwdStub = stub().returns('/home/abc');
    const argvMock = ['', '', 'ls'];
    
    const {execSync} = await run({
        readdirSync,
        cwdStub,
        argvMock,
    });
    
    const cwd = '/home/abc/dir';
    const expected = [
        'ls', {
            stdio: [0, 1, 2, 'pipe'],
            cwd,
        },
    ];
    
    t.ok(execSync.calledWith(...expected));
    t.end();
});

test('redfork: execSync: pattern: not match', async (t) => {
    const readdirSync = stub().returns(['dir']);
    const cwdStub = stub().returns('/home/abc');
    const argvMock = ['', '', 'ls', '-p', 'hello*'];
    
    const {execSync} = await run({
        readdirSync,
        cwdStub,
        argvMock,
    });
    
    const cwd = '/home/abc/dir';
    const expected = [
        'ls', {
            stdio: [0, 1, 2, 'pipe'],
            cwd,
        },
    ];
    
    t.notOk(execSync.called, 'should not call execSync');
    t.end();
});

test('redfork: execSync: pattern', async (t) => {
    const readdirSync = stub().returns(['hello-world']);
    const cwdStub = stub().returns('/home/abc');
    const argvMock = ['', '', 'ls', '-p', 'hello*'];
    
    const {execSync} = await run({
        readdirSync,
        cwdStub,
        argvMock,
    });
    
    const cwd = '/home/abc/hello-world';
    const expected = [
        'ls', {
            stdio: [0, 1, 2, 'pipe'],
            cwd,
        },
    ];
    
    t.ok(execSync.calledWith(...expected));
    t.end();
});

test('redfork: execSync: error', async (t) => {
    const readdirSync = stub().returns(['dir']);
    const execSync = stub().throws(Error('hello'));
    const cwdStub = stub().returns('/home/abc');
    const argvMock = ['', '', 'ls'];
    
    const {errorStub} = await run({
        readdirSync,
        execSync,
        cwdStub,
        argvMock,
    });
    
    t.ok(errorStub.calledWith('hello'));
    t.end();
});

test('redfork: console.log', async (t) => {
    const readdirSync = stub().returns(['dir']);
    const cwdStub = stub().returns('/home/abc');
    const argvMock = ['', '', 'ls'];
    
    const {logStub} = await run({
        readdirSync,
        cwdStub,
        argvMock,
    });
    
    const dir = '/home/abc/dir';
    
    t.ok(logStub.calledWith(dir));
    t.end();
});

test('redfork: no command', async (t) => {
    const readdirSync = stub().returns(['dir']);
    const cwdStub = stub().returns('/home/abc');
    
    const {logStub} = await run({
        readdirSync,
        cwdStub,
    });
    
    t.ok(logStub.calledWith('nothing to do, exit'));
    t.end();
});

async function run(stubs = {}) {
    const {argv, cwd} = process;
    const {log, error} = console;
    
    const {
        readdirSync = stub(),
        execSync = stub(),
        cwdStub = stub(),
        logStub = stub(),
        errorStub = stub(),
        argvMock = ['', ''],
    } = stubs;
    
    console.log = logStub;
    console.error = errorStub;
    
    process.cwd = cwdStub;
    process.argv = argvMock;
    
    mockImport('fs', {
        readdirSync,
    });
    
    mockImport('child_process', {
        execSync,
    });
    
    const redfork = await reImport('..');
    await redfork;
    
    stopAll();
    
    process.argv = argv;
    process.cwd = cwd;
    
    console.log = log;
    console.error = error;
    
    return {
        readdirSync,
        execSync,
        cwdStub,
        logStub,
        errorStub,
    };
}

