#!/usr/bin/env node

import {join} from 'path';
import {createRequire} from 'module';
import {execSync} from 'child_process';
import {readdirSync} from 'fs';
import tryCatch from 'try-catch';
import yargsParser from 'yargs-parser';
import picomatch from 'picomatch';

const joinCwd = (a) => (b) => join(a, b);
const one = (f) => (a) => f(a)

export default main();

async function main() {
    const {
        cwd,
        argv,
    } = process;
    
    const {
        _,
        pattern,
        version,
    } = yargsParser(argv.slice(2), {
        default: {
            pattern: '*',
        },
        boolean: [
            'version',
        ],
        string: [
            'pattern',
        ],
        alias: {
            p: 'pattern',
            v: 'version',
        },
    });
    
    if (version) {
        const require = createRequire(import.meta.url);
        return console.log(`v${require('../package').version}`);
    }
    
    const [command] = _;
    
    if (!command)
        return console.log('nothing to do, exit');
    
    const dir = cwd();
    const match = picomatch(pattern, {
        matchBase: true,
    });
    const dirs = readdirSync('.')
        .filter(one(match))
        .map(joinCwd(dir))
    
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

