import * as test from 'unit.js'
import {parseArgs as parser} from "../commands/parser.js"

let args = parser("the 'film is in' 'The \"pretty flowers\" (very)'")

console.log(args)

test.assert(args.length == 3)

test.assert(args[0] == "the")

test.assert(args[1] == "film is in")

test.assert(args[2] == 'The "pretty flowers" (very)')