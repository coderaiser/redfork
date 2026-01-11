import {createRequire} from 'node:module';
import {join} from 'node:path';
import yargsParser from 'yargs-parser';
import {tryCatch} from 'try-catch';
import picomatch from 'picomatch';
import {getHelp} from './help.cjs';

const noop = () => {};
const one = (f) => (a) => f(a);
const joinCwd = (a) => (b) => join(a, b);
const require = createRequire(import.meta.url);

export const redfork = (argv, overrides = {}) => {
    const {
        cwd = noop,
        readdirSync = noop,
        execSync = noop,
        log = noop,
        logError = noop,
    } = overrides;
    
    const {
        _,
        pattern,
        version,
        help,
    } = yargsParser(argv, {
        default: {
            pattern: '*',
        },
        boolean: ['version', 'help'],
        string: ['pattern'],
        alias: {
            p: 'pattern',
            v: 'version',
            h: 'help',
        },
    });
    
    if (version)
        return log(`v${require('../package').version}`);
    
    if (help)
        return log(getHelp());
    
    const [command] = _;
    
    if (!command)
        return log('nothing to do, exit');
    
    const dir = cwd();
    
    const match = picomatch(pattern, {
        matchBase: true,
    });
    
    const dirs = readdirSync('.')
        .filter(one(match))
        .map(joinCwd(dir));
    
    for (const dir of dirs) {
        const [e] = tryCatch(execSync, command, {
            stdio: [
                0,
                1,
                2,
                'pipe',
            ],
            cwd: dir,
        });
        
        if (e)
            logError(e.message);
        
        log(dir);
    }
};
