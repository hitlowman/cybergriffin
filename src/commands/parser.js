/*
The MIT License (MIT) 
Copyright (c) <year> <copyright holders>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
Exposes parser functionality to turn typed commands such as 

/raid lowman.griffin.slack.com {BI:25} 

into executuable arrays

*/ 

import * as e from '../events'

// lifted with thanks from https://github.com/anseki/readline-sync/blob/master/lib/readline-sync.js
export function parseArgs(command) {
    // cmd "arg" " a r g " "" 'a"r"g' "a""rg" "arg
    var reToken = new RegExp(/(\s*)(?:("|')(.*?)(?:\2|$)|(\S+))/g), matches,
        taken = '', args = [], part;

    let cl = command.trim();

    while ((matches = reToken.exec(cl))) {
        part = matches[3] || matches[4] || '';
        if (matches[1]) {
            args.push(taken);
            taken = '';
        }
        taken += part;
    }

    if (taken) { args.push(taken); }

    return args;
}