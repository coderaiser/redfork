'use strict';

const fs = require('fs');
const child_process = require('child_process');
const test = require('supertape');
const {reRequire} = require('mock-require');
const stub = require('@cloudcmd/stub');

test('redfork: readdirSync', async (t) => {
    const {readdirSync} = fs;
    const {execSync} = child_process;
    
    const readdirSyncStub = stub().returns([]);
    const execSyncStub = stub();
    
    fs.readdirSync = readdirSyncStub;
    child_process.execSync = execSyncStub;
    
    const redfork = reRequire('..');
    await redfork;
    
    fs.readdirSync = readdirSync;
    child_process.execSync = execSync;
    
    t.ok(readdirSyncStub.calledWith('.'));
    t.end();
});

test('redfork: execSync', async (t) => {
    const {readdirSync} = fs;
    const {execSync} = child_process;
    const {argv, cwd} = process;
    const {log, error} = console;
    
    const readdirSyncStub = stub().returns(['dir']);
    const execSyncStub = stub();
    const cwdStub = stub().returns('/home/abc');
    const logStub = stub();
    const errorStub = stub();
    
    fs.readdirSync = readdirSyncStub;
    child_process.execSync = execSyncStub;
    console.log = logStub;
    console.error = errorStub;
    
    process.cwd = cwdStub;
    process.argv = ['', '', 'ls'];
    
    const redfork = reRequire('..');
    await redfork;
    
    fs.readdirSync = readdirSync;
    child_process.execSync = execSync;
    
    process.argv = argv;
    process.cwd = cwd;
    
    console.log = log;
    console.error = error;
    
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
    const {readdirSync} = fs;
    const {execSync} = child_process;
    const {argv, cwd} = process;
    const {log, error} = console;
    
    const readdirSyncStub = stub().returns(['dir']);
    const execSyncStub = stub().throws(Error('hello'));
    const cwdStub = stub().returns('/home/abc');
    const logStub = stub();
    const errorStub = stub();
    
    fs.readdirSync = readdirSyncStub;
    child_process.execSync = execSyncStub;
    console.log = logStub;
    console.error = errorStub;
    
    process.cwd = cwdStub;
    process.argv = ['', '', 'ls'];
    
    const redfork = reRequire('..');
    await redfork;
    
    fs.readdirSync = readdirSync;
    child_process.execSync = execSync;
    
    process.argv = argv;
    process.cwd = cwd;
    
    console.log = log;
    console.error = error;
    
    t.ok(errorStub.calledWith('hello'));
    t.end();
});

test('redfork: console.log', async (t) => {
    const {readdirSync} = fs;
    const {execSync} = child_process;
    const {argv, cwd} = process;
    const {log, error} = console;
    
    const readdirSyncStub = stub().returns(['dir']);
    const execSyncStub = stub();
    const cwdStub = stub().returns('/home/abc');
    const logStub = stub();
    const errorStub = stub();
    
    fs.readdirSync = readdirSyncStub;
    child_process.execSync = execSyncStub;
    console.log = logStub;
    console.error = errorStub;
    
    process.cwd = cwdStub;
    process.argv = ['', '', 'ls'];
    
    const redfork = reRequire('..');
    await redfork;
    
    fs.readdirSync = readdirSync;
    child_process.execSync = execSync;
    
    process.argv = argv;
    process.cwd = cwd;
    
    console.log = log;
    console.error = error;
    
    const dir = '/home/abc/dir';
    
    t.ok(logStub.calledWith(dir));
    t.end();
});

test('redfork: no command', async (t) => {
    const {readdirSync} = fs;
    const {execSync} = child_process;
    const {argv, cwd} = process;
    const {log, error} = console;
    
    const readdirSyncStub = stub().returns(['dir']);
    const execSyncStub = stub();
    const cwdStub = stub().returns('/home/abc');
    const logStub = stub();
    const errorStub = stub();
    
    fs.readdirSync = readdirSyncStub;
    child_process.execSync = execSyncStub;
    console.log = logStub;
    console.error = errorStub;
    
    process.cwd = cwdStub;
    process.argv = ['', ''];
    
    const redfork = reRequire('..');
    await redfork;
    
    fs.readdirSync = readdirSync;
    child_process.execSync = execSync;
    
    process.argv = argv;
    process.cwd = cwd;
    
    console.log = log;
    console.error = error;
    
    t.ok(logStub.calledWith('nothing to do, exit'));
    t.end();
});

