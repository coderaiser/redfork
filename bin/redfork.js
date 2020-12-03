#!/usr/bin/env node

import {join} from 'path';
import {execSync} from 'child_process';
import {readdirSync} from 'fs';
import tryCatch from 'try-catch';

const joinCwd = (a) => (b) => join(a, b);

export default main();

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

