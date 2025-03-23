'use strict';

const help = require('../help');

const {entries} = Object;

module.exports.getHelp = () => {
    const result = [
        'Usage: redfork [options] [command]',
        'Options:',
    ];
    
    for (const [name, description] of entries(help)) {
        result.push(`  ${name} ${description}`);
    }
    
    return result.join('\n');
};
