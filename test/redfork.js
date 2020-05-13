'use strict';

const fs = require('fs');
const child_process = require('child_process');
const test = require('supertape');
const {reRequire} = require('mock-require');
const stub = require('@cloudcmd/stub');

test('redfork: readdirSync', async (t) => {
    const readdirSyncStub = stub().returns([]);
    
    await run({
        readdirSyncStub,
    });
    
    t.ok(readdirSyncStub.calledWith('.'));
    t.end();
});

test('redfork: execSync', async (t) => {
    const readdirSyncStub = stub().returns(['dir']);
    const cwdStub = stub().returns('/home/abc');
    const argvMock = ['', '', 'ls'];
    
    const {execSyncStub} = await run({
        readdirSyncStub,
        cwdStub,
        argvMock,
    });
    
    const dir = '/home/abc/dir';
    const expected = [
        'ls', {
            stdio: [0, 1, 2, 'pipe'],
            cwd: dir,
        },
    ];
    
    t.ok(execSyncStub.calledWith(...expected));
    t.end();
});

test('redfork: execSync: error', async (t) => {
    const readdirSyncStub = stub().returns(['dir']);
    const execSyncStub = stub().throws(Error('hello'));
    const cwdStub = stub().returns('/home/abc');
    const argvMock = ['', '', 'ls'];
    
    const {errorStub} = await run({
        readdirSyncStub,
        execSyncStub,
        cwdStub,
        argvMock,
    });
    
    t.ok(errorStub.calledWith('hello'));
    t.end();
});

test('redfork: console.log', async (t) => {
    const readdirSyncStub = stub().returns(['dir']);
    const cwdStub = stub().returns('/home/abc');
    const argvMock = ['', '', 'ls'];
    
    const {logStub} = await run({
        readdirSyncStub,
        cwdStub,
        argvMock,
    });
    
    const dir = '/home/abc/dir';
    
    t.ok(logStub.calledWith(dir));
    t.end();
});

test('redfork: no command', async (t) => {
    const readdirSyncStub = stub().returns(['dir']);
    const cwdStub = stub().returns('/home/abc');
    
    const {logStub} = await run({
        readdirSyncStub,
        cwdStub,
    });
    
    t.ok(logStub.calledWith('nothing to do, exit'));
    t.end();
});

async function run(stubs = {}) {
    const {readdirSync} = fs;
    const {execSync} = child_process;
    const {argv, cwd} = process;
    const {log, error} = console;
    
    const {
        readdirSyncStub = stub(),
        execSyncStub = stub(),
        cwdStub = stub(),
        logStub = stub(),
        errorStub = stub(),
        argvMock = ['', ''],
    } = stubs;
    
    fs.readdirSync = readdirSyncStub;
    child_process.execSync = execSyncStub;
    console.log = logStub;
    console.error = errorStub;
    
    process.cwd = cwdStub;
    process.argv = argvMock;
    
    const redfork = reRequire('..');
    await redfork;
    
    fs.readdirSync = readdirSync;
    child_process.execSync = execSync;
    
    process.argv = argv;
    process.cwd = cwd;
    
    console.log = log;
    console.error = error;
    
    return {
        readdirSyncStub,
        execSyncStub,
        cwdStub,
        logStub,
        errorStub,
    }
}

