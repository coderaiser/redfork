#!/usr/bin/env node

import {execSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
import process from 'node:process';
import {redfork} from '../lib/redfork.js';

const {cwd, argv} = process;
redfork(argv.slice(2), {
    cwd,
    readdirSync,
    execSync,
    log: console.log,
    logError: console.error,
});
