/*
The MIT License (MIT) 
Copyright (c) 2016 the hitlowman team http://github.com/hitlowman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
Exposes conversation functionality for all managed conversations.  conversations
are designed to gather enough user input in an async manner to execute a 
resulting command

TODO:  split this file into seperate files for each conversation and use require
to pull in each conversation
*/


import * as help from '../help'
import * as common from '../common'
import * as con from 'readline-sync'

export const PLACEHOLDERS = {
    PLAYERID: "PLAYERID"
}

export class BuiltinGoal {
    constructor(placeholder, description) {
        this.placeholder = placeholder
        this.description = description
    }

    help() {
        return description
    }

    resolve(medium, next) {
        if (!medium || !medium.CONTEXT || !medium.CONTEXT[this.placeholder]) {
            return next(`Couldn't resolve BuiltinGoal(${this.description})`)
        }
        return next(null, medium.CONTEXT[this.placeholder])
    }
}

export class ChoiceGoal {
    constructor(prompt, help) {
        this.prompt = prompt
        this.choices = []
        this.help = help
    }

    addChoice(name, description) {
        this.choices.push({
            name: name.toUpperCase(),
            description: description
        })
        return this
    }

    addChoices(choices) {
        this.choices = this.choices.concat(choices)

        return this
    }

    resolve(medium, next) {
        medium.select(this.prompt, this.choices, this.help, next)
    }

}

export class FreeFormGoal {
    constructor(prompt, required) {
        this.prompt = prompt
        this.required = required;
    }

    resolve(medium, next) {
        let me = this;
        let read = function read(err, result) {
            if (me.required && !result) {
                medium.question(me.prompt, read)
            } else {
                next(null, result)
            }
        }
        medium.question(this.prompt, read);
    }
}

export class CoordsGoal {
    constructor(prompt) {
        this.prompt = prompt
    }

    resolve(medium, next) {

    }
}

export class FleetGoal {
    constructor(prompt) {
        this.prompt = prompt
    }

    resolve(medium, next) {

    }
}

export class Conversation {
    constructor(help) {
        this.goals = []
        this.help = help
    }

    addGoal(goal) {
        this.goals.push(goal);
        return this
    }

    resolve(medium, cb) {
        let results = []
        let me = this;
        let goal = 0
        let next = function next(err, result) {
            if (err) return cb(err)
            results.push(result)
            goal++;
            if (results.length == me.goals.length) {
                return cb(null, results)
            } else {
                me.goals[goal].resolve(medium, next)
            }
        }

        if (this.goals && this.goals.length > 0) {
            this.goals[0].resolve(medium, next)
        }
    }
}

export const CONVERSATIONS = {
    SIGNUP: new Conversation("ARCHETYPES")
        .addGoal(new ChoiceGoal("Select your archetype",
            "Your archetype dictates available units and the skills you can use")
            .addChoices(help.ARCHETYPES.CHILDITEMS.map((item) => {
                return {
                    name: item.title,
                    description: item.description,
                    help: item.title.toUpperCase()
                }
            }))
        ),
    SCAN: new Conversation("SCAN")
        .addGoal(
        new BuiltinGoal(PLACEHOLDERS.PLAYERID,
            "The id of the player making the scan")
        )
        .addGoal(
        new CoordsGoal("Target player",
            "The coordinates of the player to scan, i.e. nathan.NBTX.slack.com")
        ),
    RAID: new Conversation("RAID")
        .addGoal(
        new BuiltinGoal(PLACEHOLDERS.PLAYERID,
            "The id of the player launching the raid")
        )
        .addGoal(
        new CoordsGoal("Target player",
            "The coordinates of the player to launch a raid on, i.e. nathan.NBTX.slack.com.  Supply help for more details")
        )
        .addGoal(
        new FleetGoal("Fleet composition",
            "The composition of the fleet you want to send i.e. BI:1234,CW:34")
        ),
    RECALL: new Conversation("RECALL")
        .addGoal(
        new BuiltinGoal(PLACEHOLDERS.PLAYERID,
            "The id of the player recalling a fleet")
        )
        .addGoal(
        new CoordsGoal("Target player",
            "The coordinates of the player to recall a raid from, i.e. nathan.NBTX.slack.com.  Supply help for more details")
        )
        .addGoal(
        new FleetGoal("Fleet composition",
            "The composition of the fleet you want to recall i.e. BI:1234,CW:34.  Supply help fleet for more details.")
        ),
    DEFEND: {},
    CONSTRUCT: {},
    RESEARCH: {}
}

export const ConsoleMedium = {
    question: function (prompt, cb) {
        try {
            cb(null, con.question(prompt + ">"))
        }
        catch (err) {
            cb(err)
        }
    },
    select: function (prompt, list, help, cb) {
        let choose = function choose(prompt, list, help, cb) {
            let output = ''
            list.forEach((item) => {
                output += '    ' + item.name.toUpperCase() + ': ' + item.description + '\r\n'
            })
            output += '\r\n'
            output += prompt + ' (' + list.map((item) => { return item.name.toUpperCase() }).join(', ') + ')'
            try {
                let choice = con.question(output + ">")
                if (choice.toUpperCase() == "HELP") {
                    con.question(help + "\r\n" + prompt + ' (' + list.map((item) => { return item.name.toUpperCase() }).join(', ') + ')')
                }
                if (!list.some((item) => {
                    return item.name.toUpperCase() == choice.toUpperCase()
                })) {
                    choose(prompt, list, help, cb)
                } else {
                    cb(null, choice.toUpperCase())
                }
            }
            catch (err) {
                cb(err)
            }
        }

        choose(prompt, list, help, cb)
    },
    CONTEXT: {
        PLAYERID: "tru1234"
    }
}