import * as test from 'unit.js'
import * as conv from '../conversations'

let simple = new conv.Conversation()
    .addGoal(
        new conv.BuiltinGoal("PLAYERID", "Internal id of the associated player")
    )
    .addGoal(
        new conv.FreeFormGoal("Your name please?", true)
    )
    .addGoal(
        new conv.FreeFormGoal("Your email please?", false)
    )

let medium = {}

medium.CONTEXT = {}
medium.CONTEXT.PLAYERID = "TRU1234"

medium.responses = 0
medium.question = function(prompt, cb) {
    this.responses++
    switch(this.responses) {
        case 1: {
            cb(null, "628426")
            break;
        }
        case 2: {   
            cb(null, "foo@bar.com")
            break;
        }
    }
}

simple.resolve(medium, (err, results) => {
    if(err) throw err
    test.object(results)
    console.log(results)
})

conv.CONVERSATIONS.SIGNUP.resolve(conv.ConsoleMedium, (err, results) => {
    if(err) throw err
    test.object(results)
    console.log(results)
})