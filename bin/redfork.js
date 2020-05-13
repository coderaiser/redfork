#!/usr/bin/env node

'use strict';

const {join} = require('path');
const {execSync} = require('child_process');
const {readdirSync} = require('fs');
const tryCatch = require('try-catch');

const joinCwd = (a) => (b) => join(a, b);

module.exports = main();

async function main() {
    const {
        cwd,
        argv,
    } = process;
    
    const dir = cwd();
    const dirs = readdirSync('.')
        .map(joinCwd(dir));
    
    const [command] = argv.slice(2);
    
    if (!command)
        return console.log('nothing to do, exit');
    
    for (const dir of dirs) {
        const [e] = tryCatch(execSync, command, {
            stdio: [0, 1, 2, 'pipe'],
            cwd: dir,
        });
        
        if (e)
            console.error(e.message);
        
        console.log(dir);
    }
}

